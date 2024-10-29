import { Evogram } from '..';
import { UserContext } from '../contexts';
import { EvogramInlineKeyboardButton } from './keyboard.interface';
import { KeyboardConvert } from './KeyboardConvert';

export class KeyboardBuilder {
	private keyboard: EvogramInlineKeyboardButton[][] = [];
	private buttons: EvogramInlineKeyboardButton[] = []; // Store raw button data

	constructor(private client: Evogram) {}

	/** Adds a button to the keyboard */
	public addButton(button: EvogramInlineKeyboardButton): this {
		this.buttons.push(button);
		return this;
	}

	/** Sets the order of buttons based on the provided array */
	private setButtonOrder(order: number[]): this {
		this.keyboard = []; // Clear the current keyboard layout
		let index = 0;

		for (const count of order) {
			const currentRow: EvogramInlineKeyboardButton[] = [];
			for (let i = 0; i < count; i++) {
				if (index < this.buttons.length) {
					currentRow.push(this.buttons[index++]); // Push buttons according to the specified order
				}
			}
			this.keyboard.push(currentRow); // Add the current row to the keyboard
		}

		return this; // Enable method chaining
	}

	/** Arranges buttons into a keyboard layout with pagination */
	public arrangeButtons(buttons: EvogramInlineKeyboardButton[], width: number, height: number, commandName: string, page: number = 1): this {
		this.keyboard = []; // Clear existing keyboard layout
		this.buttons = buttons; // Update the stored buttons
		const totalButtons = buttons.length;
		const buttonsPerPage = width * height; // Total buttons per page
		const pages = Math.ceil(totalButtons / buttonsPerPage); // Calculate total pages

		// Ensure the requested page number is valid
		if (page < 1 || page > pages) {
			throw new Error(`Page number ${page} is out of range. There are only ${pages} pages.`);
		}

		const start = (page - 1) * buttonsPerPage; // Starting index for the requested page
		const end = Math.min(start + buttonsPerPage, totalButtons); // Ending index for the requested page

		// If there are no more buttons to add, return
		if (start >= totalButtons) return this;

		const currentPageButtons = buttons.slice(start, end);
		const rows = this.createRows(currentPageButtons, width); // Create rows for the requested page

		// Add rows to the keyboard while respecting the height limit
		for (let rowIndex = 0; rowIndex < rows.length && rowIndex < height; rowIndex++) {
			this.keyboard.push(rows[rowIndex]); // Add only up to the specified height
		}

		// Add pagination buttons if there are more pages available
		this.addPaginationButtons(page, pages, commandName);

		return this;
	}

	/** Creates rows based on button configurations and specified width */
	private createRows(buttonConfigs: EvogramInlineKeyboardButton[], width: number): EvogramInlineKeyboardButton[][] {
		const rows: EvogramInlineKeyboardButton[][] = [];
		for (let i = 0; i < buttonConfigs.length; i += width) {
			const row = buttonConfigs.slice(i, i + width);
			rows.push(row);
		}
		return rows;
	}

	/** Adds pagination buttons for navigating between pages */
	private addPaginationButtons(currentPage: number, totalPages: number, commandName: string): void {
		const paginationButtons: EvogramInlineKeyboardButton[] = [];

		if (currentPage > 1) {
			// Add "Previous" button if not on the first page
			paginationButtons.push({
				text: '« Previous',
				commandName, // Command for navigating to the previous page
				json: { page: currentPage - 1 },
			});
		}

		if (currentPage < totalPages) {
			// Add "Next" button if not on the last page
			paginationButtons.push({
				text: 'Next »',
				commandName, // Command for navigating to the next page
				json: { page: currentPage + 1 },
			});
		}

		if (paginationButtons.length > 0) {
			this.keyboard.push(paginationButtons); // Add pagination buttons as a new row
		}
	}

	/** Builds and returns the keyboard */
	public build() {
		if (this.buttons.length > 0 && this.keyboard.length === 0) {
			this.setButtonOrder([this.buttons.length]);
		}

		return KeyboardConvert(this.client, this.keyboard);
	}
}
