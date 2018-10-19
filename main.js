
// глобальный объект для хранения данных о текущей (локальная версия)
const cart = {
  userID: undefined, // id пользователя
  cart: [] // сама корзина
}
var comments = {};
const products = [
  {
    id: -1,
    name: 'Не выбрано',
    price: 0
  },
  {
    id: 0,
    name: 'iPhone X',
    price: 75000
  },
  {
    id: 1,
    name: 'iPad',
    price: 35000
  },
  {
    id: 2,
    name: 'Macbook Air',
    price: 60000
  },
  {
    id: 3,
    name: 'Macbook Pro',
    price: 135000
  },
] // создаем массив списка товаров
const list = document.querySelector('.list-group');
const comm = document.querySelector('#review-group');
const select = document.querySelector('#product-list');
const inform = document.querySelector('#inform');
var i = 0;
var queryString = '';
var commItem = [];
var spans;
const $http = new Http('http://89.108.65.123:8080') // создаем инстанс HTTP-клиента

/**
 * Удаление элемента (продукта или комментария)
 * @param  {String}  url
 * @param  {String}  queryString
 * @param  {Array}  arr          Где удалять
 */
const removeElement = async (url, queryString, arr) => { // асинхронный метод удаления продукта из корзины
  const Data = await $http.delete(url, queryString) // вызываем метод DELETE на /shop и ждем результат
  renderAll(arr) // перерендер списка
}
const likeReview = async (url, queryString, iterator) => {
  const Data = await $http.patch(url, queryString);
  iterator.innerHTML = Data.likes;
}

/**
 * Создание корзины на стороне клиента на основе данных из сервера
 * @var  {ID}     userData.user_id   id пользователя
 * @var  {Array}  userData.cart      корзина пользователя
 */
const createCart = async () => { // асинхронный метод создания корзины
  try { // обработчик ошибок
    const userData = await $http.get('/shop') // отправляем GET запрос на /shop, ждем результат
    cart.userID = userData.user_id // вытаскиваем ID пользователя из результата запроса и сохраняем в глобальной перменной
    cart.cart = userData.cart // тоже самое с самой корзиной
  } catch (e) {
    console.error(e) // в случае ошибки вывести сообщение
  }
}

/**
 * Создание массива комментраиев
 */
const createCommentsArray = async () => {
  try {
    comments = await $http.get('/comments')
  } catch (e) {
    console.error(e)
  }
}

const addProductToCart = (product) => { // метод для добавления продукта в козину, пушит в корзину и вызывает перерендер
  cart.cart.push(product)

  var li = createLi(product.product_id, product.product)
  renderInformation(list, product, li)
}
const addReviewToComments = (comment) => {// метод для добавления отзыва в комментарии, пушит в комментарии и вызывает перерендер
  comments.unshift(comment)

  var li = createLi(cart.userID, comment.text, comment.likes, 0)
  renderInformation(comm, comment, li, 'afterBegin');
}


/**
 * Добавление выбранного продукта и в локальную корзину, и в корзину на сервере
 * @param  {Event}   e
 * @param  {string}  queryString   текст запроса на сервер для получения информации о товаре
 */
const addProduct = async (e) => { // место для добавления продукта на сервере в корзину
  e.preventDefault()
  const idValue = select.value // забираем его значение
  if (idValue == -1) return // выходим из функции если id равен -1
  const product = products.find(product => product.id == idValue) // ищем продукт в массиве по ID
  if (!product) return // выходим из функции если продкут не найден
  const queryString =
    `user_id=${cart.userID}&product=${product.name}&price=${product.price}` // создаем строку для запроса
  const request = await $http.post('/shop', queryString) // выполняем POST запрос на добавление товара и ждем результат
  addProductToCart(request) // вызываем метод для добавления товара в локальное отображение, передав туда результат запроса
}

/**
 * Добавление выбранного продукта и в локальные комментарии, и в комментарии на сервере
 * @param  {Event}   e
 * @param  {string}  queryString   текст запроса на сервер для получения информации о товаре
 */
const addReview = async (e) => {
  e.preventDefault()

  var text = document.querySelectorAll('form')[1].querySelector('textarea').value;
  const queryString =
    `text=${text}` // создаем строку для запроса
  const request = await $http.post('/comments', queryString) // выполняем POST запрос на добавление товара и ждем результат
  addReviewToComments(request) // вызываем метод для добавления товара в локальное отображение, передав туда результат запроса
}


const addListeners = () => { // навешиваем события
  const productForm = document.querySelector('#add-product-form')
  productForm.addEventListener('submit', addProduct)

  const reviewForm = document.querySelector('#review-product-form')
  reviewForm.addEventListener('submit', addReview)

}

const init = async () => { // асинхронный метод для инциализации
  addListeners() // навешиваем события
  await createCart() // инциализируем корзину и ждем выполнения это функции
  await createCommentsArray()
  renderAll() // выполняем ренедр после инициализации
}

document.addEventListener('DOMContentLoaded', init) // запускаем функцию init после загрузки всего DOM дерева
