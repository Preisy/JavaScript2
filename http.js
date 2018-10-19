class Http { // объявлем класса для работы с HTTP
  constructor(baseURL) { // конструктор принемает базовый URL и записывает его в поле класса
    this.baseURL = baseURL
  }
  request(url = '/', method = 'GET') { // метод для запроса, по умолчания на / и тип запроса GET
    return fetch(`${this.baseURL}${url}`, { //сам запрос
      method // в опции отдаем метод запроса
    }).then((res) => {
      return res.json() // после получени парсим JSON, полученый promise возвращаем
    }).catch((err) => {
      console.error(err)
    })
  }
  get(url = '/') { // обертка для request, которая выполняет GET запрос на указанный URL
    return this.request(url, 'GET')
  }
  post(url = '/', queryString) { // обертка для request, которая выполняет POST запрос на указанный URL
    return this.request(`${url}?${queryString}`, 'POST')
  }
  delete(url = '/', queryString) { // обертка для request, которая выполняет DELETE запрос на указанный URL
    return this.request(`${url}?${queryString}`, 'DELETE')
  }
  patch(url = '/', queryString) { // обертка для request, которая выполняет POST запрос на указанный URL
    return this.request(`${url}?${queryString}`, 'PATCH')
  }
}
