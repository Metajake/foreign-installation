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
