export function removeParseModeErrors(text: string | undefined, parse_mode: string) {
	if(!text) return;

	switch(parse_mode) {
		case "Markdown":
			return removeMarkdownErrors(text);
	}
}

function removeMarkdownErrors(str: string): string {
	for(let tag of [["[", "]"], "*", "_", "`"]) {
		let isOpen = false;
		let openIndex = 0;

		for(let i = 0; i < str.length; i++) {
			if(typeof tag === "string") {
				if(str[i] === tag) [openIndex, isOpen] = [i, !isOpen];
			} else {
				if(str[i] === tag[1] && !isOpen) str = fix(str, i);
				else if(str[i] === tag[0] && isOpen) str = fix(str, i);

				if(str[i] === tag[0]) [openIndex, isOpen] = [i, true];
				else if(str[i] === tag[1]) [openIndex, isOpen] = [0, false];
			}
		}

		if(isOpen) str = fix(str, openIndex);
	}

	return str;
}

function fix(str: string, i: number) {
	return str.substring(0, i) + `\\` + str.substring(i);
}