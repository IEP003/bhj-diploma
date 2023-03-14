/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let result = '';
    let formData = null;
    xhr.withCredentials = true;
    if (options.method === 'GET') {
        if (options.data) {
            result = `?`;
            for (let key in options.data) {
                result += `${key}=${options.data[key]}&`;
            };
        };
    } else {
        formData = new FormData();
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        };
    };
    try {
        xhr.open(`${options.method}`, `${options.url}${result}`);
        xhr.send(formData);
    } catch (err) {
        options.callback(err);
    }
    xhr.onload = function() {
        options.callback(xhr.response);
    }
};
