'use strict';

const btnAdd = document.getElementById('registerUser'),
    btnLogin = document.getElementById('login'),
    namePeople = document.getElementById('username'),
    userList = document.getElementById('list');


const people = JSON.parse(localStorage.getItem('data')) || [];


const render = () => {

    userList.textContent = '';

    people.forEach(function (item, index) {

        const li = document.createElement('li');
        // li.classList.add('todo-item');
        // li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
        <span class="text-todo">${item.firstName} ${item.lastName}, зарегестрирован  ${item.regDate}  </span>` +
            `<button id="todo-remove">Удалить</button>`);

        userList.append(li);

        //Удаление пользователя
        const btntodoRemove = li.querySelector('#todo-remove');
        btntodoRemove.addEventListener('click', function () {
            people.splice(index, 1);
            render();
        })
    })
    localStorage.data = JSON.stringify(people);
};




btnAdd.addEventListener('click', event => {
    event.preventDefault();
    let user = {};
    let name = prompt('Введите через пробел Имя и Фамилию пользователя');
    name = name.split(' ');
    if (name.length === 2) {
        user.firstName = name[0];
        user.lastName = name[1];
    }
    else {
        return alert("Введите корректно Имя и Фамилию")
    }
    let login = prompt('Введите логин');
    user.login = login;

    let password = prompt('Введите пароль');
    user.password = password;

    user.regDate = getDate();

    people.push(user);
    render();
});


//Авторизация
btnLogin.addEventListener('click', event => {
    event.preventDefault();
    let check=0;
    let log = prompt('Введите логин');
    for (let key in people) {
        if (people[key].login == log) {
            check++;
            let pas = prompt('Введите пароль');
            if (people[key].password == pas) {
                namePeople.textContent = people[key].firstName;
            }
        }
    }
    if (check ==0) {
        alert('Нет пользователя с таким логином!')
    }
});

render();

//Получаем дату регистрации
const getDate = () => {
    let toDay = new Date(),
        hours = toDay.getHours(),
        munite = toDay.getMinutes(),
        second = toDay.getSeconds();


    let Month;
    // Преобразуем месяца
    switch (toDay.getMonth()) {
        case 0: Month = 'января'; break;
        case 1: Month = 'февраля'; break;
        case 2: Month = 'марта'; break;
        case 3: Month = 'апреля'; break;
        case 4: Month = 'мая'; break;
        case 5: Month = 'июня'; break;
        case 6: Month = 'июля'; break;
        case 7: Month = 'августа'; break;
        case 8: Month = 'сентября'; break;
        case 9: Month = 'октября'; break;
        case 10: Month = 'ноября'; break;
        case 11: Month = 'декабря'; break;
    }

    //Добавляем 00 к минутам, секундам и часам
    if (toDay.getHours() < 10) {
        hours = '0' + toDay.getHours();
    }
    if (toDay.getMinutes() < 10) {
        munite = '0' + toDay.getMinutes();
    }
    if (toDay.getSeconds() < 10) {
        second = '0' + toDay.getSeconds();
    }

    let time = toDay.getDay() + ' ' + Month + ' ' + toDay.getFullYear() + ' г., ' + hours + ':' + munite + ':' + second;

    return time;
};