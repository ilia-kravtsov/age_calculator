import {type ChangeEvent, useState } from 'react';
import s from './AgeCalculator.module.scss';
import {Display} from "../Display/Display.tsx";
import {clampToRange, isDateInputLengthValid, isValidDate, sanitizeInput} from "./utils.ts";
import {DateInput} from "../DateInput/DateInput.tsx";
import {Button} from "../Button/Button.tsx";

export interface IDate {
	day: string;
	month: string;
	year: string;
}

export default function AgeCalculator() {
	const [date, setDate] = useState<IDate>({day: '', month: '', year: ''});
	const [age, setAge] = useState<number | null>(null);
	const [error, setError] = useState('');

	const calculateAge = () => {
		if (!isDateInputLengthValid(date)) {
			setError('Формат даты 31 12 1991');
			return;
		}
		setError('');
		const birthDay = parseInt(date.day, 10);
		const birthMonth = parseInt(date.month, 10);
		const birthYear = parseInt(date.year, 10);

		const { valid, error } = isValidDate(birthDay, birthMonth, birthYear);
		if (!valid) {
			setError(error || 'Формат даты 31 12 1991');
			setAge(null);
			return;
		}

		const today = new Date();

		let ageCalc = today.getFullYear() - birthYear;
		const isBeforeBirthday =
			today.getMonth() < (birthMonth - 1) ||
			(today.getMonth() === (birthMonth - 1) && today.getDate() < birthDay);

		if (isBeforeBirthday) {
			ageCalc--;
		}

		if (ageCalc < 0) {
			setError('Возраст не может быть отрицательным');
			setAge(null);
			return;
		}

		setAge(ageCalc);
	};

	const handleDayChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = sanitizeInput(e, 2)
		setDate(prev => ({ ...prev, day: val }));
	};

	const handleDayBlur = () => {
		if (date.day === '') return;

		const clamped = clampToRange(date.day, 1, 31);

		setDate(prev => ({ ...prev, day: clamped }));
	}

	const handleMonthChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = sanitizeInput(e, 2)
		setDate(prev => ({ ...prev, month: val }));
	};

	const handleMonthBlur = () => {
		if (date.month === '') return;

		const clamped = clampToRange(date.month, 1, 12);

		setDate(prev => ({ ...prev, month: clamped }));
	};

	const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = sanitizeInput(e, 4)
		setDate(prev => ({ ...prev, year: val }));
	};

	const handleYearBlur = () => {
		if (date.year === '' || date.year.length < 4) return;

		const currentYear = new Date().getFullYear();

		const clamped = clampToRange(date.year, 1900, currentYear);

		setDate(prev => ({ ...prev, year: clamped }));
	};

	const isDisabled = !isDateInputLengthValid(date)

	return (
		<div className={s.container}>
			<div className={s.calculator}>
				<Display age={age} error={error}/>

				<div className={s.calculator__inputsBox}>
					<DateInput
						value={date.day}
						onChange={handleDayChange}
						onBlur={handleDayBlur}
						placeholder={`31`}
					/>
					<DateInput
						value={date.month}
						onChange={handleMonthChange}
						onBlur={handleMonthBlur}
						placeholder={`12`}
					/>
					<DateInput
						value={date.year}
						onChange={handleYearChange}
						onBlur={handleYearBlur}
						placeholder={`1991`}
					/>
				</div>
				<Button title={'Узнать возраст'}
								onClickCB={calculateAge}
								isDisabled={isDisabled}
				/>
			</div>
		</div>
	);
}
