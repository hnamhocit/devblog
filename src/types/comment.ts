import { Like } from './like'
import { Post } from './post'
import { User } from './user'

export type Comment = {
	id: string
	createdAt: Date
	updatedAt: Date

	content: string
	authorId: string
	postId: string
	parentId: string | null

	parent: Comment | null
	post: Post
	author: User
	replies: Comment[]
	likes: Like[]
}
