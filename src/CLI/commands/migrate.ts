//@ts-nocheck
import { Command } from 'commander';
import { existsSync, readdirSync, readFileSync, writeFileSync, copyFileSync } from 'fs';
import { join, extname } from 'path';
import { register } from 'ts-node';

register(); // Register `ts-node` to handle TypeScript files

export const migrateCommand = new Command('migrate')
	.description('Run contexts migration')
	.argument('[path]', 'Optional path to run the migration')
	.action(async (path) => {
		// Define the migration and generated file paths
		const migrationPath = path || join(process.cwd(), 'src/contexts');
		const generatedFilePath = join(process.cwd(), 'node_modules/evogram/lib/migrated/index.d.ts');
		const backupFilePath = join(process.cwd(), 'node_modules/evogram/lib/migrated/index.backup.d.ts');

		// Check if migration path exists
		if (!existsSync(migrationPath)) return console.error(`Error: The directory "${migrationPath}" does not exist.`);

		// Read TypeScript files from the directory
		const files = readdirSync(migrationPath).filter((file) => extname(file) === '.ts');
		if (files.length === 0) return console.error(`Error: No TypeScript files found in the directory "${migrationPath}".`);

		const generatedImports: Record<string, string> = {};
		const existingImports = new Set<string>();

		// Backup the existing index.d.ts file
		if (!existsSync(backupFilePath)) {
			copyFileSync(generatedFilePath, backupFilePath);
		} else copyFileSync(backupFilePath, generatedFilePath);

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

		// Create or update the index.d.ts file
		let updatedContent = '';

		if (existsSync(generatedFilePath)) {
			try {
				let indexFileContent = readFileSync(generatedFilePath, 'utf-8');
				const lines = indexFileContent.split('\n');

				updatedContent = lines
					.map((line) => {
						// Extract class name from the import line
						const match = line.match(/export\s+\{\s+(default as )?(\w+)\s+\}/);
						if (match) {
							const className = match[2];
							return generatedImports[className] || line;
						}
						return line; // Return unchanged line
					})
					.join('\n');
			} catch (err) {
				console.error(`Error reading file: ${generatedFilePath}`, err);
			}
		} else {
			updatedContent = Object.values(generatedImports).join('\n');
		}

		// Write the updated content back to the index.d.ts file
		try {
			writeFileSync(generatedFilePath, updatedContent, 'utf-8');
			console.log(`File "${generatedFilePath}" has been updated successfully.`);
		} catch (err) {
			console.error(`Error writing file: ${generatedFilePath}`, err);
		}
	});
