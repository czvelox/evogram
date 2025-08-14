import { EvogramInlineKeyboardButton } from '../keyboard';

export function Pagination(params: {
	pages: number;
	currentPage: number;
	command?: any;
	payload?: Record<string, any>;
}): EvogramInlineKeyboardButton[] {
	const { pages, currentPage, command, payload } = params;
	if (pages <= 5)
		return Array.from({ length: pages }, (_, i) =>
			i === currentPage
				? {
						text: `· ${i + 1} ·`,
						callback_data: '_',
					}
				: {
						text: `${i + 1}`,
						command,
						payload: { ...payload, page: i },
					}
		);

	const buttons: EvogramInlineKeyboardButton[] = [];

	if (pages >= 1) {
		if (currentPage === 0) buttons.push({ text: '· 1 ·', callback_data: '_' });
		else if ((currentPage > 0 && currentPage < 3) || pages === 5)
			buttons.push({ text: '1', command, payload: { ...payload, page: 0 } });
		else if (currentPage >= 3) buttons.push({ text: '≪ 1', command, payload: { ...payload, page: 0 } });
	}

	if (pages >= 2) {
		if (currentPage === 0) buttons.push({ text: '2', command, payload: { ...payload, page: 1 } });
		else if (currentPage === 1) buttons.push({ text: '· 2 ·', callback_data: '_' });
		else if ((currentPage > 0 && currentPage < 3) || pages === 5)
			buttons.push({ text: '2', command, payload: { ...payload, page: 1 } });
		else if (pages - currentPage < 4) buttons.push({ text: `‹ ${pages - 3}`, command, payload: { ...payload, page: pages - 4 } });
		else if (currentPage >= 3) buttons.push({ text: `‹ ${currentPage}`, command, payload: { ...payload, page: currentPage - 1 } });
	}

	if (pages >= 3) {
		// prettier-ignore
		if (currentPage >= 2 && currentPage < pages - 2) buttons.push({ text: `· ${currentPage + 1} ·`, callback_data: '_' });
        else if (pages - currentPage < 4) buttons.push({ text: `${pages - 2}`, command, payload: { ...payload, page: pages - 3 } });
        else if (currentPage < 2) buttons.push({ text: '3', command, payload: { ...payload, page: 2 } });
        else buttons.push({ text: `${currentPage + 2}`, command, payload: { ...payload, page: currentPage + 1 } });
	}

	if (pages >= 4) {
		if (pages - currentPage === 2) buttons.push({ text: `· ${pages - 1} ·`, callback_data: '_' });
		else if (pages - currentPage < 4 || pages === 5)
			buttons.push({ text: `${pages - 1}`, command, payload: { ...payload, page: pages - 2 } });
		else if (currentPage < 3) buttons.push({ text: `4 ›`, command, payload: { ...payload, page: 3 } });
		else buttons.push({ text: `${currentPage + 2} ›`, command, payload: { ...payload, page: currentPage + 1 } });
	}

	if (pages >= 5) {
		if (pages - currentPage === 1) buttons.push({ text: `· ${pages} ·`, callback_data: '_' });
		else if (pages - currentPage < 4 || pages === 5)
			buttons.push({ text: `${pages}`, command, payload: { ...payload, page: pages - 1 } });
		else buttons.push({ text: `${pages} ≫`, command, payload: { ...payload, page: pages - 1 } });
	}

	return buttons;
}
