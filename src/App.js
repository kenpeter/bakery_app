import React, { Component } from 'react';
import './App.css';
import {Util} from './Util';

class App extends Component {

    constructor(props) {
        super(props);

        this.util = new Util();

        this.state = {
            vs5_num: '',
            mb11_num: '',
            cf_num: '',
        }
    }

    handleVs5(e) {
        let value = e.target.value;

        this.setState({
            vs5_num: value
        });
    }

    handleMb11(e) {
        let value = e.target.value;

        this.setState({
            mb11_num: value
        });
    }

    handleCf(e) {
        let value = e.target.value;

        this.setState({
            cf_num: value
        });
    }


    handleSubmit(e) {
        e.preventDefault();

        let {vs5_num, mb11_num, cf_num} = this.state;

        this.util.testme();
    }

    render() {
        return (
            <div className="myapp">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className='row'>
                        <div className='col xs-6'>
                            VS5:
                        </div>
                        <div className='col xs-6'>
                            <input
                                key='vs5_num'
                                value={this.state.vs5_num}
                                onChange={this.handleVs5.bind(this)}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col xs-6'>
                            MB11:
                        </div>
                        <div className='col xs-6'>
                            <input
                                key='mb11_num'
                                value={this.state.mb11_num}
                                onChange={this.handleMb11.bind(this)}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col xs-6'>
                            CF:
                        </div>
                        <div className='col xs-6'>
                            <input
                                key='cf_num'
                                value={this.state.cf_num}
                                onChange={this.handleCf.bind(this)}
                            />
                        </div>
                    </div>

                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default App;
