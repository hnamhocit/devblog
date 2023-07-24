import { Comment } from './comment'
import { User } from './user'

export enum LikeType {
	LIKE = 'LIKE',
	DISLIKE = 'DISLIKE',
}

export type Like = {
	id: string
	createdAt: Date
	updatedAt: Date

	likeType: LikeType
	commentId: string
	userId: string

	comment: Comment
	user: User
}
