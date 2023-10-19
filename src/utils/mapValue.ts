export function mapValue(inputValue: number, minInputValue: number, maxInputValue: number, minValue: number, maxValue: number): number {
	return minValue + ((inputValue - minInputValue) / (maxInputValue - minInputValue)) * (maxValue - minValue);
}
