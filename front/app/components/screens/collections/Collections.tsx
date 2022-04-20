import { FC } from 'react'

import CollectionItem from '@/components/screens/collections/CollectionItem'
import Description from '@/components/ui/heading/Description'

import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import styles from './Collections.module.scss'
import { ICollection } from './collections.interface'

interface ICollections {
	collections: ICollection[]
}

const description = 'In this section you will find all genres on our site'

const Collections: FC<ICollections> = ({ collections }) => {
	return (
		<Meta title="Discovery" description={description}>
			<Heading title="Discovery" className={styles.heading} />
			<Description text={description} className={styles.description} />

			<section className={styles.collections}>
				{collections.map((collection) => (
					<CollectionItem key={collection._id} collection={collection} />
				))}
			</section>
		</Meta>
	)
}

export default Collections
