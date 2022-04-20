import { FC } from 'react'

import Sidebar from '@/components/layout/Sidebar/Sidebar'

import styles from './Layout.module.scss'
import Navigation from './Navigation/Navigation'

const Layout: FC = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Navigation />
			<div className={styles.center}>{children}</div>
			<Sidebar />
		</div>
	)
}

export default Layout
