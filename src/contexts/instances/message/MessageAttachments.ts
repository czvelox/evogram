import { Context } from '../../core';
import { TelegramMessage } from '../../../types';
import { LocationContext, PollContext, VenueContext } from '../../../migrated';

/**
 * MessageAttachments handles the various types of media and attachments
 * that can be included in a Telegram message.
 */
export class MessageAttachments extends Context<TelegramMessage> {
	public animation = this.source.animation;
	public audio = this.source.audio;
	public document = this.source.document;
	public photo = this.source.photo;
	public sticker = this.source.sticker;
	public story = this.source.story;
	public video = this.source.video;
	public videoNote = this.source.video_note;
	public voice = this.source.voice;
	public contact = this.source.contact;
	public dice = this.source.dice;
	public game = this.source.game;
	public passport = this.source.passport_data;
	public giveaway = this.source.giveaway;

	public paidMedia = this.source.paid_media;
	public showCaptionAboveMedia = this.source.show_caption_above_media;
	public mediaGroupID = this.source.media_group_id;

	public invoice = this.source.invoice;
	public linkPreviewOptions = this.source.link_preview_options;

	public poll = this.getContext<PollContext | undefined>({ key: 'Poll', source: this.source.poll });
	public venue = this.getContext<VenueContext | undefined>({ key: 'Venue', source: this.source.venue });
	public location = this.getContext<LocationContext | undefined>({ key: 'Location', source: this.source.location });
}
