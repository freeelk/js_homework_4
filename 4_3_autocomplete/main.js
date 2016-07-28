/*
ДЗ 3

Создать страничку с текстовым полем.
    После загрузки странички, загрузить список городов при помощи AJAX.
    При вводе текста в тестовое поле, выводить под текстовым полем список тех городов, в названиях которых есть введенный текст.
    Использование промисов обязательно.
    Запрещено использование любых библиотек (включая jQuery) и фреймворков.
*/

const URL = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

let cities;

window.addEventListener('load', () => {

    let promise = new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', URL);
        xhr.responseType = 'json';

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.statusText);
                }
            }
        };

        xhr.send();
    });

    document.getElementById('error-message').innerHTML = '';

    promise.then((response) =>{
        cities = sortByKey(response, 'name');
    }, (error) => {
        document.getElementById('error-message').innerHTML = 'Ошибка получения списка городов: ' + error;
    })

    function sortByKey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

})


document.getElementById('cities-input').addEventListener('input', (e) => {

    let citiesList = document.getElementById('cities-list');

    while (citiesList.firstChild) {
        citiesList.removeChild(citiesList.firstChild);
    }

    if (e.target.value === '') {
        return;
    }

    for (key in cities) {
        if (cities[key].name.indexOf(e.target.value) > -1) {
            let li = document.createElement('li');
            li.innerHTML = cities[key].name;
            citiesList.appendChild(li);
        }
    }

});

