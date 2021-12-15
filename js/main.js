// Запрос на поулчение списка постов

async function loadPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();

  return data;
}

// Запрос на добавление поста

async function createPost(title, body, userId) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        body: body,
        userId: userId,
      })
  });
  const data = await response.json();

  return data;
}

// Изменение поста по id

async function changePost(id, title, body, userId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        body: body,
        userId: userId
      })
    });
  const data = await response.json();

  return data;
}

// Удаление поста

async function deletePost(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE',
  });
  if (response.status === 404)
    console.log('Не удалось удалить клинта, так как его не существует');
  const data = await response.json();
  return data;
}

// Метод для создание карточки поста

function createListItem(response, container) {
  container.innerHTML = '';

  response.forEach(element => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    const heading = document.createElement('h2');
    const body = document.createElement('p');
  
    link.href = '#';
    item.classList.add('posts-list__item');
    heading.classList.add('post-heading');
    body.classList.add('post-body');
    heading.textContent = element.title;
    body.textContent = element.body;
    link.append(heading);
    link.append(body);
    item.append(link);
    container.append(item);
  });
  
  return container;
}

// Метод для поиска по подстроке в заголовке статьи

function filter(val,list){
  let result=[];
  let regPhrase = new RegExp(val, 'i');
  let flag = false;
  
    list.forEach(i=>{
      flag = regPhrase.test(i.title);
      if (flag) {
        result.push(i)
      }
    });
  return result;
}

// Сетод для сортировки списка статей по алфавиту по заголовку от A - Z

function sortPostAscending(array) {
  return array.sort((a, b) =>  a.title.trim().toLowerCase() < b.title.trim().toLowerCase() ? -1 : 1);
}

// Сортировка от Z - A

function sortPostDescending(array) {
  return array.sort((a, b) =>  a.title.trim().toLowerCase() > b.title.trim().toLowerCase() ? -1 : 1);
}


document.addEventListener('DOMContentLoaded', () => {
  const list = document.querySelector('.posts-list');
  const input = document.querySelector('.search-input');
  const sortBtn = document.querySelector('.sorted-btn');
  
  
  const posts = loadPosts();
  posts.then(data => {
    createListItem(data, list);
    input.addEventListener('input', e => {
      let newArr = filter(e.target.value, data);
      createListItem(newArr, list);
    })
    const handlerAscending = () => {
      sortPostAscending(data);
      createListItem(data, list);
      sortBtn.removeEventListener('click', handlerAscending);
      sortBtn.addEventListener('click', handlerDescending);
    }
    const handlerDescending = () => {
      sortPostDescending(data);
      createListItem(data, list);
      sortBtn.removeEventListener('clikc', handlerDescending);
      sortBtn.addEventListener('click', handlerAscending);
    }
    sortBtn.addEventListener('click', handlerAscending);
  });

})