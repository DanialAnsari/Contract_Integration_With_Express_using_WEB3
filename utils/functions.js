var Web3 = require('web3')
constants = require('../utils/constants')
var axios = require('axios')
const BigNumber = require('bignumber.js');

const OPTIONS = {
    // defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
};

const web3 = new Web3("https://rinkeby.infura.io/v3/98ae0677533f424ca639d5abb8ead4e7", null, OPTIONS)


const contract = new web3.eth.Contract(constants.abi,constants.contract_address)

exports.transfer = async (to,amount) => {

    web3.eth.getTransactionCount(constants.from, "pending").then(async res => {
        let count = res

        let gasPrices =  await exports.getCurrentGasPrices();
        let tokens = new BigNumber(amount * (10**18));

        var rawTransaction = {
            from: constants.from,
            to: constants.contract_address,
            data: contract.methods.transfer(to,tokens).encodeABI(), //contract.methods.methodName(parameters).encodeABI
            gasPrice: gasPrices.medium * 1000000000,
            nonce: web3.utils.toHex(count),
            gasLimit: web3.utils.toHex(300000)
        }

        web3.eth.accounts.signTransaction(rawTransaction, constants.private_key ).then(async signed => {
            web3.eth.sendSignedTransaction(signed.rawTransaction)
                .on('confirmation', (confirmationNumber, receipt) => {
                    if (confirmationNumber === 1) {
                        console.log(receipt)
                    }
                })
                .on('error', (error) => {
                    console.log(error)
                })
                .on('transactionHash', async (hash) => {
                    console.log(hash);
                });
        }).catch(e => {
            console.log(e)
        });

    }).catch(error => {
        console.log(error)
    })
};


exports.approve = async (to,amount) => {

    web3.eth.getTransactionCount(constants.from, "pending").then(async res => {
        let count = res

        let gasPrices = await exports.getCurrentGasPrices();
        let tokens = new BigNumber(amount * (10**18));
        var rawTransaction = {
            from: constants.from,
            to: constants.contract_address,
            data: contract.methods.approve(to, tokens).encodeABI(), //contract.methods.methodName(parameters).encodeABI
            gasPrice: gasPrices.medium * 1000000000,
            nonce: web3.utils.toHex(count),
            gasLimit: web3.utils.toHex(300000)
        }

        web3.eth.accounts.signTransaction(rawTransaction, constants.private_key ).then(async signed => {
            web3.eth.sendSignedTransaction(signed.rawTransaction)
                .on('confirmation', (confirmationNumber, receipt) => {
                    if (confirmationNumber === 1) {
                        console.log(receipt)
                    }
                })
                .on('error', (error) => {
                    console.log(error)
                })
                .on('transactionHash', async (hash) => {
                    console.log(hash);
                });
        }).catch(e => {
            console.log(e)
        });

    }).catch(error => {
        console.log(error)
    })
};

exports.transferFrom = async (sender,to,amount) => {

    web3.eth.getTransactionCount(constants.from, "pending").then(async res => {
        let count = res

        let gasPrices = await exports.getCurrentGasPrices();
        let tokens = new BigNumber(amount * (10**18));
        var rawTransaction = {
            from: constants.from,
            to: constants.contract_address,
            data: contract.methods.approve(sender,to, tokens).encodeABI(), //contract.methods.methodName(parameters).encodeABI
            gasPrice: gasPrices.medium * 1000000000,
            nonce: web3.utils.toHex(count),
            gasLimit: web3.utils.toHex(300000)
        }

        web3.eth.accounts.signTransaction(rawTransaction, constants.private_key ).then(async signed => {
            web3.eth.sendSignedTransaction(signed.rawTransaction)
                .on('confirmation', (confirmationNumber, receipt) => {
                    if (confirmationNumber === 1) {
                        console.log(receipt)
                    }
                })
                .on('error', (error) => {
                    console.log(error)
                })
                .on('transactionHash', async (hash) => {
                    console.log(hash);
                });
        }).catch(e => {
            console.log(e)
        });

    }).catch(error => {
        console.log(error)
    })
};

exports.balanceOf = async (account)=>{
    try{
        let getData = await contract.methods.balanceOf(account).call();
        console.log(getData)
        return getData
    }catch (e) {
        console.log(e)
    }
};

exports.allowance = async (owner,spender)=>{
    try{
        let getData = await contract.methods.allowance(owner,spender).call();
        return getData
    }catch (e) {
        console.log(e)
    }
};

exports.getCurrentGasPrices = async () => {
    try {
        let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
        let prices = {
            low: response.data.safeLow / 10,
            medium: response.data.average / 10,
            high: response.data.fast / 10
        };

        return prices;
    } catch (e) {
        console.log(e)
    }

};

exports.getNonceByEthAddress = async (eth_address) => {
    try {
        let nonce = await web3.eth.getTransactionCount(eth_address, "pending");
        console.log(nonce);
        return nonce;

    } catch (e) {

    }
}

