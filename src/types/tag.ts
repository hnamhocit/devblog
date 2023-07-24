import { Post } from './post'

export type Tag = {
	id: string
	createdAt: Date
	updatedAt: Date

	name: string
	color: string
	description: string | null
	photoURL: string | null
	posts: Post[]

	_count?: { posts: number }
}
