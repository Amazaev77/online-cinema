import { IActorEditInput } from '@/components/screens/admin/actor/actor-edit.interface'

import axios, { axiosClassic } from '@/api/interceptors'

import { IActor, IGenre } from '@/shared/types/movie.types'

import { getActorsUrl, getGenresUrl } from '@/config/api.config'

export const ActorService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IActor[]>(getActorsUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
	},

	async getBySlug(slug: string) {
		return axiosClassic.get<IActor>(getActorsUrl(`/by-slug/${slug}`))
	},

	async delete(id: string) {
		return axios.delete<string>(getActorsUrl(`/${id}`))
	},

	async create() {
		return axios.post<string>(getActorsUrl(`/`))
	},

	async update(id: string, data: IActorEditInput) {
		return axios.put<string>(getActorsUrl(`/${id}`), data)
	},

	async getById(id: string) {
		return axios.get<IActorEditInput>(getActorsUrl(`/${id}`))
	},
}
