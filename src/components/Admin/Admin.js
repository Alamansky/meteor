import './Admin.scss';

import env from '../../../env';

import React, { Component } from 'react'
import ProgressBar from '../ProgressBar/ProgressBar';
import Inner from '../Inner/Inner';
import Accordion from '../Accordion/Accordion';

export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: null
        };
        this.fetchData = this.fetchData.bind(this);
        this.gradeSession = this.gradeSession.bind(this);
    }


    async fetchData() {
        const url = env.dev ? 'http://localhost:3000/read' : 'https://meteor-backend.herokuapp.com/read'
        const res = await fetch(url);
        const res2 = await res.json();
        this.setState({ x: res2 });
    }

    gradeSession(reads) {
        let status = `Incomplete (${reads.length}/100)`;
        if (reads.length >= 100) {
            status = reads.map(read => read.correct).includes(false) ? 'Failed' : 'Passed';
        }
        return status;
    }

    componentDidMount() {
        this.fetchData();
    }
    render() {
        const obj = {};
        this.state.x && this.state.x.forEach(session => {
            let sessionDate = session.created_at.substring(5, 10);
            if (!obj[sessionDate]) {
                obj[sessionDate] = [session];
            } else {
                obj[sessionDate].push(session);
            }
        })
        let markup = Object.entries(obj).map((sessionsOnDate) => {
            let [key, val] = sessionsOnDate;
            return (<Accordion title={`Date: ${key}`} className='date'>
                {val.map(session => {
                    return (
                        <div className='session-report' key={session.sessionID}>
                            <span className='session-report__details'>
                                {/* <p><span className="bold">Date: </span>{session.created_at.substring(5, 10)}</p> */}
                                <p><span className="bold">FSR: </span>{session.fsr}</p>
                                <p style={{ whiteSpace: 'nowrap' }}><span className="bold">Status: </span>{this.gradeSession(session.reads)}</p>
                            </span>
                            <ProgressBar progress={session.reads}></ProgressBar>
                        </div>)
                }).reverse()}
            </Accordion>)
        });
        return (
            <Inner>
                {markup.reverse()}
            </Inner>
        )
    }
}
