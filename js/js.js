const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
const suits = ["♠", "♥", "♣", "♦"]
let dealer = []
let player = []
let deck = []
var playerHand = []

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

const dealerHandEl = document.createElement("div")
dealerHandEl.classList.add("cards")
dealerCardContainer.appendChild(dealerHandEl)

const playerHandEl = document.createElement("div")
playerHandEl.classList.add("cards")
playerCardContainer.appendChild(playerHandEl)

function firstHand() {
    const dealerHand = [getRandomCard(), getRandomCard()];
    dealerHand.forEach(card => {
        const cardEl = document.createElement("div")
        cardEl.classList.add("card")
        cardEl.innerText = card
        dealerHandEl.appendChild(cardEl)
    })
    const playerHand_first = [getRandomCard(), getRandomCard()];
    playerHand.push(playerHand_first[0], playerHand_first[1])
    playerHand_first.forEach(card => {
        const cardEl = document.createElement("div")
        cardEl.classList.add("card")
        cardEl.innerText = card
        playerHandEl.appendChild(cardEl)
    })
  }

function disableEventListener() {
    deal.removeEventListener("click", firstHand)
  }
deal.addEventListener("click", disableEventListener)

function calVal(hand){
  let value = 0
  let ace_count = 0
  hand.forEach(card => {
    if (card[0] == "J" || card[0] == "Q" || card[0] == "K") {
      value += 10
    } else if (card[0] == "A") {
      value += 1
      ace_count += 1
    } else if (card == "10") {
      value += parseInt(card)
    } else {
      value += parseInt(card[0])
    }
  })

  let result = [value]
  for (let index = 0; index < ace_count; index++) {
    result.push(result[result.length-1] + 10)
  }

  return result
}

function playerHit() {
    const newCard = getRandomCard()
    playerHand.push(newCard)
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.innerText = newCard;
    playerHandEl.appendChild(cardEl);
    console.log(calVal(playerHand))     
  }