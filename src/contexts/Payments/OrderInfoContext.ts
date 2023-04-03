import type { IOrderInfo, IShippingAddress } from "../../interfaces";
import { Context } from "../../modules/context";
import { getCountryCodesWithPhone, getCountryWithCode } from "../../utils";

export class OrderInfoContext extends Context<IOrderInfo> {
	/** Returns the name associated with the order. */
	public get name() { return this._source.name }
	/** Returns the email associated with the order. */
	public get email() { return this._source.email }
	/** Returns the shipping address associated with the order. */
	public get address() { return this._source.shipping_address && this._client.modules.contexts.getContext<IShippingAddress>("ShippingAddress", this._source.shipping_address) }

	/**
	 * Returns an object that contains the phone number and country code associated with the order.
	 * If the `phone_number` property of the `source` property is not defined, returns `undefined`.
	 * @property number - The phone number associated with the order.
	 * @property country - An array of objects that contain the name of the country and the country code associated with the phone number.
	 */
	public phoneNumber = (this._source.phone_number && {
		number: this._source.phone_number,
		country: getCountryCodesWithPhone(this._source.phone_number).map(code => ({ country: getCountryWithCode(code), code }))
	}) || undefined;
}
