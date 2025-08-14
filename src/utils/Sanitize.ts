export function sanitizeObject(obj: any): any {
	if (typeof obj === 'string') return obj.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
	if (Array.isArray(obj)) return obj.map((item) => sanitizeObject(item));

	if (obj !== null && typeof obj === 'object') {
		const sanitizedObj: any = {};
		for (const key in obj) if (obj.hasOwnProperty(key)) sanitizedObj[key] = sanitizeObject(obj[key]);

		return sanitizedObj;
	}

	return obj;
}
