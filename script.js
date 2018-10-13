let flashes = [
  {
    flash: "a",
    flickerTime: 100,
    amount: 5,
  },
  {
    flash: "pause",
    flickerTime: 500,
    amount: 1,
  },
  {
    flash: "b",
    flickerTime: 100,
    amount: 5,
  },
  {
    flash: "pause",
    flickerTime: 500,
    amount: 1,
  },
  {
    flash: "ab",
    flickerTime: 100,
    amount: 5,
  },
  {
    flash: "pause",
    flickerTime: 2000,
    amount: 1,
  }
]

function getImage(name) {
  switch(name) {
    case "a":
      return "https://picsum.photos/200/300/?a"
      break
    case "b":
      return "https://picsum.photos/200/300/?b"
      break
    case "ab":
      return "https://picsum.photos/200/300/?ab"
      break
    default:
      return "https://picsum.photos/200/300/?pause"
  }
}

let index = 0

function loop(nextIndex) {
  setTimeout(() => {
    document.body.style.backgroundImage = `url(${getImage(flashes[nextIndex].flash)})`
  }, flashes[nextIndex].flickerTime)
  loop(nextIndex++)
}

loop(0)
