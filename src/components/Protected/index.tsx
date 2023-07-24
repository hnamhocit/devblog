import { FC, ReactNode, memo } from 'react'
import { useSelector } from 'react-redux'

import Enter from '@/pages/enter'
import { selectUser } from '@/store/reducers/userSlice'

interface ProtectedProps {
	children: ReactNode
}

const Protected: FC<ProtectedProps> = ({ children }) => {
	const user = useSelector(selectUser)

	if (!user) {
		return <Enter />
	}

	return children
}

export default memo(Protected)
