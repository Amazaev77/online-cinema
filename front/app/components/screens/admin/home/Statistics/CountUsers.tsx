import cn from 'classnames'
import { FC } from 'react'
import { useQuery } from 'react-query'

import SkeletonLoader from '@/ui/SkeletonLoader'

import { AdminService } from '@/services/admin.service'

import styles from '../Admin.module.scss'

const CountUsers: FC = () => {
	const { data: response, isLoading } = useQuery('Count users', () =>
		AdminService.getCountUsers()
	)
	return (
		<div className={cn(styles.block, styles.countUsers)}>
			<div>
				{isLoading ? (
					<SkeletonLoader className="text-7xl mb-1" />
				) : (
					<div className={styles.number}>{response?.data}</div>
				)}
				<div className={styles.description}>users</div>
			</div>
		</div>
	)
}

export default CountUsers
