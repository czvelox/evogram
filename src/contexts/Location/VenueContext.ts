import type { IVenue } from "../../interfaces";
import { Context } from "../../modules/context";
import { LocationContext } from "./";

export class VenueContext extends Context<IVenue> {
	/** The location context associated with this venue context. */
	public location = this._client.contexts.getContext<LocationContext>("Location", this._source.location);

	/** Returns the title of the venue. */
	public get title() { return this._source.title }
	/** Returns the address of the venue. */
	public get address() { return this._source.address }
	/** Returns the Foursquare ID and type associated with the venue. */
	public get foursquare() { return { id: this._source.foursquare_id, type: this._source.foursquare_type } };
	/** Returns the Google Place ID and type associated with the venue. */
	public get googlePlace() { return { id: this._source.google_place_id, type: this._source.google_place_type } }
}