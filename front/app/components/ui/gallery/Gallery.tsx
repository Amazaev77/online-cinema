import { FC } from 'react'

import GalleryItem from '@/ui/gallery/GalleryItem'

import styles from './Gallery.module.scss'
import { IGalleryItem } from './gallery.inteface'

interface IGallery {
	items: IGalleryItem[]
}

const Gallery: FC<IGallery> = ({ items }) => {
	return (
		<div className={styles.gallery}>
			{items.map((item) => (
				<GalleryItem key={item.link} item={item} variant="vertical" />
			))}
		</div>
	)
}

export default Gallery
