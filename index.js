const cards = document.querySelectorAll('.memoryCard');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    //toggle means that if tere is the class 'flip', in 'this' element
    //then remove it, otherwise add it
    this.classList.toggle('flip');

    if(!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    //second click
    //every time in 2nd click, hasFlippedCard will reset to false
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    //do they match?
    /*
    console.log(firstCard.dataset.pokemon);
    console.log(secondCard.dataset.pokemon);
    */

    let isMatch = firstCard.dataset.pokemon === secondCard.dataset.pokemon;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click',flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        //sothat it doesn't immidiately flips back 
        //and removes 'flip' class, if it isnt a mtach
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function suffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
