const WebFont = require('webfontloader')
const baseUrl = 'https://fontwise-backend.glitch.me'
WebFont.async = true

global.WebFontConfig = {
  classes: false,
  events: false,
  // active: () => {
  // console.log('active') //doesnt work
  // },
}

const stylesheet = document.getElementById('customStyles').sheet
const reducer = (arr, f) => {
  if (f.file) {
    stylesheet.insertRule(
      `@font-face {font-family: '${f.family}';src:url('${f.file}');}`
    )
    return arr
  } else return [...arr, f.family]
}

export const renderFonts = (list) => {
  const fetchList = list.reduce(reducer, [])
  if (fetchList.length > 0) {
    WebFont.load({
      google: {
        families: fetchList,
      },
    })
  }
}

export const getFonts = async (filter) => {
  try {
    const response = await fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filter),
    })

    const result = await response.json()
    return result
  } catch (error) {
    return error
  }
}

export const createFont = async (data) => {
  try {
    // console.log('creating font')
    const response = await fetch(`${baseUrl}/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()
    return result
  } catch (error) {
    return error
  }
}
