import { IProfileInput } from '@/components/screens/profile/profile.interface'

import axios from '@/api/interceptors'

import { IMovie } from '@/shared/types/movie.types'

import { getUsersUrl } from '@/config/api.config'

import { IUser } from '@/store/user/user.types'

export const UserService = {
	async getAll(searchTerm?: string) {
		return axios.get<IUser[]>(getUsersUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
	},

	async delete(id: string) {
		return axios.delete<string>(getUsersUrl(`/${id}`))
	},

	async getProfile() {
		return axios.get<IUser>(getUsersUrl('/profile'))
	},

	async getFavorites() {
		return axios.get<IMovie[]>(getUsersUrl('/profile/favorites'))
	},

	async toggleFavorite(movieId: string) {
		return axios.put<string>(getUsersUrl('/profile/favorites'), { movieId })
	},

	async updateProfile(data: IProfileInput) {
		return axios.put<string>(getUsersUrl('/profile'), data)
	},

	async getById(id: string) {
		return axios.get<IUser>(getUsersUrl(`/${id}`))
	},

	async update(id: string, data: IProfileInput) {
		return axios.put<string>(getUsersUrl(`/${id}`), data)
	},
}
