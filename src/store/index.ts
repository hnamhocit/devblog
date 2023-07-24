import { configureStore } from '@reduxjs/toolkit'

import loginNoticeReducer from './reducers/loginNoticeSlice'
import userReducer from './reducers/userSlice'

const store = configureStore({
	reducer: {
		user: userReducer,
		loginNotice: loginNoticeReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
