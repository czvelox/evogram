import type { IPreCheckoutQuery } from "../../interfaces";
import { Context } from "../../modules/context";
import { UserContext, OrderInfoContext } from "../";

export class PreCheckoutQueryContext extends Context<IPreCheckoutQuery> {
	public client = this._client;

	/** Returns a `UserContext` object that represents the user who initiated the pre-checkout query. */
	public user = this.client.modules.contexts.getContext<UserContext>("User", this._source.from);
	/** Returns the ID associated with the pre-checkout query. */
	public get id() { return this._source.id }
	/** Returns the currency code associated with the pre-checkout query. */
	public get currency() { return this._source.currency }
	/** Returns the total amount of the pre-checkout query. */
	public get amount() { return this._source.total_amount }
	/** Returns the invoice payload associated with the pre-checkout query. */
	public get payload() { return this._source.invoice_payload }
	/** Returns the ID of the shipping option selected by the user, if any. */
	public get shippingOptionID() { return this._source.shipping_option_id }

	/**
	 * Returns an `OrderInfoContext` object that represents the order information associated with the pre-checkout query.
	 * If the `order_info` property of the `source` property is not defined, returns `undefined`.
	 */
	public orderInfo = (this._source.order_info && this.client.modules.contexts.getContext<OrderInfoContext>("OrderInfo", this._source.order_info));
}
