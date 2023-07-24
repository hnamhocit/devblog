import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import Auth from '@/components/Auth'
import Container from '@/components/Container'
import Header from '@/components/Header'
import LoginNotice from '@/components/LoginNotice'
import store from '@/store'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Auth>
				<Header />

				<main className='min-h-screen py-4 bg-neutral-100'>
					<Container>
						<Component {...pageProps} />
					</Container>
				</main>
			</Auth>

			<LoginNotice />
			<ToastContainer />
		</Provider>
	)
}
