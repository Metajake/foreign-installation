class Game {
  constructor(){
    this.round = 1;
    this.turnPosition = 0;
    this.numberOfPlayers = 0;
    this.currentPlayer = {};
    this.roundContainer = document.querySelector("#turn-count");
    this.turnStatusContainer = document.querySelector("#round-status");

    this.characterDefending = false;
    this.roundTarget = "";
    this.roundDamage = 0;
  }
  takeTurn(){
    if(this.numberOfPlayers % (this.turnPosition) == 1 ){
      this.turnPosition = 0;
    }else{
      this.turnPosition ++;
    };
    this.currentPlayer = this.choosePlayer(this.turnPosition);
    this.round ++
    this.updateRoundStatus(1)
  }
  chooseFirstRandomPlayer(){
    this.updateRoundStatus(1)
    for(var key in beings.allBeings){this.numberOfPlayers ++;}
    this.turnPosition = dice.getRandomZero(this.numberOfPlayers)
    this.choosePlayer(this.turnPosition)
    console.log("starting round: "+this.round)
  }
  choosePlayer(position){
    this.currentPlayer = beings.allBeings[Object.keys(beings.allBeings)[position]];
    for(var key in beings.allBeings){
      beings.allBeings[key].container.classList.add("disabled");
    }
    this.currentPlayer.container.classList.remove("disabled");
    return this.currentPlayer;
  }
  firstPhase(action, attackingTarget, attackingValue, color){
    this.roundTarget = attackingTarget;
    this.roundDamage = attackingValue;
    this.enableAllCharacters();
    turnButton.classList.add("disabled");
    this.updateRoundStatus(2)
    this.currentPlayer.updateStatus(action + " " + this.roundTarget, color);
  }
  secondPhase(){
    for(var key in beings.allBeings){
      if(beings.allBeings[key].defending){
        beings.allBeings[key].damage(this.roundDamage)
        this.characterDefending = true;
      }
    }
    if(!this.characterDefending && this.roundTarget.length){
      beings.allBeings[this.roundTarget].damage(this.roundDamage);
    }
    this.enableCurrentPlayer();
    this.finalPhase();
  }
  finalPhase(){
    this.updateRoundStatus(3)
    this.checkWin()
    this.resetRoundVariables();
  }
  enableAllCharacters(){
    for(var key in beings.allBeings){
      beings.allBeings[key].container.classList.remove("disabled");
    }
  }
  enableCurrentPlayer(){
    for(var key in beings.allBeings){
      beings.allBeings[key].container.classList.add("disabled");
    }
    this.currentPlayer.container.classList.remove("disabled");
  }
  resetRoundVariables(){
    for(var key in beings.allBeings){
      beings.allBeings[key].defending = false;
      beings.allBeings[key].updateStatus("","");
    }
    this.characterDefending = false;
    this.roundTarget = {};
    this.roundDamage = 0;
    turnButton.classList.remove("disabled");
  }
  checkWin(){
    if (beings.allBeings['monster'].hp <= 0){
      console.log("Knight Wins")
    }
    if (beings.allBeings['shaman'].hp <= 0 && beings.allBeings['monster'].hp <= 0){
      console.log("Shaman Wins!")
    }
  }
  updateRoundStatus(phase){
    this.turnStatusContainer.innerHTML = "Round "+ this.round + ", Phase " + phase;
  }
}
