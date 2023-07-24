import { FC, ReactNode, memo, useCallback, useEffect, useState } from 'react'

import { useAppDispatch } from '@/hooks/useAppDispatch'
import axiosClient from '@/pages/api/axiosClient'
import { setUser } from '@/store/reducers/userSlice'
import { removeTokens, setTokens, updateRefreshToken } from '@/utils/jwt'
import Loading from '../Loading'

interface AuthProps {
	children: ReactNode
}

const Auth: FC<AuthProps> = ({ children }) => {
	const [loading, setLoading] = useState(true)
	const dispatch = useAppDispatch()

	const fetchUser = useCallback(async () => {
		try {
			const refreshToken = localStorage.getItem('refreshToken')

			if (!refreshToken) {
				setLoading(false)
				return
			}

			const { data, success, message } = await updateRefreshToken(
				refreshToken
			)

			if (!success) {
				removeTokens()
				setLoading(false)
				console.log(message)
				return
			}

			setTokens(data.accessToken, data.refreshToken)
			const rs = await axiosClient.get('/users/me')
			const result = rs.data

			if (!result.success) {
				console.log(result.message)
				setLoading(false)
				return
			}

			dispatch(setUser(result.data))
		} catch (error: any) {
			console.log(error.message)
		} finally {
			setLoading(false)
		}
	}, [dispatch])

	useEffect(() => {
		fetchUser()
	}, [fetchUser])

	if (loading) return <Loading />

	return children
}

export default memo(Auth)
