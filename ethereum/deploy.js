const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');
const util = require('util');
// const { interface, bytecode } = require('../compile');

const mnemonic = '';
const endpoint = 'https://rinkeby.infura.io/v3/PROJECT-ID';

const provider = new HDWalletProvider(mnemonic, endpoint); 

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);
    console.log(util.inspect(abi, false, null, true /* enable colors */))
    const result = await new web3.eth.Contract(abi) 
        .deploy({ 
            data: evm.bytecode.object, 
        }) 
        .send({ from: accounts[0], gas: 1000000 }); // instruct web3 to send out a transaction    
    console.log('Contract deployed to', result.options.address);
};
deploy();