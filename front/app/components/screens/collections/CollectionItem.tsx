import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import collections from '@/components/screens/collections/Collections'

import { getGenreUrl } from '@/config/url.config'

import CollectionImage from './CollectionImage'
import styles from './Collections.module.scss'
import { ICollection } from './collections.interface'

interface ICollectionItem {
	collection: ICollection
}

const CollectionItem: FC<ICollectionItem> = ({ collection }) => {
	if (!collection.image) return null

	return (
		<Link href={getGenreUrl(collection.slug)}>
			<a className={styles.collection}>
				<CollectionImage collection={collection} />

				<div className={styles.content}>
					<div className={styles.title}>{collection.title}</div>
				</div>

				<div className={cn(styles.behind, styles.second)}>
					<CollectionImage collection={collection} />
				</div>

				<div className={cn(styles.behind, styles.third)}>
					<CollectionImage collection={collection} />
				</div>
			</a>
		</Link>
	)
}

export default CollectionItem
