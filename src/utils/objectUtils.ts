export function getValueOrEmptyFromObject(object: Record<string, string>, key: string): string {
	return object && object[key] ? (typeof object[key] !== 'string' ? object[key].toString() : object[key]) : '';
}
