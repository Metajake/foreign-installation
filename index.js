class Dice {
  constructor() {

  }
  roll(height){
    console.log("Rolling Dice!");
    var rollValue = Math.floor((Math.random() * height) + 1);
    document.querySelector("#dice-outcome").innerHTML = rollValue;
    return rollValue
  }
  getRandom(height){
    var rollValue = Math.floor((Math.random() * height) + 1);
    return rollValue
  }
  getRandomZero(height){
    var rollValue = Math.floor((Math.random() * height));
    return rollValue
  }
}

class Beings{
  constructor(){
    this.allBeings = {}
  }
  createTargets(){
    for (var key in this.allBeings){
      var targetSelector = document.createElement("select");
      targetSelector.classList.add("attack-target");
      for(var key2 in this.allBeings){
        var target = document.createElement("option");
        target.value = this.allBeings[key2].name;
        target.innerHTML = this.allBeings[key2].name;
        targetSelector.appendChild(target);
      }
      this.allBeings[key].container.appendChild(targetSelector);
    };

  }
}

class Being {
  constructor(hp, name, strength){
    this.hp = hp;
    this.name = name;
    this.strength = strength;
    this.defending = false;
    this.status = "";

    this.container = document.createElement("div");
    this.container.id = this.name
    this.container.classList.add("being")

    var title = document.createElement("h4");
    title.innerHTML = this.name;

    this.statusContainer = document.createElement("span");

    this.hpContainer = document.createElement("p");
    this.hpContainer.classList.add("hp")
    this.hpContainer.innerHTML = this.hp;

    var attackButton = document.createElement("input");
    attackButton.classList.add("attack");
    attackButton.type = "submit";
    attackButton.value = "Attack";

    var defendButton = document.createElement("input");
    defendButton.classList.add("defend");
    defendButton.type = "submit";
    defendButton.value = "Defend";

    var attackValue = document.createElement("div");
    attackValue.classList.add("attack-value");

    var attackSelector = document.createElement("select");
    attackSelector.classList.add("attack-roll")
    // for(var i = 2; i < 21; i++){
      var valueOption = document.createElement("option");
      valueOption.value = this.strength;
      valueOption.innerHTML = this.strength;
      attackSelector.appendChild(valueOption);
    // }
    attackValue.appendChild(attackSelector);

    this.container.appendChild(title)
    this.container.appendChild(this.statusContainer)
    this.container.appendChild(this.hpContainer)
    this.container.appendChild(attackButton)
    this.container.appendChild(defendButton)
    this.container.appendChild(attackValue)

    document.querySelector("#beings-container").append(this.container);
  }
  get hp(){
    return this.hp();
  }
  hp(){
    return this.hp;
  }
  damage(amount){
    this.hp -= amount;
    this.hpContainer.innerHTML = this.hp;
  }
  defend(){
    this.defending = true;
    this.updateStatus("defending", "green");
  }
  updateStatus(message, color){
    this.statusContainer.innerHTML = message;
    this.statusContainer.style.color = color;
  }
}

class Game {
  constructor(){
    this.round = 0;
    this.roundPosition = 0;
    this.numberOfPlayers = 0;
    this.currentPlayer = {};
    this.roundContainer = document.querySelector("#turn-count");
    this.roundContainer.innerHTML = this.round;

    this.characterDefending = false;
    this.roundTarget = "";
    this.roundDamage = 0;
  }
  takeTurn(){
    console.log("taking turn");
    if(this.numberOfPlayers % (this.roundPosition) == 1 ){
      this.roundPosition = 0;
    }else{
      this.roundPosition ++;
    };
    this.currentPlayer = this.choosePlayer(this.roundPosition);
    this.round ++
    this.roundContainer.innerHTML = this.roundPosition;
  }
  chooseFirstRandomPlayer(){
    for(var key in beings.allBeings){this.numberOfPlayers ++;}
    this.roundPosition = dice.getRandomZero(this.numberOfPlayers)
    this.roundContainer.innerHTML = this.roundPosition;
    var firstPlayer = this.choosePlayer(this.roundPosition)
  }
  choosePlayer(position){
    this.currentPlayer = beings.allBeings[Object.keys(beings.allBeings)[position]];
    for(var key in beings.allBeings){
      beings.allBeings[key].container.classList.add("disabled");
    }
    this.currentPlayer.container.classList.remove("disabled");
    return this.currentPlayer;
  }
  firstPhase(attackingTarget, attackingValue){
    this.roundTarget = attackingTarget;
    this.roundDamage = attackingValue;
    this.enableAllCharacters();
    turnButton.classList.add("disabled");
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
    for(var key in beings.allBeings){
      beings.allBeings[key].defending = false;
      beings.allBeings[key].updateStatus("","");
    }
    this.characterDefending = false;
    this.attackingTarget = {};
    this.roundDamage = 0;
    turnButton.classList.remove("disabled");
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
}

let game = new Game();
let dice = new Dice();
let beings = new Beings();

let monster = new Being(100, "monster", 20);
beings.allBeings[monster.name] = monster;

let knight = new Being(60, "knight", 20);
beings.allBeings[knight.name] = knight;

let shaman = new Being(40, "shaman", 10);
beings.allBeings[shaman.name] = shaman;

beings.createTargets();
game.chooseFirstRandomPlayer();

var diceRoller = document.querySelector("#roll-dice");
diceRoller.addEventListener('click', function(){
  var outcome = dice.roll(document.querySelector("#roll-value").value);
})

var attackButtons = document.querySelectorAll(".attack")
attackButtons.forEach(function(element){
  element.addEventListener("click", function(event){
    var attackingTarget = element.parentNode.querySelector(".attack-target").value;
    var attackingDiceValue = element.parentNode.querySelector(".attack-roll").value;
    var attackingValue = dice.roll(attackingDiceValue);
    game.firstPhase(attackingTarget, attackingValue);
  })
})

var defendButtons = document.querySelectorAll(".defend")
defendButtons.forEach(function(element){
  element.addEventListener("click", function(event){
    var defender = element.parentNode.id;
    console.log(defender);
    beings.allBeings[defender].defend();
  })
})

var turnButton = document.querySelector("#take-turn");
turnButton.addEventListener("click", function(event){
  game.takeTurn();
})

var concludeFirstPhaseButton = document.querySelector("#conclude-first-phase");
concludeFirstPhaseButton.addEventListener("click", function(event){
  game.secondPhase();
})
