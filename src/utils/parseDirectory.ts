import fs from "fs";
import path from "path";

export function getPathsFromDirectory(directory: string, extension: string[]) {
	const paths: string[] = [];

	(function recursion(dir: string) {
		for(let file of fs.readdirSync(dir)) {
			const filepath = path.join(dir, file);
			const _extenstion: string[] = file.split(".");

			if(fs.lstatSync(filepath).isDirectory()) recursion(filepath)
			else if(extension.includes(_extenstion[_extenstion.length-1])) paths.push(filepath);
		}
	})(directory);

	return paths;
}