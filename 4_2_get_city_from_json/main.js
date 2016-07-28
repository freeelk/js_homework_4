/*
ДЗ 2
Загрузить города при помощи AJAX из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
(сервер поддерживает AJAX CORS)
    Отсортировать города по алфавиту и вывести на странице.
    Использование промисов обязательно.
    Запрещено использование любых библиотек (включая jQuery) и фреймворков.
*/

const URL = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';


document.getElementById('getcitieslist-btn').addEventListener('click', () => {

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

    let cities = document.getElementById('cities-list')
    while (cities.firstChild) {
        cities.removeChild(cities.firstChild);
    }

    document.getElementById('error-message').innerHTML = '';

    promise.then((response) =>{
        outCities(response, cities);
    }, (error) => {
        document.getElementById('error-message').innerHTML = 'Ошибка получения списка городов: ' + error;
    })

})

function outCities(cities, element) {
    cities = sortByKey(cities, 'name');

    for (key in cities) {
        let li = document.createElement('li');
        li.innerHTML = cities[key].name;
        element.appendChild(li);
    }
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}