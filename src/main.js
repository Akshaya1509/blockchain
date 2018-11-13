const SHA = require('sha256');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data));
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "11/13/2018", "genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for(let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if(currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if(currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      return true;
    }
  }
}

var myCoin = new BlockChain();
myCoin.addBlock(new Block(1, "11/10/2018", { amount: 4} ));
myCoin.addBlock(new Block(2, "11/12/2018", { amount: 5} ));

console.log('is BlockChain valid? ' + myCoin.isChainValid());
myCoin.chain[1].data = { amount: 100};

console.log('is BlockChain valid? ' + myCoin.isChainValid());
// console.log(JSON.stringify(myCoin, null, 4));
