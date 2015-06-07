'use strict';

var React = require('react');

var Phrases = React.createClass({
    getInitialState: function () {
        return {
            phrases: []
        }
    },
    handleChange: function (e) {
        this.setState({
            phrases: e.target.value.split('\n')
        });
    },
    render: function () {
        return (<textarea rows='6' className='form-control' id='phrases' onChange={this.handleChange} />);
    }
});

module.exports = Phrases;