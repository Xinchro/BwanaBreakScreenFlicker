let flashes = [
  {
    flash: "a",
    flickerTime: 1000,
    amount: 5,
  },
  {
    flash: "pause",
    flickerTime: 2000,
    amount: 1,
  },
  {
    flash: "b",
    flickerTime: 1000,
    amount: 5,
  },
  {
    flash: "pause",
    flickerTime: 2000,
    amount: 1,
  },
  {
    flash: "ab",
    flickerTime: 1000,
    amount: 5,
  },
  {
    flash: "pause",
    flickerTime: 4000,
    amount: 1,
  }
]

function getImage(name) {
  switch(name) {
    case "a":
      return "https://dummyimage.com/1920x1080/000/fff&text=a"
      break
    case "b":
      return "https://dummyimage.com/1920x1080/000/fff&text=b"
      break
    case "ab":
      return "https://dummyimage.com/1920x1080/000/fff&text=ab"
      break
    default:
      return "https://dummyimage.com/1920x1080/000/fff&text=pause"
  }
}

function loop(index) {
  let prevIndex = index-1 > -1 ? index-1 : flashes.length-1
  let nextIndex = index+1 < flashes.length ? index+1 : 0

  setTimeout(() => {
    document.body.style.backgroundImage = `url('${getImage(flashes[index].flash)}')`

    console.log("----------------------")
    console.log("prev", prevIndex, flashes[prevIndex].flash, flashes[prevIndex].flickerTime)
    console.log("current", index, flashes[index].flash, flashes[index].flickerTime)
    console.log("next", nextIndex, flashes[nextIndex].flash, flashes[nextIndex].flickerTime)

    loop(nextIndex)
  }, flashes[prevIndex].flickerTime)
}

loop(0)
