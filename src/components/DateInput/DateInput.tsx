import type {ChangeEvent, KeyboardEvent} from "react";
import s from './DateInput.module.scss'

type InputProps = {
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onBlur: () => void;
	placeholder: string;
};

export function DateInput({ value, onChange, onBlur, placeholder }: InputProps) {

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
		if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
			e.preventDefault();
		}
	};

	return (
		<input
			className={s.input}
			type="text"
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			onKeyDown={handleKeyDown}
			inputMode="numeric"
			pattern="\d*"
		/>
	);
}
