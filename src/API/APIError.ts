interface APIErrorParams {
	method: string;
	params: Record<string, any>;
	error: Record<string, any>;
}

export class APIError extends Error {
	public method = this.error.method;
	public params = this.error.params;
	public error_code = this.error.error;

	constructor(private error: APIErrorParams) {
		console.error({ method: error.method, params: error.params, error: error.error });

		super(`API Error (${error.method} method): ${error.error}`);
	}
}
