import { Component } from 'react';

const DEFAULT_TITLE = "PokeDex";

export default class PageTitle extends Component {
    componentDidUpdate() {
        document.title = (this.props.title ? this.props.title + " | " : "") + DEFAULT_TITLE;
    }

    render() {
        return this.props.children;
    }
};