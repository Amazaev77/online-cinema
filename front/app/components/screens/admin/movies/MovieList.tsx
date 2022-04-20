import { FC } from 'react'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { useMovies } from './useMovies'

const MovieListPage: FC = () => {
	const {
		handleSearch,
		data,
		searchTerm,
		deleteAsync,
		isLoading,
		createAsync,
	} = useMovies()

	return (
		<Meta title="Movies">
			<AdminNavigation />
			<Heading title="Movies" />

			<AdminHeader
				searchTerm={searchTerm}
				handleSearch={handleSearch}
				onClick={createAsync}
			/>
			<AdminTable
				removeHandler={deleteAsync}
				tableItems={data || []}
				headerItems={['Title', 'Genre', 'Rating']}
				isLoading={isLoading}
			/>
		</Meta>
	)
}

export default MovieListPage
