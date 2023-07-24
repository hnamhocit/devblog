import axios from 'axios'

export const updateRefreshToken = async (token: string) => {
	const rs = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	)

	return rs.data
}

export const setTokens = (access: string, refresh: string) => {
	localStorage.setItem('accessToken', access)
	localStorage.setItem('refreshToken', refresh)
	return true
}

export const removeTokens = () => {
	localStorage.removeItem('accessToken')
	localStorage.removeItem('refreshToken')
	return true
}
