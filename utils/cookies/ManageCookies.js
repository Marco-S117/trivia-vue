export const setCookie = (name, value, hours) => {
  let expires = ''
  const date = new Date()
  date.setTime(date.getTime() + (hours * 3600 * 1000))
  expires = '; expires=' + date.toUTCString()
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
  if (localStorage) {
    localStorage.setItem("tokenExpires", date)
  }
}

export const getCookie = (name) => {
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

export const deleteCookie = (name) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  if (localStorage && localStorage.tokenExpires) {
    localStorage.removeItem("tokenExpires")
  }
}


