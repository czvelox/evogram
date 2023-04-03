import http from "http";
import url from "url";

import type { ISetWebhookParams } from "../interfaces";
import { EventTransport, EventTransportState } from "./EventTransport";

export class Webhook extends EventTransport {
	public webhookServer: http.Server | undefined;
	public pathname: string | undefined;

	public createServer(): http.Server {
		return http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
			if(req.method !== "POST" || req.url !== this.pathname) return res.end();

			const chunks: any = [];

        	req.on("data", chunk => chunks.push(chunk));
			req.on("end", () => { this.handler.onUpdate(this.client.modules.contexts.getContext("Update", JSON.parse(Buffer.concat(chunks).toString()))); res.end() });
		});
	}
	
	/** Running webhook */
	public async start(params: ISetWebhookParams, port?: number) {
		if(this.state === EventTransportState.Enabled) return;

		const webhookURL = url.parse(params.url);
		if(!webhookURL.pathname || !webhookURL.hostname || !webhookURL.protocol || !webhookURL.href) throw new Error("Invalid webhook URL");
		this.pathname = webhookURL.pathname;

		if(!this.webhookServer) this.webhookServer = this.createServer();
		

		await this.client.api.setWebhook(params)
		this.webhookServer.listen(port || 8080);
		this.state = EventTransportState.Enabled;
	}

	/** Stopping webhook */
	public stop() {
		this.state = EventTransportState.Disabled;
		this.webhookServer?.close();
	}
}