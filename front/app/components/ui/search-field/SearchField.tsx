import { ChangeEvent, FC } from 'react'

import MaterialIcon from '@/ui/MaterialIcon'

import styles from './SearchField.module.scss'

interface ISearchField {
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
	onFocus?: () => void
	onBlur?: () => void
}

const SearchField: FC<ISearchField> = ({
	searchTerm,
	handleSearch,
	onFocus,
	onBlur,
}) => {
	return (
		<div className={styles.search}>
			<MaterialIcon name="MdSearch" />
			<input
				type="text"
				placeholder="Search"
				value={searchTerm}
				onChange={handleSearch}
				onFocus={onFocus}
				onBlur={onBlur}
			/>
		</div>
	)
}

export default SearchField
