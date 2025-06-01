import { Command } from 'commander';
import { existsSync, readdirSync, readFileSync, writeFileSync, copyFileSync, statSync } from 'fs';
import { join, extname, basename } from 'path';
import { register } from 'ts-node';
import ts from 'typescript';
import fs from 'fs';

register(); // Register `ts-node` to handle TypeScript files

// Helper function to recursively collect files
function getAllFiles(dirPath: string, files: string[] = []): string[] {
	const entries = readdirSync(dirPath);

	for (const entry of entries) {
		const fullPath = join(dirPath, entry);
		if (statSync(fullPath).isDirectory()) {
			getAllFiles(fullPath, files);
		} else if (extname(fullPath) === '.ts' && fullPath.endsWith('.override.ts')) {
			files.push(fullPath);
		}
	}

	return files;
}

export const migrateCommand = new Command('migrate')
	.description('Run contexts migration')
	.argument('[path]', 'Optional path to run the migration')
	.action(async (path) => {
		const migrationPath = path || join(process.cwd(), 'src');
		const generatedFilePath = join(process.cwd(), 'node_modules/evogram/lib/migrated/index.d.ts');
		const backupFilePath = join(process.cwd(), 'node_modules/evogram/lib/migrated/index.backup.d.ts');

		if (!existsSync(migrationPath)) return console.error(`Error: The directory "${migrationPath}" does not exist.`);

		const files = getAllFiles(migrationPath);
		if (files.length === 0) return console.error(`Error: No ".override.ts" files found in the directory "${migrationPath}".`);

		const generatedImports: Record<string, string> = {};
		const existingImports = new Set<string>();

		// Backup the existing index.d.ts file
		if (!existsSync(backupFilePath)) {
			copyFileSync(generatedFilePath, backupFilePath);
		} else {
			copyFileSync(backupFilePath, generatedFilePath);
		}

		// Process each .override.ts file
		for (const filePath of files) {
			try {
				const importedModule = await import(filePath);

				if (importedModule.default && typeof importedModule.default === 'function') {
					const importedClass = importedModule.default;
					const parentClass = Object.getPrototypeOf(importedClass);

					// Get class name from the filename (remove .override.ts)
					const className = basename(filePath, '.override.ts');

					// Store the import statement using the className derived from the filename
					generatedImports[className] = `export { default as ${className} } from "${filePath.replace(/\\/g, '/')}";\n`;
					existingImports.add(className);
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

		// Build index.ts using tsc
		try {
			ts.transpileModule(fs.readFileSync(generatedFilePath, 'utf-8'), {});
		} catch (err) {
			console.error('Error during TypeScript build process:', err);
		}
	});
