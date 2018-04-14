import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import './../css/index.css'
class App extends React.Component {
    constructor(props){
        super(props)

        /*
        if(typeof web3 !== 'undefined'){
            console.log("Using web3 detected from external source like Metamask")
            this.web3 = new Web3(web3.currentProvider)
        }else{
            this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
        }

        //TODO: change this!!
        const MyContract = web3.eth.contract([here goes the ABI interface])
        this.state.ContractInstance = MyContract.at("0x925d81c01d878899adbb7d38f84ce9d5284fa2e7")
        */
    }




    render(){
        return (
            <div className="main-container">
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);