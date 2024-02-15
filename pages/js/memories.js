// /*Javascript code for the memories games- a function will initialize the game by creating
//  and placing cards over the screen.
//  The games contains differents level*/ 

let cards =document.querySelectorAll('img');
  
const gridContainer = document.querySelector(".grid-container");

let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let cardImages;
document.querySelector(".score").textContent = score;
//function to start playing
function startToPlay() {

      // Get the common parent div using its class
      const actionsDiv = document.querySelector('.actions');
    const buttonstart=document.getElementById("starting");
      // Get all buttons within the common parent div
      const allButtons = actionsDiv.querySelectorAll('button');
    buttonstart.style.display='none';
      // Change the display property of all buttons
      allButtons.forEach(button => {
        button.style.display = 'block'; // Hide all buttons
      
      });
     
    }
  
  
 //function of the first level
function firstLevel(){
  cardImages=[cards[0],cards[1]];
  restart();
}
//function of the second level}
function secondLevel()
{
  cardImages=[cards[0],cards[1],cards[2],cards[3],cards[4]];
  restart();
}
function thirdLevel(){
  cardImages=cards;
  restart();
}
function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
}
  function shuffleCards() {
      let currentIndex = cardImages.length,
        randomIndex,
        temporaryValue;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cardImages[currentIndex];
        cardImages[currentIndex] = cardImages[randomIndex];
        cardImages[randomIndex] = temporaryValue;
      }
    }

//the function for creating the cards and display them on the screen
function generateCards() {
  gridContainer.innerHTML="";
  for(let i=0;i<2;i++){
      let j=0;
  for (let card of cardImages) {
       
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.title=j.toString();
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.src} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
    j++;
    
  }
   j=0;}
  
}
 
//every time a card is clicked we change its class to flipped
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
 lockBoard = true;

  checkForMatch();
}
//function that checks if the two flipped cards are equals
function checkForMatch() {
let isMatch = firstCard.title === secondCard.title;

isMatch ? disableCards() : unflipCards();
}

//removes the event of flipcard from a card which is already clicked
function disableCards() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
firstCard.removeEventListener("click", flipCard);
secondCard.removeEventListener("click", flipCard);
score++;
document.querySelector(".score").textContent = score;
resetBoard();
}

// //when the 2 flipped cards are not the same we remove from them the class of 'flipped'
function unflipCards() {
setTimeout(() => {
  firstCard.classList.remove("flipped");
  secondCard.classList.remove("flipped");
  resetBoard();
}, 1000);
}

function resetBoard() {
firstCard = null;
secondCard = null;
lockBoard = false;
}


