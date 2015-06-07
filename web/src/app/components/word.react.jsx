'use strict';

var React = require('react');
var vent = require('../libs/vent');

var Word = React.createClass({
    getInitialState: function () {
        return {
            word: this.props.word,
            class: this.props.class || false
        }
    },
    handleClick: function () {
        var _this = this;
        this.setState({
            class: !this.state.class
        }, function () {
            vent.emit('update::word', {id: _this.props.wordId, class: _this.state.class});
        });
    },
    render: function () {
        var wordClass = 'btn btn-default';

        if (this.state.class) {
            wordClass = 'btn btn-success';
        }

        return <button onClick={this.handleClick} className={wordClass} >{this.state.word}</button>
    }
});

var Phrase = React.createClass({
    handleClick: function () {
        vent.emit('update::phrase', {id: this.props.phraseId, submited: true});
    },
    render: function () {
        return <div>
            <p>{this.props.content}</p>
            <div>
            {this.props.words.map(function (item, index) {
                return <Word word={item.name} wordId={item.id} class={item.class} key={index}/>
            })}
            </div>
            <br/>
            <button onClick={this.handleClick} className='btn btn-primary'>Submit</button>
        </div>;
    }
});

var Words = React.createClass({
    render: function () {
        return <ul className="list-group">
        {this.props.items.map(function (item, index) {
            return <li key={index} className="list-group-item">
                <Phrase phraseId={item.id} words={item.Words} content={item.content}/>
            </li>
        })}
        </ul>
    }
});

module.exports = {
    component: Words,
    display: function (options, container) {
        return React.render(<Words items={options.items} />, container);
    }
};
