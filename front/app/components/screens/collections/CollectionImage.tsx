import Image from 'next/image'
import { FC } from 'react'

import { ICollection } from './collections.interface'

interface ICollectionImage {
	collection: ICollection
}
const CollectionImage: FC<ICollectionImage> = ({ collection }) => {
	return (
		<Image
			alt={collection.title}
			src={collection.image}
			layout="fill"
			draggable={false}
		/>
	)
}

export default CollectionImage
