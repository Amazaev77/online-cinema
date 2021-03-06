import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

import Button from '@/ui/form-elements/Button'

import styles from './Slider.module.scss'
import { ISlide } from './slider.interface'

interface ISlideItem {
	slide: ISlide
	buttonTitle?: string
}

const SlideItem: FC<ISlideItem> = ({ slide, buttonTitle = 'Watch' }) => {
	const { push } = useRouter()

	return (
		<div className={styles.slide}>
			{slide.bigPoster && (
				<Image
					className={styles.image}
					layout="fill"
					draggable={false}
					src={slide.bigPoster}
					alt={slide.title}
					unoptimized
					priority
				/>
			)}

			<div className={styles.content}>
				<div className={styles.heading}>{slide.title}</div>
				<div className={styles.subHeading}>{slide.subTitle}</div>
				<Button className={styles.button} onClick={() => push(slide.link)}>
					{buttonTitle}
				</Button>
			</div>
		</div>
	)
}

export default SlideItem
