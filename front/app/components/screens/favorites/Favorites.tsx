import { FC } from 'react'

import FavoriteItem from '@/components/screens/favorites/FavoriteItem'

import SkeletonLoader from '@/ui/SkeletonLoader'
import Heading from '@/ui/heading/Heading'

import { useAuth } from '@/hooks/useAuth'

import Meta from '@/utils/meta/Meta'

import Error404 from '../../../../pages/404'

import styles from './Favorites.module.scss'
import { useFavorites } from './useFavorites'

const Favorites: FC = () => {
	const { isLoading, favoriteMovies } = useFavorites()

	const { user } = useAuth()

	if (!user) {
		return <Error404 />
	}

	return (
		<Meta title="Favorites">
			<Heading title="Favorites" />
			<section className={styles.favorites}>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						className={styles.skeletonLoader}
						containerClassName={styles.containerLoader}
					/>
				) : (
					favoriteMovies?.map((movie) => (
						<FavoriteItem key={movie._id} movie={movie} />
					))
				)}
			</section>
		</Meta>
	)
}

export default Favorites
