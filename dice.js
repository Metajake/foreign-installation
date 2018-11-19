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
