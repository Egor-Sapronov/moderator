'use strict';

var React = require('react');

var Phrases = require('./phrases.react.jsx');
var vent = require('../libs/vent');

var Learning = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        vent.emit('submit::phrases', this.refs.phrases.state.phrases);
    },
    render: function () {
        return (<form onSubmit={this.handleSubmit}>
            <div className = 'row'>
                <div className='col-md-6'>
                    <div className='form-group'>
                        <label htmlFor='phrases'>Phrases</label>
                        <Phrases ref='phrases' />
                    </div>
                    <button className='btn btn-primary'>Submit</button>
                </div>
            </div>
        </form>);
    }
});

module.exports = {
    component: Learning,
    display: function (container) {
        return React.render(<Learning />, container);
    }
};