import { IGalleryItem } from '@/ui/gallery/gallery.inteface'
import { ISlide } from '@/ui/slider/slider.interface'

export interface IHome {
	slides: ISlide[]
	trendingMovies: IGalleryItem[]
	actors: IGalleryItem[]
}
