'use strict';
var EventEmitter = require('eventemitter2');
var vent = new EventEmitter();
require('fetch');

vent.on('submit::phrases', function (data) {
    return Promise.all(data.map(function (item) {
        return fetch('/api/phrases?&select=id, words, content', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: item
            })
        })
            .then(status)
            .then(json);
    }))
        .then(function (result) {
            console.log(result);
        });
});

vent.on('get::phrases', function () {
    fetch('/api/phrases?&select=submited,id,content',
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(status)
        .then(json)
        .then(function (data) {
            vent.emit('load::phrases', data);
        });
});

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

/**
 * parse json from response into object, async
 *
 * @param response
 * @returns {object}
 */
function json(response) {
    return response.json();
}

module.exports = vent;