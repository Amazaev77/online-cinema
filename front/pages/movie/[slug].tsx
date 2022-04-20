import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import SingleMovie from '@/components/screens/single-movie/SingleMovie'

import Catalog from '@/ui/catalog-movies/Catalog'
import { IGalleryItem } from '@/ui/gallery/gallery.inteface'

import { IMovie } from '@/shared/types/movie.types'

import { MovieService } from '@/services/movie.service'

import { getMovieUrl } from '@/config/url.config'

import Error404 from '../404'

export interface IMoviePage {
	movie: IMovie
	similarMovies: IGalleryItem[]
}

const MoviePage: NextPage<IMoviePage> = ({ similarMovies, movie }) => {
	return movie ? (
		<SingleMovie movie={movie} similarMovies={similarMovies || []} />
	) : (
		<Error404 />
	)
}

export default MoviePage

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: movies } = await MovieService.getAll()
		const paths = movies.map((movie) => ({ params: { slug: movie.slug } }))

		return {
			paths,
			fallback: 'blocking',
		}
	} catch (e) {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: movie } = await MovieService.getBySlug(String(params?.slug))

		const { data: dataSimilarMovies } = await MovieService.getByGenres(
			movie.genres.map((g) => g._id)
		)

		const similarMovies: IGalleryItem[] = dataSimilarMovies
			.filter((m) => m._id !== movie._id)
			.map((movie) => {
				return {
					posterPath: movie.poster,
					name: movie.title,
					link: getMovieUrl(movie.slug),
				}
			})

		return {
			props: { movie, similarMovies },
			revalidate: 60,
		}
	} catch (e) {
		return {
			notFound: true,
		}
	}
}
