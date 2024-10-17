import { Context, ContextD } from '../../core';
import { TelegramAnswerShippingQueryParams, TelegramShippingQuery } from '../../../types';
import { UserContext } from '../../migrated';

@ContextD('ShippingQuery')
export class ShippingQueryContext extends Context<TelegramShippingQuery> {
	/** User who sent the shipping query. */
	public user = this.getContext<UserContext>({ key: 'User', source: this.source.from });

	/** Unique identifier for the shipping query. */
	public id = this.source.id;
	/** Bot-specified invoice payload associated with the shipping query. */
	public invoicePayload = this.source.invoice_payload;
	/** User-specified shipping address associated with the shipping query. */
	public shippingAddress = this.source.shipping_address;

	/**
	 * Answers the shipping query with the specified parameters.
	 *
	 * @param params - The parameters to use for answering the shipping query.
	 * @returns A Promise that resolves with the result of the API call to answer the shipping query.
	 */
	public answer(params: Partial<TelegramAnswerShippingQueryParams>) {
		return this.client.api.answerShippingQuery(Object.assign({ shipping_query_id: this.source.id, ok: true }, params));
	}
}
