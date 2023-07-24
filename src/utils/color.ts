const randomHexColor = () => {
	const randomColor = Math.floor(Math.random() * 16777215).toString(16)
	return '#' + randomColor.padStart(6, '0')
}

const hexToRgba = (hex: string, alpha: number) => {
	if (hex.startsWith('#')) {
		hex = hex.slice(1)
	}

	let r = parseInt(hex.slice(0, 2), 16)
	let g = parseInt(hex.slice(2, 4), 16)
	let b = parseInt(hex.slice(4, 6), 16)

	return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export { randomHexColor, hexToRgba }
