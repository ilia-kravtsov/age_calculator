import type {ChangeEvent} from "react";
import type {IDate} from "./AgeCalculator.tsx";

export function isValidDate(day: number, month: number, year: number): { valid: boolean; error: null | string } {
	if (isNaN(day) || isNaN(month) || isNaN(year)) {
		return { valid: false, error: 'Дата должна содержать только цифры' };
	}
	const currentYear = new Date().getFullYear();
	if (year < 1900 || year > currentYear) {
		return { valid: false, error: `Год должен быть в диапазоне от 1900 до ${currentYear}` };
	}
	if (month < 1 || month > 12) {
		return { valid: false, error: 'Месяц должен быть от 1 до 12' };
	}
	if (day < 1) {
		return { valid: false, error: 'День должен быть больше 0' };
	}

	const daysInMonth = new Date(year, month, 0).getDate();
	if (day > daysInMonth) {
		return { valid: false, error: `В месяце ${month} максимум ${daysInMonth} дней` };
	}

	return { valid: true, error: null };
};

export function sanitizeInput(e: ChangeEvent<HTMLInputElement>, length: number): string {
	let val = e.target.value.replace(/\D/g, '');
	if (val.length > length) val = val.slice(0, length);
	return val
}

export function clampToRange(val: string, min: number, max: number): string {
	const num = parseInt(val, 10);
	if (isNaN(num) || num < min) return min.toString();
	if (num > max) return max.toString();
	return String(num);
}

export function isDateInputLengthValid(date: IDate): boolean {
	return (
		date.day.length >= 1 && date.day.length <= 2 &&
		date.month.length >= 1 && date.month.length <= 2 &&
		date.year.length === 4
	);
}

