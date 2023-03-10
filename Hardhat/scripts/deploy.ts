import { ethers } from "hardhat";

async function main() {
  const Transaction = await ethers.getContractFactory("Transaction");
  const transaction = await Transaction.deploy();

  await transaction.deployed();
  
  console.log(`transaction contract deployed to ${transaction.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
