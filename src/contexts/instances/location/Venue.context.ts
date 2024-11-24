import { TelegramVenue } from '../../../types';
import { Context, ContextD } from '../../core';
import { LocationContext } from '../../../migrated';

@ContextD('Venue')
export class VenueContext extends Context<TelegramVenue> {
	/** The location context associated with this venue context. */
	public location = this.getContext<LocationContext>({ key: 'Location', source: this.source.location });

	/** Title of the venue. */
	public title = this.source.title;
	/** Address of the venue. */
	public address = this.source.address;
	/** Foursquare ID and type associated with the venue. */
	public foursquare = { id: this.source.foursquare_id, type: this.source.foursquare_type };
	/** Google Place ID and type associated with the venue. */
	public googlePlace = { id: this.source.google_place_id, type: this.source.google_place_type };
}
