import cn from 'classnames'
import { FC } from 'react'

import MaterialIcon from '@/ui/MaterialIcon'

import styles from './SlideArrow.module.scss'

interface ISlideArrow {
	variant: 'left' | 'right'
	clickHandler: () => void
}

const SlideArrow: FC<ISlideArrow> = ({ variant, clickHandler }) => {
	const isLeft = variant === 'left'
	const classNames = {
		[styles.left]: isLeft,
		[styles.right]: !isLeft,
	}
	return (
		<button
			onClick={clickHandler}
			className={cn(styles.arrow, classNames)}
			aria-label={isLeft ? 'previous' : 'next slide'}
		>
			<MaterialIcon name={isLeft ? 'MdChevronLeft' : 'MdChevronRight'} />
		</button>
	)
}

export default SlideArrow
