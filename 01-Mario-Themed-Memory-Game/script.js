const cards = document.querySelectorAll('.card');
let isFlipped = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard(){
    if(lockBoard) return;

    if(this === firstCard) return;

    this.classList.add('flip');
    if(!isFlipped){
        isFlipped = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    isFlipped = false
    checkForMatch();
}

function checkForMatch(){
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards();
        return;
    }else{
        unflipCards();
    }
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard(){
    [isFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffleCards(){
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

cards.forEach(card => {
    card.addEventListener('click', flipCard)
})

