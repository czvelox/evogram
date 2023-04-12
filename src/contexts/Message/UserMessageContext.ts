import { UserContext } from "../Essence";
import { MessageContext } from "./MessageContext";

export class UserMessageContext extends MessageContext {
	//@ts-ignore
	public user: UserContext = this._client.modules.contexts.getContext<UserContext>("User", this._source.from);
}