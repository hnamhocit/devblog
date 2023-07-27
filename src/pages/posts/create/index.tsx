import { NextSeo } from 'next-seo'

import PostForm from '@/components/PostForm'
import Protected from '@/components/Protected'

const CreatePost = () => {
	const seo = {
		title: 'CREATE POST',
		description: "Let's create amazing and interesting articles together!",
	}

	return (
		<>
			<NextSeo {...seo} openGraph={seo} />

			<Protected>
				<PostForm />
			</Protected>
		</>
	)
}

export default CreatePost
