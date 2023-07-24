import { Avatar } from '@mui/material'
import moment from 'moment'
import { FC, memo } from 'react'

import { User } from '@/types'

type AuthorProps = {
	user: User | undefined
	updatedAt: Date | undefined
}

const Author: FC<AuthorProps> = ({ user, updatedAt }) => {
	return (
		<div className='flex items-center gap-3'>
			<div>
				<Avatar src={user?.photoURL ?? ''} alt={user?.name} />
			</div>

			<div>
				<div className='text-sm font-medium'>{user?.name}</div>
				<div className='text-xs text-gray-500'>
					{moment(updatedAt).format('DD/MM/YYYY HH:mm')}
				</div>
			</div>
		</div>
	)
}

export default memo(Author)
