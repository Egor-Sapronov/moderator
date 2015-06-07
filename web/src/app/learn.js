require('../../../bower_components/bootstrap/dist/css/bootstrap.css');
require('../../../bower_components/bootstrap/dist/js/bootstrap.js');
require('./css/learning.css');
require('fetch');
var phrasesList = require('./components/word.react.jsx');

var vent = require('./libs/vent');

vent.emit('get::phrases', null);

vent.on('load::phrases', function (data) {
    phrasesList.display({items: data}, document.getElementById('words_container'));
});

vent.on('update::word', function (data) {
    return fetch('/api/words/' + data.id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(status)
        .then(json)
        .then(function () {

        });
});

vent.on('update::phrase', function (data) {
    return fetch('/api/phrases/' + data.id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(status)
        .then(json)
        .then(function () {

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