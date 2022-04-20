import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { MovieService } from '@/services/movie.service'

import { getGenresList } from '@/utils/movie/getGenresListEach'
import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/config/url.config'

export const useMovies = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['movie list', debouncedSearch],
		() => MovieService.getAll(searchTerm),
		{
			select: ({ data }) =>
				data.map(
					(movie): ITableItem => ({
						_id: movie._id,
						editUrl: getAdminUrl(`movie/edit/${movie._id}`),
						items: [
							movie.title,
							getGenresList(movie.genres),
							String(movie.rating),
						],
					})
				),
			onError: (error) => {
				toastError(error, 'Movie list')
			},
		}
	)

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		'delete movie',
		(movieId: string) => MovieService.delete(movieId),
		{
			onError: (error) => {
				toastError(error, 'Delete movie')
			},

			onSuccess: () => {
				toastr.success('Delete movie', 'delete was successful')
				queryData.refetch()
			},
		}
	)

	const { push } = useRouter()

	const { mutateAsync: createAsync } = useMutation(
		'delete movie',
		() => MovieService.create(),
		{
			onError: (error) => {
				toastError(error, 'Create genre')
			},

			onSuccess: ({ data: id }) => {
				toastr.success('Create movie', 'create was successful')
				push(getAdminUrl(`movie/edit/${id}`))
			},
		}
	)

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync,
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	)
}
