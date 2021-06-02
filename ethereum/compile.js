const path = require('path');
const fs = require('fs');
const solc = require('solc');
const util = require('util');

const lotteryPath = path.resolve(__dirname, "contracts", "Lottery.sol");
const source = fs.readFileSync(lotteryPath, "utf8");

const input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol': {
            content: source
        }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
}

// console.log(JSON.parse(solc.compile(JSON.stringify(input)), 1))
const compile = JSON.parse(solc.compile(JSON.stringify(input)), 1).contracts['Lottery.sol']['Lottery'];
// uncomment below lines if need to copy the abi
// const { abi } = compile;
// console.log(util.inspect(abi, false, null, true /* enable colors */))
module.exports = compile;
