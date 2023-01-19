# SimpleTimeLock
This is a simple Time Lock smart contract scheduled to only allow release of it's native tokens by 12:00:00pm GMT on April, 18th 2023 (or, after).
The Token is first created and then, using the hardhat test, 1 million TTL tokens are transferred into the smart contract's address of the timeLock contract.
Two functions are available, the "checkBal" which checks the balance of the tokenTimeLock's contract address, and the "release" function which automatically transfers half the balance in the contract address to the receiver provided the time/epoch has reached 1681819200 or passed.
Contact for more clarification on github or twitter @mic_lasborne.