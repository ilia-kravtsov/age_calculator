import s from './Display.module.scss'
import { useState, useEffect } from 'react'
import { getYearWord } from './utils.ts'

type Props = {
	age: number | null
	error?: string
}

export const Display = ({ age, error }: Props) => {
	const [displayedAge, setDisplayedAge] = useState<number | null>(null)
	const [displayedError, setDisplayedError] = useState<string | undefined>(undefined)
	const [visibleAge, setVisibleAge] = useState(true)
	const [visibleError, setVisibleError] = useState(false)

	useEffect(() => {
		if (!error) {
			setVisibleError(false)
			const timer = setTimeout(() => setDisplayedError(undefined), 400)
			return () => clearTimeout(timer)
		} else {
			setDisplayedError(error)
			setVisibleError(true)
		}
	}, [error])

	useEffect(() => {
		if (age === displayedAge) return
		setVisibleAge(false)
		const timer = setTimeout(() => {
			setDisplayedAge(age)
			setVisibleAge(true)
		}, 400)
		return () => clearTimeout(timer)
	}, [age, displayedAge])

	return (
		<div className={s.container}>
			{displayedError ? (
				<div className={`${s.display} ${visibleError ? s.visible : ''}`}>
					{displayedError}
				</div>
			) : (
				<div className={`${s.display} ${visibleAge ? s.visible : ''}`}>
					{displayedAge !== null
						? `${displayedAge} ${getYearWord(displayedAge)}`
						: 'Введите дату рождения'}
				</div>
			)}
		</div>
	)
}
