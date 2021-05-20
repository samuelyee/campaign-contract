# Lottery project
For me to follow the lottery project in the Udemy's "Ethereum and Solidity: The Complete Developer's Guide". However, the course is using an old Solidity version of 0.4.17 and current is now 0.8.x. I have mapped it over to the newer Solidity 0.8.x.

## Unit Test
Take note of the `test\Lottery.test.js`, which is important to test the smart contract before deploying. Test run it using `npm run test`

## Deployment
The contract is to be deployed to the Rinkeby network via Infura API. Some pre-requsite requirements:
1. Sign up for an account in `http://infura.io/` and create an Ethereum project.
1. Fill in the Rinkeby endpoint and your wallet mnemonic in `deploy.js`.
1. Deployment will require some gas in the wallet. Proceed to request for some test Ether.
1. Run `node deploy.js` to deploy.

## Frontend App
The frontend app is developed at another repo named "samuelyee/lottery-react"