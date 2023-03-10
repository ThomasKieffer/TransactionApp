// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Transaction is ReentrancyGuard {

    event Transfered(address indexed from, address indexed to, uint256 amount);

    function transfer(address payable _to) public payable nonReentrant {
        (bool success, ) = _to.call{value: msg.value}("");
        require(success, "Transfer failed.");

        emit Transfered(msg.sender, _to, msg.value);
    }
}