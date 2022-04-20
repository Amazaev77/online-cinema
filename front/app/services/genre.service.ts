import { IGenreEditInput } from '@/components/screens/admin/genre/genre-edit.interface'
import { ICollection } from '@/components/screens/collections/collections.interface'

import axios, { axiosClassic } from '@/api/interceptors'

import { IGenre } from '@/shared/types/movie.types'

import { getGenresUrl } from '@/config/api.config'

export const GenreService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
	},

	async getById(id: string) {
		return axios.get<IGenreEditInput>(getGenresUrl(`/${id}`))
	},

	async getBySlug(slug: string) {
		return axiosClassic.get<IGenre>(getGenresUrl(`/by-slug/${slug}`))
	},

	async getCollections() {
		return axiosClassic.get<ICollection[]>(getGenresUrl('/collections/'))
	},

	async create() {
		return axios.post<string>(getGenresUrl(`/`))
	},

	async delete(id: string) {
		return axios.delete<string>(getGenresUrl(`/${id}`))
	},

	async update(id: string, data: IGenreEditInput) {
		return axios.put<string>(getGenresUrl(`/${id}`), data)
	},
}
