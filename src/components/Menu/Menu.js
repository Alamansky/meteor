import './Menu.scss'

import React, { Component } from 'react'

export default class Menu extends Component {
    render() {
        return (
            <div id='menu'>
                <button className='button--primary' onClick={this.props.clearResults}>Reset</button>
                <button className='button--primary' onClick={this.props.submitResults}>Submit</button>
            </div>
        )
    }
}