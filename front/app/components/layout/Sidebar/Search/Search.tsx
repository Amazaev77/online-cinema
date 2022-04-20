import { FC, useState } from 'react'

import SearchField from '@/ui/search-field/SearchField'

import styles from './Search.module.scss'
import SearchList from './SearchList/SearchList'
import { useSearch } from './useSearch'

const Search: FC = () => {
	const { isSuccess, handleSearch, data, searchTerm } = useSearch()
	const [isFocused, setIsFocused] = useState(false)

	const onFocus = () => setIsFocused(true)
	const onBlur = () => setIsFocused(false)

	return (
		<div className={styles.wrapper}>
			<SearchField
				onFocus={onFocus}
				onBlur={onBlur}
				handleSearch={handleSearch}
				searchTerm={searchTerm}
			/>
			{isSuccess && isFocused && <SearchList movies={data || []} />}
		</div>
	)
}

export default Search
