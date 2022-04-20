import { IMovie } from '@/shared/types/movie.types'

export interface ISlide extends Pick<IMovie, 'bigPoster' | '_id' | 'title'> {
	subTitle: string
	link: string
}
