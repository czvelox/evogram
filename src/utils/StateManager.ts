export function state() {
	return (target: any, propertyKey: string) => {
		const originalMethod = target[propertyKey];
		target[propertyKey] = function (...args: any[]) {
			const result = originalMethod.apply(this, args);
			return result;
		};
	};
}
