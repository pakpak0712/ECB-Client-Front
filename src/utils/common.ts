export const dictionary = (val: any, options: { text: string; value: unknown }[]) => {
	return options.find((v) => v.value === val)?.text ?? val;
};
export function getLineStation(string: string) {
	if (!string) return { line: '', station: '' };
	const splitedString = string.split(' ');
	const line = splitedString[0];
	const station = splitedString[1];
	return { line, station };
}
