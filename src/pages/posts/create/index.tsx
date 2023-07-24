import PostForm from '@/components/PostForm'
import Protected from '@/components/Protected'

const CreatePost = () => {
	return (
		<Protected>
			<PostForm />
		</Protected>
	)
}

export default CreatePost
