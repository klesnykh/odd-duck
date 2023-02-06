'use strict';

let myContainer = document.querySelector('section');
let myButton = document.querySelector('section + div');
let img1 = document.querySelector('section img:first-child');
let img2 = document.querySelector('section img:nth-child(2)');
let img3 = document.querySelector('section img:nth-child(3)');

let comps = 0;
let compsAllowed = 25;

let allThings = [];

function Thing(name) {
  this.name = name;
  this.src = `img/${name}.jpeg`;
  this.views = 0;
  this.likes = 0;
}

let bag = new Thing('bag');
let banana = new Thing('banana');
let bathroom = new Thing('bathroom');
let boots = new Thing('boots');
let breakfast = new Thing('breakfast');
let bubblegum = new Thing('bubblegum');
let chair = new Thing('chair');
let cthulhu = new Thing('cthulhu');
let dogDuck = new Thing('dog-duck');
let dragon = new Thing('dragon');
let pen = new Thing('pen');
let petSweep = new Thing('pet-sweep');
let scissors = new Thing('scissors');
let shark = new Thing('shark');
let sweep = new Thing('sweep');
let tauntaun = new Thing('tauntaun');
let unicorn = new Thing('unicorn');
let waterCan = new Thing('water-can');
let wineGlass = new Thing('wine-glass');

allThings = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass];

function randomThing () {
  return Math.floor(Math.random() * allThings.length);
}

function renderThings(){
  let thing1 = randomThing();
  let thing2 = randomThing();
  let thing3 = randomThing();

  while (thing1 === thing2 || thing1 === thing3 || thing2 === thing3) {
    if (thing1 === thing2){
      thing2 = randomThing();
    }
    else if (thing1 === thing3){
      thing3 = randomThing();
    }
    else if (thing2 === thing3){
      thing3 = randomThing();
    }
  }

  img1.src = allThings[thing1].src;
  img2.src = allThings[thing2].src;
  img3.src = allThings[thing3].src;
  img1.alt = allThings[thing1].name;
  img2.alt = allThings[thing2].name;
  img3.alt = allThings[thing3].name;
  allThings[thing1].views++;
  allThings[thing2].views++;
  allThings[thing3].views++;

  comps++;
}

function renderResults(){
  let results = document.querySelector('ul');
  for (let i = 0; i < allThings.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allThings[i].name} had ${allThings[i].views} views and ${allThings[i].likes} likes.`;
    results.appendChild(li);
  }
}

function handleThingClick(event){
  let clickedThing = event.target.alt;

  for (let i = 0; i < allThings.length; i++) {
    if (allThings[i].name === clickedThing) {
      allThings[i].likes++;
    }
  }

  if (comps < compsAllowed) {
    renderThings();
  } else {
    myContainer.removeEventListener('click', handleThingClick);
    myButton.addEventListener('click', renderResults);
  }
}

renderThings();
myContainer.addEventListener('click', handleThingClick);