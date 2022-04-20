import { FC } from 'react'

import SkeletonLoader from '@/ui/SkeletonLoader'
import AdminTableItem from '@/ui/admin-table/AdminTable/AdminTableItem'

import styles from './AdminTable.module.scss'
import AdminTableHeader from './AdminTableHeader'
import { ITableItem } from './admin-table.interface'

interface IAdminTable {
	tableItems: ITableItem[]
	isLoading: boolean
	headerItems: string[]
	removeHandler: (id: string) => void
}
const AdminTable: FC<IAdminTable> = (props) => {
	const { tableItems, isLoading, headerItems, removeHandler } = props

	return (
		<div>
			<AdminTableHeader headerItems={headerItems} />
			{isLoading ? (
				<SkeletonLoader count={1} height={48} className="mt-4" />
			) : tableItems.length ? (
				tableItems.map((tableItem) => (
					<AdminTableItem
						key={tableItem._id}
						tableItem={tableItem}
						removeHandler={removeHandler}
					/>
				))
			) : (
				<div className={styles.notFound}>Elements not found</div>
			)}
		</div>
	)
}

export default AdminTable
