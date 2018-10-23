/**
 * Рендер ОДНОГО элемента и навешивание на него обработчика событий
 */
const renderInformation = (where, item, html, i) => { // функция для рендера списка и ID пользователя
  where.appendChild(html);
  i = 0;

  if (where == comm) {
    commItem.push(html) // собираем все созданные элементы в массив
    // на каждом li создаем событие click
    commItem[commItem.length - 1].querySelector('img').addEventListener('click', (e) => {
      var commentID = e.currentTarget.parentElement.getAttribute('data-id')
      queryString = `comment_id=${commentID}`;
      comments.find((item, j) => {i = j; return item.comment_id == commentID})
      comments.splice(i, 1);
      removeElement('/comments', queryString, comments);
    })

    var spans = document.querySelectorAll('.media-body span');
    spans[commItem.length - 1].addEventListener('click', (e) => {
      var iterator = e.currentTarget;
      var commentID = iterator.parentElement.parentElement.getAttribute('data-id')
      queryString = `comment_id=${commentID}`
      likeReview('/comments', queryString, iterator)
    })
  }

  if (where == list) {
    inform.innerHTML = `ПОЛЬЗОВАТЕЛЬ: ${cart.userID} - ${cart.cart.length}` // перезаписываем информацию на ID пользователя и колличество элементов в корзине
    const listItem = [...list.querySelectorAll('li')] // собираем все созданные элементы в массив
    // на каждом li создаем событие click
    listItem[listItem.length - 1].addEventListener('click', (e) => {
      var productID = e.target.getAttribute('data-id')
      queryString = `user_id=${cart.userID}&product_id=${productID}`;
      cart.cart.find((item, j) => {i = j; return item.product_id == productID})
      cart.cart.splice(i, 1);
      removeElement('/shop', queryString, cart.cart) // по клику вызываем метод remove и передаем в него userID и id продукта взятый из аттрибута
    })
  }
}

/**
 * Перерендер ВСЕХ элементов в указанном массиве
 * @param  {Array} render массив элементов, которых нужно перерендерить
 */
const renderAll = (render) => {
  i = 0;

  if (!render || (!!render && render == products)) {
    select.innerHTML = ''
    products.forEach((product) => { // проходим по каждому элементу products
      select.innerHTML += `<div
        value="${product.id}"><div class="img"></div>${product.name}</div>` // для каждого элемента создаем div в нашем select
    })
    setDND()
  }

  if (!render || (!!render && render == cart.cart)) {
    inform.innerHTML = `ПОЛЬЗОВАТЕЛЬ: ${cart.userID} - ${cart.cart.length}` // перезаписываем информацию на ID пользователя и колличество элементов в корзине
    list.innerHTML = ''
    cart.cart.forEach((item) => { // проходим по всем элементам корзины
      var li = createLi(item.product_id, item.product);
      renderInformation(list, item, li)
    })
  }

  if (!render || (!!render && render == comments)) {
    comm.innerHTML = ''
    comments.forEach((item) => {
      var li = createLi(item.comment_id, item.text, item.likes, i);
      renderInformation(comm, item, li)
      i++;
    })
  }
}

/**
 * Создание Node элемента
 * @param  {ID} item_id
 * @param  {String} text
 * @param  {Number} likes
 * @param  {} j       вспомогательный параметр
 * @return {Node} li        Готовый Node узел
 */
function createLi(item_id, text, likes, j) {
  var li = document.createElement('li')
  // if (j > 3) li.className = 'media mt-2 none';
  //   else if (j <= 3) li.className = 'media mt-2';
  if (j != undefined) li.className = 'media mt-2';
    else {
      li.className = 'list-group-item';
      li.innerText = `${text}`;
    }
  li.setAttribute('data-id', item_id);

  if (j == undefined) return li;
  var img = document.createElement('img');
  img.className = 'align-self-start mr-3';
    li.appendChild(img);
  var media_body = document.createElement('div')
  media_body.className = 'media-body';
    li.appendChild(media_body);
  var h5 = document.createElement('h5')
  h5.innerText = item_id;
    media_body.appendChild(h5);
  var p = document.createElement('p')
  p.innerText = text;
    media_body.appendChild(p);
  var span = document.createElement('span')
  span.innerText = likes;
    media_body.appendChild(span);
  return li;
}
