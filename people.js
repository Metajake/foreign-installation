class People{
  constructor(){
    this.peopleCount = 1000;
    this.underInfluence = 0;
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
    var installations = 2;
    for(var being in beings.allBeings){
      if(beings.allBeings[being].isInstalled){
        installations += 1;
      };
    }
    return installations
  }
}
