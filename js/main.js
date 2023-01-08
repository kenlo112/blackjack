const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
const suits = ["♠", "♥", "♣", "♦"]
let dealer = []
let player = []
let deck = []
let playerHand = []

const deal = document.getElementById("deal")
deal.addEventListener("click", firstHand)

const hit = document.getElementById("hit")
hit.addEventListener("click", playerHit)

const stand = document.getElementById("stand")
stand.addEventListener("click", standDealer);

const restart = document.getElementById("restart")
restart.addEventListener("click", restartGame)

const message = document.getElementById("message")

const dealerCardContainer = document.getElementById("dealer")
const playerCardContainer = document.getElementById("player")

createNewDeck()
function createNewDeck() {    
    values.forEach(value => {
        suits.forEach(suit => {
            deck.push(value + suit)
        })
    })
    return deck
  }

function getRandomCard() {
    const idx = Math.floor(Math.random() * deck.length)
    const card = deck[idx]
    deck.splice(idx, 1)
    return card
  }

  function points(hand) {
    let value = 0
    let aces = 0
    hand.forEach(card => {
      if (card.length === 2) {
        if (card[0] === "A") {
          aces += 1
        } else if (card[0] === "J" || card[0] === "Q" || card [0] === "K") {
          value += 10
        } else {
          value += Number(card[0])
        }
      } else {
        value += 10
      }
    })
  
    for (let i = 0; i < aces; i++) {
      if (value + 11 <= 21) {
        value += 11
      } else {
        value += 1
      }
    }
    return value
  }
  
const dealerHandEl = document.createElement("div")
dealerHandEl.classList.add("cards")
dealerCardContainer.appendChild(dealerHandEl)

const playerHandEl = document.createElement("div")
playerHandEl.classList.add("cards")
playerCardContainer.appendChild(playerHandEl)

function firstHand() {
  dealer = [getRandomCard(), getRandomCard()];
  dealer.forEach(card => {
      const cardEl = document.createElement("div")
      cardEl.classList.add("card")
      cardEl.innerHTML = card
      dealerHandEl.appendChild(cardEl)
    if (points(dealer) === 21)
    message.innerHTML = "Dealer blackjack, Dealer Win"
  })
  player = [getRandomCard(), getRandomCard()];
  player.forEach(card => {
      const cardEl = document.createElement("div")
      cardEl.classList.add("card")
      cardEl.innerText = card
      playerHandEl.appendChild(cardEl)
  })
}

function disableDeal() {
    deal.removeEventListener("click", firstHand)
  }
deal.addEventListener("click", disableDeal)


function playerHit() {
    const newCard = getRandomCard()
    player.push(newCard)
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.innerHTML = newCard;
    playerHandEl.appendChild(cardEl);

    if (points(player) > 21) {
      message.innerHTML = "Player Bust!"
    }
  }

  function disableHit() {
    hit.removeEventListener("click", playerHit)
    disableDeal()
  }
  stand.addEventListener("click", disableHit)

  function standDealer() {
    while (points(dealer) < 17) {
      const newCard = getRandomCard()
      dealer.push(newCard);
      const cardEl = document.createElement("div")
      cardEl.classList.add("card")
      cardEl.innerHTML = newCard
      dealerHandEl.appendChild(cardEl)
    }
  
    if (points(dealer) > 21) {
      message.innerHTML = "Dealer busts Player win!"
    } else if (points(player) > points(dealer)) {
      message.innerHTML = "Player Win!"
    } else if (points(player) < points(dealer)) {
      message.innerHTML = "Dealer Win!"
    } else {
      message.innerHTML = "Tie!"
    }
  }

function restartGame() {
  dealer = []
  player = []
  deck = createNewDeck()
  playerHand = []
  dealerHandEl.innerHTML = ""
  playerHandEl.innerHTML = ""
  message.innerHTML = ""
  deal.addEventListener("click", firstHand);
  deal.removeEventListener("click", disableDeal);
  hit.addEventListener("click", playerHit)
  stand.addEventListener("click", disableHit)
}