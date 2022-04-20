import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { IGenreEditInput } from '@/components/screens/admin/genre/genre-edit.interface'

import { GenreService } from '@/services/genre.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/config/url.config'

export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
	const { push, query } = useRouter()

	const genreId = String(query.id)

	const { isLoading } = useQuery(
		['genre', genreId],
		() => GenreService.getById(genreId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError: (error) => {
				toastError(error, 'Get genre')
			},
			enabled: !!query.id,
		}
	)

	const { mutateAsync: updateGenre } = useMutation(
		'update genre',
		(data: IGenreEditInput) => GenreService.update(genreId, data),
		{
			onError: (error) => {
				toastError(error, 'Update genre')
			},
			onSuccess: () => {
				toastr.success('Update genre', 'Update was successful')
				push(getAdminUrl('genres'))
			},
		}
	)

	const onSubmit: SubmitHandler<IGenreEditInput> = async (data) => {
		await updateGenre(data)
	}

	return { isLoading, onSubmit }
}
