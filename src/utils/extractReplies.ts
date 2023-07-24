import { Comment } from '@/types'

export function extractReplies(comments: Comment[], parentId: null | string) {
	const result = []

	for (const comment of comments) {
		if (comment.parentId === parentId) {
			const replies = extractReplies(comments, comment.id)
			comment.replies = replies
			result.push(comment)
		}
	}

	return result
}
