import React, { Component } from 'react';
import './App.css';
import {Util} from './Util';

class App extends Component {

    constructor(props) {
        super(props);

        let def = this.getDef();
        this.util = new Util(def);

        this.state = {
            vs5_num: 10,
            mb11_num: 14,
            cf_num: 13,
            cartData: [],
        }

        /* // uncomment to see rounding
        this.state = {
            vs5_num: 7, // this will do the rounding
            mb11_num: 14,
            cf_num: 13,
        }
        */
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


    getDef() {
        let def = {
            VS5: [
                {
                    num: 3,
                    price: 6.99,
                },
                {
                    num: 5,
                    price: 8.99,
                },
            ],

            MB11: [
                {
                    num: 2,
                    price: 9.95,
                },
                {
                    num: 5,
                    price: 16.95,
                },
                {
                    num: 8,
                    price: 24.95,
                },
            ],

            CF: [
                {
                    num: 3,
                    price: 5.95,
                },
                {
                    num: 5,
                    price: 9.95,
                },
                {
                    num: 9,
                    price: 16.99,
                },
            ],
        };

        return def;
    }

    // build the input
    getInput(vs5_num, mb11_num, cf_num) {

        let input = [
            {VS5: vs5_num},
            {MB11: mb11_num},
            {CF: cf_num},
        ];

        /*
        // NOTE: debug
        let input = [
            {CF: cf_num},
            {VS5: vs5_num},
            {MB11: mb11_num},
        ];
        */

        return input;
    }

    handleSubmit(e) {
        e.preventDefault();

        let {vs5_num, mb11_num, cf_num} = this.state;
        let input = this.getInput(vs5_num, mb11_num, cf_num);
        let cartData = this.util.calCart(input);
        cartData = cartData.slice(0);

        this.setState({
            cartData: cartData
        })
    }

    displayCartdata() {
        let {cartData} = this.state;
        if(cartData.length === 0) {
            return '';
        } else {
            return cartData.map((t, index) => {
                let mygroup = t.mygroup;
                let groupHtml = '';
                for(let key in mygroup) {
                    let num = mygroup[key];
                    groupHtml += num + ' x ' + key + ' | ';
                }

                return (
                    <div key={index}>
                        <div>
                            {t.orderNum} {t.key} {t.totalPrice}
                        </div>
                        <div>
                            {groupHtml}
                        </div>
                    </div>
                );
            });
        }


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

                    {this.displayCartdata()}

                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default App;
