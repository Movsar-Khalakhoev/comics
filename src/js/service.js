const getComic = async id => {
	const comic = await fetch(`https://cors-everywhere.herokuapp.com/https://xkcd.com/${id}/info.0.json`, {
      headers: {
        'X-Requested-With': 'wol',
      }
    })
      .then(resp => resp.json())
      .then(res => res)
      .catch(res => console.log(res))

  comic.link = `https://xkcd.com/${comic.num}/`
  comic.date = `${`0${comic.day}`.slice(-2)}-${`0${comic.month}`.slice(-2)}-${comic.year}`

  return comic
}

export default getComic