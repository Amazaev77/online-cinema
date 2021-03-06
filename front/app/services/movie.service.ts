import { IMovieEditInput } from '@/components/screens/admin/movie/movie-edit.interface'

import axios, { axiosClassic } from '@/api/interceptors'

import { IMovie } from '@/shared/types/movie.types'

import { getMoviesUrl } from '@/config/api.config'

export const MovieService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
	},
	async getMostPopularMovies() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			getMoviesUrl('/most-popular')
		)

		return movies
	},

	async getById(id: string) {
		return axios.get<IMovieEditInput>(getMoviesUrl(`/${id}`))
	},

	async getByGenres(genreIds: string[]) {
		return axiosClassic.post<IMovie[]>(getMoviesUrl(`/by-genres`), { genreIds })
	},

	async getByActor(actorId: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(`/by-actor/${actorId}`))
	},

	async getBySlug(slug: string) {
		return axiosClassic.get<IMovie>(getMoviesUrl(`/by-slug/${slug}`))
	},

	async delete(id: string) {
		return axios.delete<string>(getMoviesUrl(`/${id}`))
	},

	async create() {
		return axios.post<string>(getMoviesUrl(`/`))
	},

	async update(id: string, data: IMovieEditInput) {
		return axios.put<string>(getMoviesUrl(`/${id}`), {
			description: '',
			...data,
		})
	},

	async updateCountOpened(slug: string) {
		return axiosClassic.put<string>(getMoviesUrl(`/update-count-opened`), {
			slug,
		})
	},
}
