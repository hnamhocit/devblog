import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import axiosClient from '@/pages/api/axiosClient'
import { toggleShow } from '@/store/reducers/loginNoticeSlice'
import { selectUser, setUser } from '@/store/reducers/userSlice'
import { removeTokens } from '@/utils/jwt'
import { useAppDispatch } from './useAppDispatch'

export const useAuth = () => {
	const user = useSelector(selectUser)
	const dispatch = useAppDispatch()

	const checkAuth = () => {
		if (!user) {
			dispatch(toggleShow())
			return false
		}

		return true
	}

	const logout = async () => {
		try {
			if (checkAuth()) {
				const rs = await axiosClient.post('/auth/logout')
				const { success, message } = rs.data

				if (!success) {
					toast.error(message)
					return
				}

				removeTokens()
				dispatch(setUser(null))
			}
		} catch (error: any) {
			toast.error('Logout Error: ' + error.message)
		}
	}

	return { checkAuth, isLoggedIn: !!user, user, logout }
}
