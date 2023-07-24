import axios from 'axios'

import { removeTokens, setTokens, updateRefreshToken } from '@/utils/jwt'

const axiosClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 300000,
	headers: {
		'content-type': 'application/json',
	},
})

axiosClient.interceptors.request.use(
	async (request) => {
		const accessToken = localStorage.getItem('accessToken')

		const newHeaders = {
			...request.headers,
			Authorization: `Bearer ${accessToken}`,
		}

		request = {
			...request,
			headers: newHeaders,
		}

		return request
	},
	(error) => {
		return Promise.reject(error)
	}
)

axiosClient.interceptors.response.use(
	function (response) {
		return response
	},
	async (error) => {
		const { response, config } = error
		const status = response?.status

		if (status === 406) {
			removeTokens()
		}

		if (status === 401) {
			const refreshToken = localStorage.getItem('refreshToken')

			if (!refreshToken) {
				return Promise.reject(error)
			}

			const rs = await updateRefreshToken(refreshToken)
			const { data, success, message } = rs

			if (!success) {
				return Promise.reject(message)
			}

			setTokens(data.accessToken, data.refreshToken)

			return axiosClient(config)
		}

		return Promise.reject(error)
	}
)

export default axiosClient
