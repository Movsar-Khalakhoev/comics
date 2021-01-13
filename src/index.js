import './sass/style.sass'
import getElements from './js/elements'
import {getComicId, normalizeUrl, setComicId} from './js/location'
import getComic from './js/service'

document.addEventListener('DOMContentLoaded', async () => {
	normalizeUrl()
	const {
		prevButton, randomButton, nextButton,
		image, spinner,
		comicTranscription, transcriptionButton, comicDate,
		comicLink, imageLink, comicCopyButton, imageCopyButton
	} = getElements()
	let comic
	let comicId = getComicId()
	let lastComic = await getComic('')
	const maxId = lastComic.num

	const changeComic = async id => {
		id == 1
			? prevButton.classList.add('disabled')
			: prevButton.classList.remove('disabled')
		id == maxId
			? nextButton.classList.add('disabled')
			: nextButton.classList.remove('disabled')

		spinner.classList.toggle('active')
		image.classList.toggle('active')
		comicId = id
		if (!id) {
			comic = lastComic
			comicId = comic.num
		} else comic = await getComic(comicId)
		spinner.classList.toggle('active')
		image.classList.toggle('active')
		setComicId(comicId)
		setData({image, comicTranscription, comicDate, comicLink, imageLink}, comic)
	}

	changeComic(comicId)

	transcriptionButton.addEventListener('click', () => comicTranscription.classList.toggle('active'))
	prevButton.addEventListener('click', () => changeComic(comicId - 1))
	nextButton.addEventListener('click', () => changeComic( comicId + 1))
	randomButton.addEventListener('click', () => changeComic(Math.floor(Math.random() * maxId)))
	comicCopyButton.addEventListener('click', () => copyText(comicLink, comicCopyButton))
	imageCopyButton.addEventListener('click', () => copyText(imageLink, imageCopyButton))
})

const setData = (elems, comic) => {
	elems.image.src = comic.img
	elems.image.alt = comic.alt

	elems.comicTranscription.innerHTML = comic.transcript.trim() || 'Описания нет :('
	elems.comicDate.innerHTML = comic.date || 'не известно'

	elems.comicLink.innerHTML = comic.link || 'не известно'
	elems.imageLink.innerHTML = comic.img
}

const copyText = ($link, $button) => {
	const link = $link.textContent
	navigator.clipboard.writeText(link)
	$button.style.backgroundColor = '#43aa8b'
	$button.textContent = 'Скопировано'

	setTimeout(() => {
		$button.style.backgroundColor = ''
		$button.textContent = 'Скопировать'
	}, 2000)
}

