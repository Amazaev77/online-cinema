import { FC } from 'react'

import Button from '@/ui/form-elements/Button'

interface IAdminCreateButton {
	onClick: () => void
}

const AdminCreateButton: FC<IAdminCreateButton> = ({ onClick }) => {
	return <Button onClick={onClick}>Create new</Button>
}

export default AdminCreateButton
