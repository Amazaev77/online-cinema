import { FC } from 'react'

import FavoriteButton from '@/components/screens/single-movie/FavoriteButton/FavoriteButton'

import MaterialIcon from '@/ui/MaterialIcon'

import { useAuth } from '@/hooks/useAuth'

import { IActor, IGenre, IMovie } from '@/shared/types/movie.types'

import { getActorUrl, getGenreUrl } from '@/config/url.config'

import styles from './Content.module.scss'
import ContentList from './ContentList/ContentList'

const formatToLinks = (
	arr: IActor[] | IGenre[],
	getUrl: (s: string) => string
) =>
	arr.slice(0, 3).map((i) => ({
		_id: i._id,
		link: getUrl(i.slug),
		title: i.name,
	}))

const Content: FC<{ movie: IMovie }> = ({ movie }) => {
	const { user } = useAuth()

	return (
		<div className={styles.content}>
			<h1>{movie.title}</h1>
			<div className={styles.details}>
				<span>{movie.parameters.year} - </span>
				<span>{movie.parameters.country} - </span>
				<span>{movie.parameters.duration} min.</span>
			</div>

			<ContentList
				name="Genres: "
				links={formatToLinks(movie.genres, getGenreUrl)}
			/>

			<ContentList
				name="Actors: "
				links={formatToLinks(movie.actors, getActorUrl)}
			/>

			<div className={styles.rating}>
				<MaterialIcon name="MdStarRate" />
				<span>{movie.rating.toFixed(1)}</span>
			</div>

			{user && <FavoriteButton movieId={movie._id} />}
		</div>
	)
}

export default Content
