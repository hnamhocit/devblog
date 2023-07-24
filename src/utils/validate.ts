export const validate = {
	required: {
		value: true,
		message: 'This field is required!',
	},
	email: {
		value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
		message: 'Invalid email address!',
	},
	password: {
		value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g,
		message:
			'Minimum eight characters, at least one uppercase, one lowercase, one number and one special character!',
	},
	min: (value: number) => ({
		value,
		message: `Minimum ${value} characters!`,
	}),
	max: (value: number) => ({
		value,
		message: `Maximum ${value} characters!`,
	}),
	url: {
		value: /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/,
		message: 'Invalid URL!',
	},
	hexColor: {
		value: /^#([0-9a-fA-F]{3}){1,2}$/,
		message: 'Invalid hex color',
	},
	lowercase: {
		value: /^[a-z]+$/,
		message:
			'Value must be lowercase, not uppercase, accents or special characters!',
	},
}
