import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import { DefaultSeo } from 'next-seo'
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
		<>
			<DefaultSeo
				title='DEV BLOG'
				description='Are you looking for a platform where you can engage in meaningful discussions, exchange ideas, and lend support to others? Look no further! Our Blog App is the perfect place for you.'
				openGraph={{
					url: 'https://hnamhocit-devblog.vercel.app',
					type: 'website',
					title: 'DEV BLOG',
					description:
						'Are you looking for a platform where you can engage in meaningful discussions, exchange ideas, and lend support to others? Look no further! Our Blog App is the perfect place for you.',
					siteName: 'hnamhocit-devblog.vercel.app',
				}}
				twitter={{
					handle: '@hnamhocit',
					site: '@hnamhocit',
					cardType: 'summary_large_image',
				}}
			/>

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
		</>
	)
}
