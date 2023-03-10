import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Transaction } from "../typechain-types";

const ethersToWei = (num: number) => ethers.utils.parseUnits(num.toString(), "ether");

describe("MarkertPlace", function () {

  let transaction: Transaction;
  let owner: SignerWithAddress;
  let account1: SignerWithAddress;
  let account2: SignerWithAddress;
  let accounts: SignerWithAddress[];


  beforeEach(async function () {
    const Transaction = await ethers.getContractFactory("Transaction");
    [owner, account1, account2, ...accounts] = await ethers.getSigners();
    transaction = await Transaction.deploy();
  });

  describe("Transaction transfert", function () {

    describe("test on success", function () {
      it("Should transfer amount, get sender balance", async function () {
        const amount: BigNumber = ethersToWei(1);
        const balanceSenderBeforeTransfer = await ethers.provider.getBalance(account1.address);
        const tx = await transaction.connect(account1).transfer(account2.address, {value: amount});
        const balanceSenderAfterTransfer = await ethers.provider.getBalance(account1.address);

        const receipt = await tx.wait();
        const weiUsedForGas = receipt.cumulativeGasUsed.mul(receipt.effectiveGasPrice);

        expect(balanceSenderAfterTransfer).to.be.equal(balanceSenderBeforeTransfer.sub(amount).sub(weiUsedForGas));
      });

      it("Should transfer amount, get receiver balance", async function () {
        const amount: BigNumber = ethersToWei(1);
        const balanceReceiverBeforeTransfer: BigNumber = await ethers.provider.getBalance(account2.address);
        await transaction.connect(account1).transfer(account2.address, {value: amount});
        const balanceReceiverAfterTransfer: BigNumber = await ethers.provider.getBalance(account2.address);

        expect(balanceReceiverAfterTransfer).to.be.equal(balanceReceiverBeforeTransfer.add(amount));
      });
    });

    describe("test on failure", function () {
      it("Should not transfert if amount > balance, rejected", async function () {
        const amount: BigNumber = ethersToWei(50000);

        await expect(transaction.connect(account1).transfer(account2.address, {value: amount})).to.be.rejected;
      });
    });
  });
});
