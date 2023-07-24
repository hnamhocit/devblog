import { Like } from './like'
import { Post } from './post'

export type User = {
	id: string
	createdAt: Date
	updatedAt: Date

	email: string
	name: string
	password: string
	refreshToken: string | null
	photoURL: string | null
	location: string | null
	bio: string | null
	website: string | null
	github: string | null
	skillsAndLanguages: string | null
	learning: string | null
	hackingOn: string | null
	role: 'ADMIN' | 'USER'

	posts: Post[]
	comments: Comment[]
	likes: Like[]
}
