class People{
  constructor(){
    this.peopleCount = 1000;
    this.underInfluence = dice.getRandom(10);
    this.influence = 10;
    this.influenceContainer = document.querySelector("#influence-count");
    this.peopleContainer = document.querySelector("#people-count");
    this.influenceContainer.innerHTML = this.underInfluence;
    this.peopleContainer.innerHTML = this.peopleCount;
  }
  increaseInfluence(influenceMultiplyer){
    this.underInfluence += this.influence * influenceMultiplyer;
    this.influenceContainer.innerHTML = this.underInfluence;
  }
  getRoundInfluenceCount(){
    var installations = 0;
    for(var being in beings.allBeings){
      if(beings.allBeings[being].isInstalled){
        installations += 3;
      };
    }
    return installations
  }
}
