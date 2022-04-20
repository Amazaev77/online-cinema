import { FC } from 'react'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { useActors } from './useActors'

const ActorsListPage: FC = () => {
	const {
		handleSearch,
		data,
		searchTerm,
		deleteAsync,
		isLoading,
		createAsync,
	} = useActors()

	return (
		<Meta title="Actors">
			<AdminNavigation />
			<Heading title="Actors" />

			<AdminHeader
				searchTerm={searchTerm}
				handleSearch={handleSearch}
				onClick={createAsync}
			/>
			<AdminTable
				removeHandler={deleteAsync}
				tableItems={data || []}
				headerItems={['Name', 'Count movies']}
				isLoading={isLoading}
			/>
		</Meta>
	)
}

export default ActorsListPage
