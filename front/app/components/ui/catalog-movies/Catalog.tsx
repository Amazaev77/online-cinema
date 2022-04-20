import { FC } from 'react'

import { ICatalog } from '@/ui/catalog-movies/catalog.interface'
import GalleryItem from '@/ui/gallery/GalleryItem'
import Description from '@/ui/heading/Description'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { getMovieUrl } from '@/config/url.config'

import styles from './Catalog.module.scss'

const Catalog: FC<ICatalog> = ({ movies, title, description }) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />

			{description && (
				<Description text={description} className={styles.description} />
			)}

			<section className={styles.movies}>
				{movies.map((movie) => (
					<GalleryItem
						key={movie._id}
						variant="horizontal"
						item={{
							name: movie.title,
							link: getMovieUrl(movie.slug),
							posterPath: movie.bigPoster,
							content: {
								title: movie.title,
							},
						}}
					/>
				))}
			</section>
		</Meta>
	)
}

export default Catalog
