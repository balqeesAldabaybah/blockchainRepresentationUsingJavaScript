const SHA256 = require('crypto-js/sha256')
class Block{
    constructor(index,timestamp, data, previousHash = ''){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString()
    }
}


class BlochChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0,"01/01/2022","Genesis Block","0")
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i=1; i< this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            //check the hash itself is valid 
            if(currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }
            // the current block does not points to the previous block
            if(currentBlock.previousHash != previousBlock.hash){
              //  return false;
            }
            
        }
        return true;
    }
}


//test it 
let savjeCoin = new BlochChain();
savjeCoin.addBlock(new Block(1, "10/07/2022", {amount:4}))
savjeCoin.addBlock(new Block(2, "11/07/2022", {amount:10}))

console.log('is blockchain is valid '+ savjeCoin.isChainValid())
console.log(JSON.stringify(savjeCoin,null, 4))

//try to tamper one block 
savjeCoin.chain[1].data = {amount : 100}; 
console.log('is blockchain is valid '+ savjeCoin.isChainValid())
//now the chain is not valid 
