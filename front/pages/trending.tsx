import { GetStaticProps, NextPage } from 'next'
import { FC } from 'react'

import Catalog from '@/ui/catalog-movies/Catalog'

import { IMovie } from '@/shared/types/movie.types'

import { MovieService } from '@/services/movie.service'

const Trending: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			title="Trending movies"
			movies={movies || []}
			description="Trending movies in excellent quality: legal, safe, without ads"
		/>
	)
}

export default Trending

export const getStaticProps: GetStaticProps = async () => {
	try {
		const movies = await MovieService.getMostPopularMovies()

		return {
			props: { movies },
			revalidate: 60,
		}
	} catch (e) {
		return {
			notFound: true,
		}
	}
}
