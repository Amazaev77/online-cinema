import cn from 'classnames'
import { FC, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

import { useFavorites } from '@/components/screens/favorites/useFavorites'

import { UserService } from '@/services/user.service'

import { toastError } from '@/utils/toast-error'

import styles from './FavoriteButton.module.scss'

const FavoriteButton: FC<{ movieId: string }> = ({ movieId }) => {
	const [isSmashed, setIsSmashed] = useState(false)

	const { refetch, favoriteMovies } = useFavorites()

	useEffect(() => {
		if (!favoriteMovies) return
		const isHasMovie = favoriteMovies.some((f) => f._id === movieId)

		if (isSmashed !== isHasMovie) setIsSmashed(!isSmashed)
	}, [favoriteMovies, isSmashed, movieId])

	const { mutateAsync } = useMutation(
		'update favorites',
		() => UserService.toggleFavorite(movieId),
		{
			onError: (error) => {
				toastError(error, 'Update favorite list')
			},
			onSuccess: () => {
				setIsSmashed(!isSmashed)
				refetch()
			},
		}
	)

	return (
		<button
			onClick={() => mutateAsync()}
			style={{ backgroundImage: `url('/heart-animation.png')` }}
			className={cn(styles.button, {
				[styles.animate]: isSmashed,
			})}
		/>
	)
}

export default FavoriteButton
