import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

const loginNoticeSlice = createSlice({
	name: 'auth',
	initialState: {
		show: false,
	},
	reducers: {
		toggleShow(state) {
			state.show = !state.show
		},
	},
})

export const { toggleShow } = loginNoticeSlice.actions
export const selectLoginNotice = (state: RootState) => state.loginNotice

export default loginNoticeSlice.reducer
