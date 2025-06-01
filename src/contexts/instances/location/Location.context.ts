import { TelegramLocation } from '../../../types';
import { Context, ContextD } from '../../core';

@ContextD('Location')
export class LocationContext extends Context<TelegramLocation> {
	/** Longitude of the current location. */
	public longitude = this.source.longitude;
	/** Returns the latitude of the current location. */
	public latitude = this.source.latitude;
	/** Returns the horizontal accuracy of the location data. */
	public horizontalAccuracy = this.source.horizontal_accuracy;
	/** Returns the time period during which the location data is considered "live". */
	public livePeriod = this.source.live_period;
	/** Returns the heading of the device when the location data was recorded. */
	public heading = this.source.heading;
	/** Returns the proximity alert radius for the location. */
	public proximityAlertRadius = this.source.proximity_alert_radius;

	/**
	 * Calculates the distance between this location and another location specified as a parameter.
	 * The Haversine formula is used, which takes into account the curvature of the Earth's surface.
	 * @param other The other location to calculate the distance to
	 * @returns The distance between the two locations in meters
	 */
	public distanceTo(other: TelegramLocation): number {
		const [lat1, lon1] = [this.latitude, this.longitude];
		const [lat2, lon2] = [other.latitude, other.longitude];
		const [dLat, dLon] = [((lat2 - lat1) * Math.PI) / 180, ((lon2 - lon1) * Math.PI) / 180];

		const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		return 6371000 * c;
	}

	/**
	 * Calculates the bearing (in degrees) between this location and another location.
	 * @param other The other location to calculate the bearing to
	 * @returns The bearing in degrees, where 0 degrees is due north
	 */
	public bearingTo(other: TelegramLocation): number {
		const dLon = ((other.longitude - this.source.longitude) * Math.PI) / 180;
		const [lat1, lat2] = [(this.source.latitude * Math.PI) / 180, (other.latitude * Math.PI) / 180];
		const [x, y] = [Math.sin(dLon) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon)];

		const bearing = (Math.atan2(y, x) * 180) / Math.PI;
		return (bearing + 360) % 360;
	}

	/**
	 * Checks if this location is within a specified radius around another location.
	 * @param center The center location to measure the distance from
	 * @param radius The radius in meters
	 * @returns True if this location is within the radius around the center location, false otherwise
	 */
	public isWithinRadius(center: TelegramLocation, radius: number): boolean {
		return this.distanceTo(center) <= radius;
	}

	/** Link to Google Maps that shows the current location. */
	public toGoogleMapsLink = `https://www.google.com/maps?q=${this.latitude},${this.longitude}`;

	/**
	 * Checks if this location is a live location that can be updated.
	 * A location is considered live if it has a `live_period` property greater than 0.
	 * @returns True if this is a live location, false otherwise
	 */
	public isLive = !!this.source.live_period && this.source.live_period > 0;

	/**
	 * Checks if this location has an accuracy radius that is smaller than or equal to a specified maximum value.
	 * A location is considered accurate if it has a `horizontal_accuracy` property that is defined and is less than or equal to the specified maximum value.
	 * @param maxAccuracy The maximum accuracy radius in meters
	 * @returns True if this location is accurate, false otherwise
	 */
	public isAccurate(maxAccuracy: number): boolean {
		return !!this.source.horizontal_accuracy && this.source.horizontal_accuracy <= maxAccuracy;
	}
}
