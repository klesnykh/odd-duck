'use strict';

let myContainer = document.querySelector('section');
let myButton = document.querySelector('section + div');
let img1 = document.querySelector('section img:first-child');
let img2 = document.querySelector('section img:nth-child(2)');
let img3 = document.querySelector('section img:nth-child(3)');

let comps = 0;
let compsAllowed = 25;

let allThings = [];
let indexArray = [];


function Thing(name) {
  this.name = name;
  this.src = `img/${name}.jpeg`;
  this.views = 0;
  this.likes = 0;
}


if(!localStorage.getItem('allThingsLocalStorage')){
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
}
else {
  allThings = JSON.parse(localStorage.getItem('allThingsLocalStorage'));
}

function randomThing () {
  return Math.floor(Math.random() * allThings.length);
}

function renderThings(){
  //UPDATED/NICER WHILE LOOP
  while (indexArray.length < 6) {
    let ranNum = randomThing();
    if (!indexArray.includes(ranNum)) {
      indexArray.push(ranNum);
    }
  }

  let thing1 = indexArray.shift();
  let thing2 = indexArray.shift();
  let thing3 = indexArray.shift();

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

  //pack allThings and leave in storage
  localStorage.setItem('allThingsLocalStorage', JSON.stringify(allThings));
  myButton.removeEventListener('click', renderResults);
  renderChart();
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

function renderChart(){
  let thingLikes = [];
  let thingNames = [];
  let thingViews = [];

  for (let i=0; i<allThings.length; i++){
    thingLikes.push(allThings[i].likes);
    thingNames.push(allThings[i].name);
    thingViews.push(allThings[i].views);
  }

  let ctx = document.getElementById('myChart');
  //let ctx = document.createElement('canvas');
  //myChart.appendChild(ctx);

  let config = {
    type: 'bar',
    data: {
      labels: thingNames,
      datasets: [
        {
          label: '# of Likes',
          data: thingLikes,
          borderWidth: 1,
          backgroundColor: '#FF2D00',
        },
        {
          label: '# of Views',
          data: thingViews,
          borderWidth: 1,
          backgroundColor: '#0008FF',
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }
  
  new Chart(ctx, config);
  
}
