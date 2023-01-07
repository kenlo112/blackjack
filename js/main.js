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
const restart = document.getElementById("restart")
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

// take a look later
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
      cardEl.innerText = card
      dealerHandEl.appendChild(cardEl)
  })
  player = [getRandomCard(), getRandomCard()];
  player.forEach(card => {
      const cardEl = document.createElement("div")
      cardEl.classList.add("card")
      cardEl.innerText = card
      playerHandEl.appendChild(cardEl)
  })
  if (points(player) === 21) {
    console.log("player win")
  }
}

function disableEventListener() {
    deal.removeEventListener("click", firstHand)
  }
deal.addEventListener("click", disableEventListener)

function playerHit() {
    const newCard = getRandomCard()
    player.push(newCard)
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.innerText = newCard;
    playerHandEl.appendChild(cardEl);

    //delete later
    console.log(player)

    if (points(player) > 21) {
      console.log("Bust!")
    }
  }

function points(hand) {
  let total = 0
  let aces = 0
  hand.forEach(card => {
    if (card[0] === "A") {
      aces += 1
    } else if (card[0] === "J" || card[0] === "Q" || card[0] === "K") {
      total += 10
    } else {
      total += parseInt(card[0])
    }
  })

  for (let i = 0; i < aces; i++) {
    if (total + 11 <= 21) {
      total += 11
    } else {
      total += 1
    }
  }
  return total
}

