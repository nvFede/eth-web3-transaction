// Configuration

// 1 . Set up
var Web3 = require('web3')
var EthereumTransaction = require('ethereumjs-tx')
var url = 'HTTP://127.0.0.1:7545' // 8545 if using ganache-cli
var web3 = new Web3(url)

// 2. Sending and receiving addresses for the transactino
var sendingAddress = "0x73f7a7F7298a4C3eF833b333FEC1372171cff8F1"
var receivingAddress = "0x381785E68CdB28F3184E365CA0e3B014880DE97D"

// 3. Check balances of each address
web3.eth.getBalance(sendingAddress).then(console.log)
web3.eth.getBalance(receivingAddress).then(console.log)

function hexa(value) {
    return web3.utils.toHex(value)
}

//4. Set up the transaction 
var rawTransaction = {
    nonce: hexa(4),
    to: receivingAddress,
    gasPrice: hexa(20000000),
    gasLimit: hexa(30000),
    value: hexa(1000000000000000000),
    data: hexa("")
}

// 5. Sign the transaction with HEX value of the private key of the sender 
var privateKeySender = 'd1e109e5252a6713361f09fbd447daea8f636c194523ec1616e5274bef221eab'
var privateKeySenderHex = new Buffer(privateKeySender, 'hex')
var transaction = new EthereumTransaction.Transaction(rawTransaction)
transaction.sign(privateKeySenderHex)

// 6. Send the serialized signed transaction to the ETH network

var serializedTransaction = transaction.serialize()
web3.eth.sendSignedTransaction(serializedTransaction)