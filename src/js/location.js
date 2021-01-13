export const normalizeUrl = () => {
	const loc = location.hash.split('/')

	if (loc.length > 1) {
		location.replace(loc[0])
	}
}

export const getComicId = () => {
	return location.hash.slice(1)
}

export const setComicId = id => {
	location.replace(`#${id}`)
}