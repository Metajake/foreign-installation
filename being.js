class Being {
  constructor(hp, name, strength){
    this.life = hp;
    this.hp = hp;
    this.name = name;
    this.strength = strength;
    this.defending = false;
    this.status = "";
    this.isInstalled = false;
    this.alive = true;
    this.dreamingBody = false;
    this.hasRevived = false;

    this.container = document.createElement("div");
    this.container.id = this.name
    this.container.classList.add("being")

    this.historyContainer = document.createElement("h4");
    this.installationContainer = document.createElement("h4");
    this.dreamingContainer = document.createElement("h4");

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
    var dreamButton = this.createGUIButton("dream");

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

    this.container.appendChild(this.historyContainer);
    this.container.appendChild(this.installationContainer);
    this.container.appendChild(this.dreamingContainer);
    this.container.appendChild(title)
    this.container.appendChild(this.hpContainer)
    this.container.appendChild(this.statusContainer)
    this.container.appendChild(this.overviewContainer)
    this.container.appendChild(this.buttonContainer)
    this.container.appendChild(attackValue)

    document.querySelector("#beings-container").append(this.container);

    this.speak()
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
    this.checkIfDead();
  }
  defend(){
    this.defending = true;
    this.updateStatus("defending", "green");
  }
  dream(){
    this.dreamingBody = true;
    this.dreamingContainer.innerHTML = "&cap;"
  }
  checkIfDead(){
    if(this.hp <= 0){
      this.alive = false;
      this.returnToSource();
    }
  }
  checkRevive(){
    if(!this.hasRevived){
      if(this.dreamingBody){
        this.overviewContainer.innerHTML = "Your journey on this worldly plain is not over.";
        this.alive = true;
        this.hp = this.life;
        this.hpContainer.innerHTML = this.hp;
        this.hasRevived = true;
        this.dreamingBody = false;
        this.dreamingContainer.innerHTML = "";
      }else{
        this.overviewContainer.innerHTML = "Your consciousness has shattered into a million pieces. You have returned to the creative source.";
      }
    }else{
      this.overviewContainer.innerHTML = "Your second time returning to the source will be your last.";
    }
  }
  updateStatus(message, color){
    this.statusContainer.innerHTML = message;
    this.statusContainer.style.color = color;
  }
}

class EarthlyBeing extends Being {
  constructor(hp, name, strength){
    super(hp, name, strength);
    this.isInstalled = true;
    this.personalHistory = 1;
    this.installationContainer.innerHTML = "&zeta; ";
    this.historyContainer.innerHTML = "&odot; ";
    this.createGUIButton("shed");
  }
  speak(){
    this.overviewContainer.innerHTML = "I am a "+this.name+" of earth!"
  }
  shed(){
    this.overviewContainer.innerHTML = "Erasing my personal history."
    this.personalHistory -= 1;
    this.historyContainer.innerHTML = "";
  }
  checkIfUninstalled(){
    if(!this.personalHistory){
      this.isInstalled = false;
      this.installationContainer.innerHTML = "";
    }
  }
  returnToSource(){
    console.log("Returning to creative source.")
    this.checkIfUninstalled();
    if(!this.isInstalled){
      if(dice.getRandom(5) <= 4){ //75% Chance to kill monster
        beings.allBeings['monster'].damage(beings.allBeings['monster'].hp);
      }else{
        beings.allBeings['monster'].overviewContainer.innerHTML = "I continue to feast on your energy.";
        this.checkRevive()
      }
    }else if(dice.getRandom(9) <= 1){ //11% Chance to kill monster
      beings.allBeings['monster'].damage(beings.allBeings['monster'].hp);
    }else{
      beings.allBeings['monster'].overviewContainer.innerHTML = "I continue to feast on your energy.";
      this.checkRevive()
    }
  }
}

class Flyer extends Being {
  constructor(hp, name, strength){
    super(hp, name, strength);
  }
  speak(){
    this.overviewContainer.innerHTML = "I am a "+this.name+" not of this earth!"
  }
  returnToSource(){
    console.log("Freedom in Infinity.");
  }
}
