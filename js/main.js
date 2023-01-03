const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
const suits = ["♠", "♥", "♣", "♦"]
const hit = document.getElementById("hit")
const stand = document.getElementById("stand")
const restart = document.getElementById("restart")

function createDeck() {
    const deck = []
    suits.forEach(suit => {
      values.forEach(value => {
        deck.push(value + suit)
      })
    })
    return deck
  }



  