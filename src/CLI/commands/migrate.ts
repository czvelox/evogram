//@ts-nocheck
import { Command } from 'commander';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, extname } from 'path';
import { register } from 'ts-node';

register(); // Register `ts-node` to handle TypeScript files

export const migrateCommand = new Command('migrate')
	.description('Run contexts migration')
	.argument('[path]', 'Optional path to run the migration')
	.action(async (path) => {
		// Define the migration and generated file paths
		const migrationPath = path || join(process.cwd(), 'src/contexts');
		const generatedFilePath = join(process.cwd(), 'node_modules/evogram/lib/contexts/migrated/index.d.ts');

		// Check if migration path exists
		if (!existsSync(migrationPath)) console.error(`Error: The directory "${migrationPath}" does not exist.`);

		// Read TypeScript files from the directory
		const files = readdirSync(migrationPath).filter((file) => extname(file) === '.ts');
		if (files.length === 0) console.error(`Error: No TypeScript files found in the directory "${migrationPath}".`);

		const generatedImports: Record<string, string> = {};
		const existingImports = new Set<string>();

		// Process each TypeScript file
		for (const file of files) {
			const filePath = join(migrationPath, file);
			try {
				const importedModule = await import(filePath);

				if (importedModule.default && typeof importedModule.default === 'function') {
					const importedClass = importedModule.default;
					const parentClass = Object.getPrototypeOf(importedClass);

					// Store the import statement for the parent class
					generatedImports[parentClass.name] = `export { default as ${parentClass.name} } from "${filePath.replace(/\\/g, '/')}";\n`;
					existingImports.add(parentClass.name);
				} else {
					console.log(`No default class export found in: ${filePath}`);
				}
			} catch (err) {
				console.error(`Error importing file: ${filePath}`, err);
			}
		}

		// Update the index.d.ts file
		if (existsSync(generatedFilePath)) {
			try {
				let indexFileContent = readFileSync(generatedFilePath, 'utf-8');
				const lines = indexFileContent.split('\n');

				const updatedContent = lines
					.map((line) => {
						// Extract class name from the import line
						const match = line.match(/export\s+\{\s+(default as )?(\w+)\s+\}/);
						if (match) {
							const className = match[2];
							// Replace line with new import or fallback to "../"
							if (!existingImports.has(className)) return `export { ${className} } from "../";`;
							return generatedImports[className] || line;
						}
						return line; // Return unchanged line
					})
					.join('\n');

				// Write the updated content back to the file
				writeFileSync(generatedFilePath, updatedContent, 'utf-8');
			} catch (err) {
				console.error(`Error reading or writing file: ${generatedFilePath}`, err);
			}
		} else {
			console.error(`Error: The file "${generatedFilePath}" does not exist.`);
		}
	});
