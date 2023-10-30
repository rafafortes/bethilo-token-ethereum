import React, { Component } from 'react';
import './App.css';
import BetHiLoMinterABI from './contracts/BetHiLoMinter.json';
import Web3 from 'web3';

class App extends Component {
  state = {
    luckyNumber: '00000',
    currentBalance: 1000,
    multiplier: 1,
    message: '',
    winloss: '',
    isClaimAllowed: 'claim-not-allowed',
    minimumBalanceToClaim: 1001,
    errorMessagesClass: 'error-messages-not-visible',
    errorMessage: ''
  };

  claimTokens = async() => {    
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected account:', accounts[0]);

        const CONTRACT_ADDRESS = BetHiLoMinterABI.networks[11155111].address;
        const web3 = new Web3(window.ethereum);
        const betHiLoMinterContract = new web3.eth.Contract(BetHiLoMinterABI.abi, CONTRACT_ADDRESS);
        const receipt = await betHiLoMinterContract.methods.mintTokens(accounts[0], this.state.currentBalance).send({ from: accounts[0] });
        console.log('Transaction receipt:', receipt);
      } catch (error) {
        this.setState({
          errorMessage: error.message,
          errorMessagesClass: 'error-messages-visible'
        });
        console.error('Please grant access to your MetaMask:', error);
      }
    } else {
      alert('Please install MetaMask to use this feature.');
    }
  }

  reduceMultiplier = () => {
    if (this.state.multiplier === 1) return;
    this.setState({multiplier: this.state.multiplier - 1});
  }

  increaseMultiplier = () => {
    this.setState({multiplier: this.state.multiplier + 1});
  }

  playerWon = () => {
    this.setState({
        currentBalance: this.state.currentBalance + 1*this.state.multiplier,
        message: 'You won!',
        winloss: 'win'
    }, () => {
        this.isClaimAllowed();
    });
  }

  isClaimAllowed = () => {
    if(this.state.currentBalance >= this.state.minimumBalanceToClaim) {
      this.setState({
        isClaimAllowed: 'claim-allowed'
      });
    } else {
      this.setState({
        isClaimAllowed: 'claim-not-allowed'
      });
    }
  }

  playerLost = () => {
    this.setState({
      currentBalance: this.state.currentBalance - 1*this.state.multiplier,
      message: 'You lost!',
      winloss: 'loss'
    }, () => {
      this.isClaimAllowed();
    });
  }

  betHi = () => {
    if (this.state.multiplier > this.state.currentBalance) {
      return;
    }

    const newNumber = this.generateRandomNumber();
    
    if (newNumber > 5250) {
      this.playerWon();
    } else {
      this.playerLost();
    }
  }

  betLo = () => {
    if (this.state.multiplier > this.state.currentBalance) {
      return;
    }
    
    const newNumber = this.generateRandomNumber();

    if (newNumber < 4750) {
      this.playerWon();
    } else {
      this.playerLost();
    }
  }

  generateRandomNumber = () => {
    let randomNum = Math.floor(Math.random() * 10001);

    let displayNum = String(randomNum).padStart(5, '0');

    this.setState({
      luckyNumber: displayNum
    });

    return randomNum;
  }

  render() {
    return (
      <div className="container">
        <div className="number-display">
            {this.state.luckyNumber}
        </div>
        <div className="buttons">
            <button className="btn btn-hi" onClick={this.betHi}>BET HI</button>
            <button className="btn btn-lo" onClick={this.betLo}>BET LO</button>
        </div>
        <div className="multipliers">
          <button className="btn-reduce-multiplier" onClick={this.reduceMultiplier}>Reduce multiplier</button>
          <button className="btn-increase-multiplier" onClick={this.increaseMultiplier}>Increase multiplier</button>
        </div>
        <div className={this.state.winloss}>{this.state.message}</div>        
        <div className="current-balance">
          <p>Current multiiplier: {this.state.multiplier}</p>
          <p>Current balance: {this.state.currentBalance}</p>
        </div>
        <div className="rules">
          <p>Rules:</p>
          <p>Bet Hi: You won if number is greater than 5250</p>
          <p>Bet Lo: You won if number is lesser than 4750</p>
          <p>You can claim your tokens if you have a balance greater than {this.state.minimumBalanceToClaim}</p>
        </div>
        <div className={this.state.errorMessagesClass}>
          <p>Error: {this.state.errorMessage}</p>
        </div>
        <div className={this.state.isClaimAllowed}>
          <button className="btn-claim-tokens" onClick={this.claimTokens}>Claim your tokens here</button>
        </div>
      </div>      
    );
  }
}

export default App;