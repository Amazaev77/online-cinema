import { FC } from 'react'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { useGenres } from './useGenres'

const GenreList: FC = () => {
	const {
		handleSearch,
		data,
		searchTerm,
		deleteAsync,
		isLoading,
		createAsync,
	} = useGenres()

	return (
		<Meta title="Genre">
			<AdminNavigation />
			<Heading title="Genre" />

			<AdminHeader
				searchTerm={searchTerm}
				handleSearch={handleSearch}
				onClick={createAsync}
			/>
			<AdminTable
				removeHandler={deleteAsync}
				tableItems={data || []}
				headerItems={['Name', 'Slug']}
				isLoading={isLoading}
			/>
		</Meta>
	)
}

export default GenreList
