import s from './Button.module.scss'

type Props = {
	onClickCB: () => void
	isDisabled: boolean
	title: string
}

export const Button = ({onClickCB, isDisabled, title}: Props) => {
	return (
		<button className={s.button}
						onClick={onClickCB}
						disabled={isDisabled}
		>
			{title}
		</button>
	);
};

