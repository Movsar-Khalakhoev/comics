const getNode = selector => document.querySelector(selector)


const getElements = () => ({
	prevButton: getNode('.pagination__prev'),
	randomButton: getNode('.pagination__random'),
	nextButton: getNode('.pagination__next'),
	image: getNode('.comic__image-img'),
	spinner: getNode('.comic__image-spinner'),
	comicTranscription: getNode('.info__transcription'),
	transcriptionButton: getNode('.info__button'),
	comicDate: getNode('.info__date-locale'),
	comicLink: getNode('.links__comic-link'),
	imageLink: getNode('.links__image-link'),
	comicCopyButton: getNode('.links__comic-copy'),
	imageCopyButton: getNode('.links__image-copy')
})

export default getElements