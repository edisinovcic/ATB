import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import './../css/index.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: 0
        };


        if (typeof web3 !== 'undefined') {
            console.log("Using web3 detected from external source like Metamask")
            this.web3 = new Web3(web3.currentProvider)
        } else {
            this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
        }

        const MyContract = web3.eth.contract([
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "registration",
                        "type": "string"
                    },
                    {
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "addFundsToAccount",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "providerWallet",
                        "type": "address"
                    },
                    {
                        "name": "providerType",
                        "type": "bool"
                    }
                ],
                "name": "createProvider",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "registration",
                        "type": "string"
                    }
                ],
                "name": "createUser",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "registration",
                        "type": "string"
                    }
                ],
                "name": "disableUser",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "registration",
                        "type": "string"
                    }
                ],
                "name": "getUserByRegistration",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "providerId",
                        "type": "uint256"
                    },
                    {
                        "name": "registration",
                        "type": "string"
                    }
                ],
                "name": "logEntry",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "registration",
                        "type": "string"
                    },
                    {
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "name": "providerId",
                        "type": "uint256"
                    }
                ],
                "name": "logExitAndChargeUser",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            }
        ]);

        this.state.ContractInstance = MyContract.at("0x345ca3e014aaf5dca488057592ee47305d9b3e10")

        this.state.ContractInstance.registerUser("ST1234ZG", {
            gas: 300000,
            from: "0x14723a09acff6d2a60dcdf7aa4aff308fddc160c",
            value: web3.toWei(3, 'ether')
        }, (err, result) => {
            this.state.result = result;
        })


    }


    render() {
        return (
            <div className="main-container">
                this.state.result;
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
);


/*
//register new user
//USER2 (owner of "ST1234ZG")
yourContractInstance.registerUser("ST1234ZG", {
   gas: 300000,
   from: USER2,
   value: web3.toWei(0, 'ether')
}, (err, result) => {
   // Result is the transaction address of that function
})

//add 200 wei to balance of that user
//USER2 (owner of "ST1234ZG")
yourContractInstance.addFundsToMyAccount("ST1234ZG", {
   gas: 300000,
   from: USER2,
   value: web3.toWei(200, 'wei')
}, (err, result) => {
   // Result is the transaction address of that function
})

//create provider 1 (entry provider)
//USER1 (owner)
yourContractInstance.createProvider(1, USER3, true, {
   gas: 300000,
   from: USER1,
   value: web3.toWei(0, 'wei')
}, (err, result) => {
   // Result is the transaction address of that function
})

//create provider 2 (exit provider)
//USER1 (owner)
yourContractInstance.createProvider(2, USER4, false, {
   gas: 300000,
   from: USER1,
   value: web3.toWei(0, 'wei')
}, (err, result) => {
   // Result is the transaction address of that function
})

//log entry
//USER3 (entry provider)
yourContractInstance.logEntry(1, "ST1234ZG", {
   gas: 300000,
   from: USER3,
   value: web3.toWei(0, 'wei')
}, (err, result) => {
   // Result is the transaction address of that function
})

//log exit and charge user
//USER4 (exit provider)
yourContractInstance.logExitAndChargeUser(2, "ST1234ZG", 50, {
   gas: 300000,
   from: USER4,
   value: web3.toWei(0, 'wei')
}, (err, result) => {
   // Result is the transaction address of that function
})

//check if user2 ("ST1234ZG") exists
//USER1 (owner)
yourContractInstance.getBalanceByRegistration("ST1234ZG", {
   gas: 300000,
   from: USER1,
   value: web3.toWei(0, 'wei')
}, (err, result) => {
   // Result is the transaction address of that function
})

//check balance of user2 ("ST1234ZG") - should return 150 wei
//USER1 (owner)
yourContractInstance.getBalanceByRegistration("ST1234ZG", {
   gas: 300000,
   from: USER1,
   value: web3.toWei(0, 'wei')
}, (err, result) => {
   // Result is the transaction address of that function
})

//disable user2 ("ST1234ZG")
//USER1 (owner)
yourContractInstance.disableUser("ST1234ZG", {
   gas: 300000,
   from: USER1,
   value: web3.toWei(0, 'wei')
}, (err, result) => {
 */