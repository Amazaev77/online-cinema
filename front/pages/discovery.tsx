import { GetStaticProps, NextPage } from 'next'

import Collections from '@/components/screens/collections/Collections'
import { ICollection } from '@/components/screens/collections/collections.interface'

import { GenreService } from '@/services/genre.service'

import Error404 from './404'

interface IDiscoveryPage {
	collections: ICollection[]
}

const DiscoveryPage: NextPage<IDiscoveryPage> = ({ collections }) => {
	return collections ? (
		<Collections collections={collections || []} />
	) : (
		<Error404 />
	)
}

export default DiscoveryPage

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: collections } = await GenreService.getCollections()

		return {
			props: { collections },
			revalidate: 60,
		}
	} catch (e) {
		return {
			notFound: true,
		}
	}
}
