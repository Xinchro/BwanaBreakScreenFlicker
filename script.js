let flashes = [
  {
    flash: "a",
    flickerTime: 2000,
    amount: 5,
  },
  {
    flash: "pause",
    flickerTime: 4000,
    amount: 1,
  },
  {
    flash: "v",
    flickerTime: 2000,
    amount: 5,
  },
  {
    flash: "pause",
    flickerTime: 4000,
    amount: 1,
  },
  {
    flash: "v",
    flickerTime: 2000,
    amount: 5,
  },
  {
    flash: "pause",
    flickerTime: 4000,
    amount: 1,
  },
  {
    flash: "av",
    flickerTime: 2000,
    amount: 5,
  },
  {
    flash: "pause",
    flickerTime: 8000,
    amount: 1,
  }
]

// we consider "true" for that light being ON
let state = {
  firstRun: true,
  a: true,
  v: true
}

function getImageResource(name) {
  switch(name) {
    case "a":
      return "img/bwanaTVSignVOff.png"
      break
    case "v":
      return "img/bwanaTVSignAOff.png"
      break
    case "av":
      return "img/bwanaTVSignAVOff.png"
      break
    default:
      return "img/bwanaTVSign.png"
  }
}

function toggleFlicker(name) {
  if(name === "a") {
    if(state.a) {
      state.a = false
    } else
    if(state.v) {
      state.a = true
      state.v = true
    } else
    {
      state.a = true
    }
  }
  if(name === "v") {
    if(state.a) {
      state.a = true
      state.v = true
    } else
    if(state.v) {
      state.v = false
    } else
    {
      state.v = true
    }
  }
  if(name === "av") {
    if(state.a) {
      state.a = false
      state.v = true
    } else
    if(state.v) {
      state.a = true
      state.v = false
    } else
    {
      state.a = true
      state.v = true
    }
  }
}

function getImage(state) {
  // a+/a- a on/off
  // v+/v- v on/off

  if(state.a) {
    if(state.v) {
      // a+v+
      return getImageResource("")
    }
    if(state.a && state.v) {
      // a-v+
      return getImageResource("v")
    }
    // a+v-
    return getImageResource("a")
  }
  if(state.v) {
    if(state.a) {
      // a+v+
      return getImageResource("")
    }
    if(state.a && state.v) {
      // a+v-
      return getImageResource("a")
    }
    // a-v+
    return getImageResource("v")
  }
  if(state.a && state.v) {
    if(state.a) {
      // a-v+
      return getImageResource("v")
    }
    if(state.v) {
      // a+v-
      return getImageResource("a")
    }
    // a+v+
    return getImageResource("")
  }
  // both off
  return getImageResource("av")
}

function setImage(imageURL) {
  document.body.style.backgroundImage = `url('${imageURL}')`
}

function loop(index) {
  // get the previous and next indexes
  let prevIndex = index-1 > -1 ? index-1 : flashes.length-1
  let nextIndex = index+1 < flashes.length ? index+1 : 0

  setTimeout(() => {
    // do the flicker effect
    toggleFlicker(flashes[index].flash)

    // set the image to be displayed, based on what's in the state
    setImage(getImage(state))

    // debug
    console.log("----------------------")
    console.log(state)
    console.log(getImage(state))
    console.log("prev", prevIndex, flashes[prevIndex].flash, flashes[prevIndex].flickerTime)
    console.log("current", index, flashes[index].flash, flashes[index].flickerTime)
    console.log("next", nextIndex, flashes[nextIndex].flash, flashes[nextIndex].flickerTime)

    // no longer the first run
    state.firstRun = false

    // carry on with the loop
    loop(nextIndex)
  }, state.firstRun ? 0 : flashes[prevIndex].flickerTime) // if it's the first run, we don't want a blank image
}

// start loop
loop(0)
