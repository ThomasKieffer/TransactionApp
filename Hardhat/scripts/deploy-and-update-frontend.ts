const { ethers } = require("hardhat");
const {readFileSync, writeFileSync} = require("fs");

const FRONT_END_ADDRESSES_FILE = "../App/constants/contractAdresses.json"
const FRONT_END_ABI_FILE = "../App/constants/abi.json"

async function main() {
  const Transaction = await ethers.getContractFactory("Transaction");
  const transaction = await Transaction.deploy();

  await transaction.deployed();
  
  console.log(`transaction contract deployed to ${transaction.address}`);

  console.log("Updating frontend");
  const chainId = ethers.provider.network.chainId
  const contractAbi = transaction.interface.format(ethers.utils.FormatTypes.json);

  updateContractAddresses(transaction.address, chainId);
  updateAbi(contractAbi);
}

async function updateContractAddresses(contractAddress: string, chainId: string) {
  const currentAddresses = JSON.parse(readFileSync(FRONT_END_ADDRESSES_FILE, "utf8"));
  if(chainId in currentAddresses){
    if(!currentAddresses[chainId].includes(contractAddress)){
      currentAddresses[chainId] = contractAddress;
      // currentAddresses[chainId].push(contractAddress);
    }
  } else {
    currentAddresses[chainId] = [contractAddress];
  }
  writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddresses));
}

async function updateAbi(contractAbi: string) {
  writeFileSync(FRONT_END_ABI_FILE, contractAbi);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});