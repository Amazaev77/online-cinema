import { GetStaticProps, NextPage } from 'next'

import Home from '@/components/screens/home/Home'
import { IHome } from '@/components/screens/home/home.interface'

import { IGalleryItem } from '@/ui/gallery/gallery.inteface'
import { ISlide } from '@/ui/slider/slider.interface'

import { ActorService } from '@/services/actor.service'
import { MovieService } from '@/services/movie.service'

import { getGenresList } from '@/utils/movie/getGenresListEach'

import { getActorUrl, getMovieUrl } from '@/config/url.config'

const HomePage: NextPage<IHome> = (props) => {
	return <Home {...props} />
}

export default HomePage

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getAll()
		const { data: actorsData } = await ActorService.getAll()
		const dataTrendingMovies = await MovieService.getMostPopularMovies()

		const slides: ISlide[] = movies.slice(0, 4).map((m) => ({
			_id: m._id,
			link: getMovieUrl(m.slug),
			bigPoster: m.bigPoster,
			subTitle: getGenresList(m.genres),
			title: m.title,
		}))

		const actors: IGalleryItem[] = actorsData.slice(0, 7).map((actor) => ({
			posterPath: actor.photo,
			name: actor.name,
			link: getActorUrl(actor.slug),
			content: {
				title: actor.name,
				subTitle: `+${actor.countMovies} movies`,
			},
		}))

		const trendingMovies: IGalleryItem[] = dataTrendingMovies.map((movie) => ({
			name: movie.title,
			posterPath: movie.poster,
			link: getMovieUrl(movie.slug),
		}))

		return { props: { slides, actors, trendingMovies } as IHome }
	} catch (err) {
		return {
			props: { slides: [], trendingMovies: [], actors: [] } as IHome,
			revalidate: 60,
		}
	}
}
