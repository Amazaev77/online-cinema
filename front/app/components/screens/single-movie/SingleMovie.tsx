import dynamic from 'next/dynamic'
import { FC } from 'react'

import { useUpdateCountOpened } from '@/components/screens/single-movie/useUpdateCountOpened'
import Banner from '@/components/ui/banner/Banner'

import Gallery from '@/ui/gallery/Gallery'
import SubHeading from '@/ui/heading/SubHeading'

import Meta from '@/utils/meta/Meta'

import { IMoviePage } from '../../../../pages/movie/[slug]'

import Content from './Content/Content'

const DynamicVideoPlayer = dynamic(
	() => import('@/ui/video-player/VideoPlayer'),
	{
		ssr: false,
	}
)

const DynamicRateMovie = dynamic(() => import('./RateMovie/RateMovie'), {
	ssr: false,
})

const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	useUpdateCountOpened(movie.slug)

	return (
		<Meta title={movie.title} description={`Watch ${movie.title}`}>
			<Banner image={movie.bigPoster} Detail={() => <Content movie={movie} />} />

			<DynamicVideoPlayer slug={movie.slug} videoSource={movie.videoUrl} />

			<div className="mt-12">
				<SubHeading title="Similar" />
				<Gallery items={similarMovies} />
			</div>

			<DynamicRateMovie slug={movie.slug} id={movie._id} />
		</Meta>
	)
}

export default SingleMovie
