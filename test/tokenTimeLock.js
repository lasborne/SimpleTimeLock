
const {expect} = require('chai');
const {ethers} = require('hardhat');

// A test for a simple timeLock Smart Contract expected to release funds after some
// time when the release function is called
describe('TokenTimeLock Contract', () => {
    let deployer, token, tokenTimeLock
    //The UNIX time which is 12:00:00pm, April 18th, 2023
    let endTime = 1681819200

    let balOfReceiver, balOfSender
    

    beforeEach(async() => {
        // These are all the Externally-Owned Addresses used for testing the Smart Contract
        [deployer, newUser, receiver, tokenTimeLockDeployer] = await ethers.getSigners()
        //Creating the framework of the actual Token contract e.g. AAVE, UNI token
        const Token = await ethers.getContractFactory('Token', deployer)
        token = await Token.deploy("TokenTimeLock", "TTL")

        //This creates the framework for the timeLock contract from which release is called
        const TokenTimeLock = await ethers.getContractFactory('TokenTimeLock', deployer)
        tokenTimeLock = await TokenTimeLock.deploy(
            token.address, receiver.address, endTime
        )

        //This is the transfer of the created Token from the Token's contract address
        //to the tokenTimeLock's contract address
        await token.transfer(tokenTimeLock.address, ethers.utils.parseEther('1000000'))
    })

    describe('It calls functions', () => {
        //This is a test to ascertain that the tokenTimeLock's contract has the right balance
        it('calls the function checkBal and ascertains the right balance', async() => {
            const bal = await tokenTimeLock.checkBal()
            expect(bal).to.equal(ethers.utils.parseEther('1000000'))
        })
        //This test should fail and be reverted at any time before 12noon, April 18th, 2023
        it('calls the function release and sends funds', async() => {
            
            await tokenTimeLock.release()
            balOfReceiver = await token.balanceOf(receiver.address)
            balOfSender = await token.balanceOf(tokenTimeLock.address)
            expect(balOfReceiver).to.equal(ethers.utils.parseEther('500000'))
            expect(balOfSender).to.eq(ethers.utils.parseEther(`${(1000000/2)}`))
        })
    })
})