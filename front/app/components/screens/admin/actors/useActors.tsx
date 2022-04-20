import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { ActorService } from '@/services/actor.service'

import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/config/url.config'

export const useActors = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['actor list', debouncedSearch],
		() => ActorService.getAll(searchTerm),
		{
			select: ({ data }) =>
				data.map(
					(actor): ITableItem => ({
						_id: actor._id,
						editUrl: getAdminUrl(`actor/edit/${actor._id}`),
						items: [actor.name, String(actor.countMovies)],
					})
				),
			onError: (error) => {
				toastError(error, 'Actors list')
			},
		}
	)

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		'delete actor',
		(actorId: string) => ActorService.delete(actorId),
		{
			onError: (error) => {
				toastError(error, 'Delete actor')
			},

			onSuccess: () => {
				toastr.success('Delete actor', 'delete was successful')
				queryData.refetch()
			},
		}
	)

	const { push } = useRouter()

	const { mutateAsync: createAsync } = useMutation(
		'delete actor',
		() => ActorService.create(),
		{
			onError: (error) => {
				toastError(error, 'Create actor')
			},

			onSuccess: ({ data: id }) => {
				toastr.success('Create actor', 'create was successful')
				push(getAdminUrl(`actor/edit/${id}`))
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
