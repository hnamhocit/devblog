import { Comment } from './comment'
import { Tag } from './tag'
import { User } from './user'

export type Post = {
	id: string
	createdAt: Date
	updatedAt: Date

	title: string
	content: string
	slug: string
	tags: Tag[]
	authorId: string
	thumbnailURL: string
	numberOfViews: number

	author: User
	comments: Comment[]

	_count?: {
		comments: number
	}
}
