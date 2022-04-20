import { FC } from 'react'
import { CSSTransition } from 'react-transition-group'

import SlideArrow from '@/ui/slider/SlideArrow/SlideArrow'
import SlideItem from '@/ui/slider/SlideItem'
import { useSlider } from '@/ui/slider/useSlider'

import styles from './Slider.module.scss'
import { ISlide } from './slider.interface'

interface ISlider {
	slides: ISlide[]
	buttonTitle?: string
}

const Slider: FC<ISlider> = ({ slides, buttonTitle }) => {
	const { isNext, isPrev, slideIn, handleCLick, index } = useSlider(
		slides.length
	)
	return (
		<div className={styles.slider}>
			<CSSTransition
				in={slideIn}
				classNames="slide-animation"
				timeout={250}
				unmountOnExit
			>
				<SlideItem slide={slides[index]} buttonTitle={buttonTitle} />
			</CSSTransition>
			{isPrev && (
				<SlideArrow variant="left" clickHandler={() => handleCLick('prev')} />
			)}
			{isNext && (
				<SlideArrow variant="right" clickHandler={() => handleCLick('next')} />
			)}
		</div>
	)
}

export default Slider
