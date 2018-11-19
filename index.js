function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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
    this.isInstalled = false;

    this.container = document.createElement("div");
    this.container.id = this.name
    this.container.classList.add("being")

    this.installationContainer = document.createElement("h4");

    var title = document.createElement("h4");
    title.innerHTML = this.name;

    this.statusContainer = document.createElement("span");

    this.overviewContainer = document.createElement("p");
    this.overviewContainer.innerHTML = "chillin'";

    this.hpContainer = document.createElement("span");
    this.hpContainer.classList.add("hp")
    this.hpContainer.innerHTML = this.hp;

    this.buttonContainer = document.createElement("div");
    this.buttonContainer.classList.add("button-container");
    var attackButton = this.createGUIButton("attack");
    var defendButton = this.createGUIButton("defend");

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

    this.container.appendChild(this.installationContainer);
    this.container.appendChild(title)
    this.container.appendChild(this.hpContainer)
    this.container.appendChild(this.statusContainer)
    this.container.appendChild(this.overviewContainer)
    this.container.appendChild(this.buttonContainer)
    this.container.appendChild(attackValue)

    document.querySelector("#beings-container").append(this.container);

    this.speak()
  }
  appendInstallationContainer(){

    if(this.isInstalled){
      this.installationContainer.innerHTML = "&zeta; ";
    }

  }
  createGUIButton(type){
    var button = document.createElement("input");
    button.classList.add(type);
    button.type = "submit";
    button.value = capitalizeFirstLetter(type);
    this.buttonContainer.appendChild(button);
    return button
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
  shed(){
    this.overviewContainer.innerHTML = "Erasing my personal history."
  }
  updateStatus(message, color){
    this.statusContainer.innerHTML = message;
    this.statusContainer.style.color = color;
  }
}

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
    }else if (beings.allBeings['shaman'].hp <= 0 && beings.allBeings['monster'].hp <= 0){
      console.log("Shaman Wins!")
    }
  }
  updateRoundStatus(phase){
    this.turnStatusContainer.innerHTML = "Round "+ this.round + ", Phase " + phase;
  }
}

class EarthlyBeing extends Being {
  constructor(hp, name, strength){
    super(hp, name, strength);
    this.isInstalled = true;
    this.installationContainer.innerHTML = "&zeta; ";
    this.createGUIButton("shed");
  }
  speak(){
    this.overviewContainer.innerHTML = "I am a "+this.name+" of earth!"
  }
}

class Flyer extends Being {
  constructor(hp, name, strength){
    super(hp, name, strength);
  }
  speak(){
    this.overviewContainer.innerHTML = "I am a "+this.name+" not of this earth!"
  }
}

let game = new Game();
let dice = new Dice();
let beings = new Beings();

let monster = new Flyer(50, "monster", 20);
beings.allBeings[monster.name] = monster;

let warrior = new EarthlyBeing(60, "warrior", 40);
beings.allBeings[warrior.name] = warrior;

let shaman = new EarthlyBeing(40, "shaman", 10);
beings.allBeings[shaman.name] = shaman;

// let bard = new EarthlyBeing(20, "bard", 5);
// beings.allBeings[bard.name] = bard;

beings.createTargets();
game.chooseFirstRandomPlayer();

var diceRoller = document.querySelector("#roll-dice");
diceRoller.addEventListener('click', function(){
  var outcome = dice.roll(document.querySelector("#roll-value").value);
})

var attackButtons = document.querySelectorAll(".attack")
attackButtons.forEach(function(element){
  element.addEventListener("click", function(event){
    var attackingTarget = element.parentNode.parentNode.querySelector(".attack-target").value;
    var attackingDiceValue = element.parentNode.parentNode.querySelector(".attack-roll").value;
    var attackingValue = dice.roll(attackingDiceValue);
    game.firstPhase("Attacking", attackingTarget, attackingValue, "red");
  })
})

var defendButtons = document.querySelectorAll(".defend")
defendButtons.forEach(function(element){
  element.addEventListener("click", function(event){
    var defender = element.parentNode.parentNode.id;
    beings.allBeings[defender].defend();
  })
})

var shedButtons = document.querySelectorAll(".shed")
shedButtons.forEach(function(element){
  element.addEventListener("click", function(event){
    var shedder = element.parentNode.parentNode.id;
    beings.allBeings[shedder].shed();
    game.firstPhase("Shedding", "", 0, "blue");
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
