//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './Token.sol';

contract TokenTimeLock is Token("TokenTimeLock" , "TTL") {
    Token public token;
    address public receiver;
    uint256 releaseTime;

    constructor(Token _token, address _receiver, uint256 _releaseTime) {
        require(_releaseTime > block.timestamp);
        token = _token;
        receiver = _receiver;
        releaseTime = _releaseTime;
    }

    //Checks the balance of Tokens in this Smart Contract
    function checkBal() public view returns (uint256) {
        uint256 bal = token.balanceOf(address(this));
        console.log(bal/(10**18));
        return bal;
    }

    // Releases half the contract address's funds to the receiver on certain conditions
    function release() public payable {
        require(block.timestamp >= releaseTime);
        uint256 _totalAmountToSend = (balanceOf(address(this)) / 2);
        
        if (block.timestamp >= releaseTime) {
            token.transfer(receiver, _totalAmountToSend);
            uint256 balSender = token.balanceOf(address(this));
            uint256 balReceiver = token.balanceOf(receiver);
            console.log(balSender);
            console.log(balReceiver);    
        }

    }
}