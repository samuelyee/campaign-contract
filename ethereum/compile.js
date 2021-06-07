const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const contractNames = ['Campaign', 'CampaignFactory'];
// delete existing build path if already exists
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// compile contract files in folder
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf-8');

const input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol': {
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
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;
// console.log(output);

fs.ensureDirSync(buildPath);

contractNames.forEach((contract) => {
  console.log(contract)
  compiledContract = output['Campaign.sol'][contract]
  fs.outputJsonSync(
    path.resolve(buildPath, contract + '.json'),
    compiledContract
  )
});

