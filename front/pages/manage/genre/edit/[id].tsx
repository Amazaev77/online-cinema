import GenreEdit from '@/components/screens/admin/genre/GenreEdit'

import { NextPageAuth } from '@/shared/types/auth.types'

const GenreEditPage: NextPageAuth = () => {
	return <GenreEdit />
}

export default GenreEditPage

GenreEditPage.isOnlyAdmin = true
