const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
const suits = ["♠", "♥", "♣", "♦"]
let dealer = []
let player = []
const hit = document.getElementById("hit")
const stand = document.getElementById("stand")
const restart = document.getElementById("restart")
let deck = []

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
  
