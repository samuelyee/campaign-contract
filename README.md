# Kickstarter Campaign project
For me to follow the Kickstarter project in the Udemy's "Ethereum and Solidity: The Complete Developer's Guide". However, the course is using an old Solidity version of 0.4.17 and current is now 0.8.x. I have mapped it over to the newer Solidity 0.8.x.

## Install
```
npm install
```

## Test
```
npm run test
```

## Compile
```
node ethereum/compile.js
```

## Deploy
### Metamask at Rinkeby Test Network
Create a metamask account and get some test ETH on Rinkeby Test Network

### Infura API
Sign up for an account at `https://infura.io/`. Create a project ID and get the test endpoint. Populate the necessary fields in the `deploy.js`, in particular the Metamask mnemonic and the Infura endpoint. Run the following script to deploy:
```
node ethereum/deploy.js
```

The last address of the contract being deployed was recorded at the `ADDRESS` file.