const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
const suits = ["♠", "♥", "♣", "♦"]
const hit = document.getElementById("hit")
const stand = document.getElementById("stand")
const restart = document.getElementById("restart")

  function createNewDeck() {
    const deck = []
    values.forEach(value => {
        suits.forEach(suit => {
            deck.push(value + suit)
        })
    })
    return deck
  }

  console.log(createNewDeck());


  