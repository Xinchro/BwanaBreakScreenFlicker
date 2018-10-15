let flickers = []

// initial state, we consider "true" for that light being ON
let state = {
  firstRun: true,
  a: true,
  v: true
}

/**
  Gets the image file URI for the given string

  @param {String} name - name of the light(s) we consider off
  @return {String} the URI of the image
*/
function getImageResource(name) {
  switch(name) {
    case "a":
      return "img/bwanaTVSignVOff.png"
      break
    case "v":
      return "img/bwanaTVSignAOff.png"
      break
    case "av":
      return "img/bwanaTVSign.png"
      break
    default:
      return "img/bwanaTVSignAVOff.png"
  }
}

/**
  Toggles the states of the lights - on/off

  @param {String} name - name of the light(s) we're toggling
  @returns {null}
*/
function toggleFlicker(name) {
  if(name === "a") {
    state.a = !state.a
  }
  if(name === "v") {
    state.v = !state.v
  }
  if(name === "av") {
    state.a = !state.a
    state.v = !state.v
  }
}

/**
  Gets the correct image for the state we're in

  @param {Object} state - the state object
  @return {String} the correct image's URI
*/
function getImage(state) {
  // a+/a- a on/off
  // v+/v- v on/off

  if(state.a) {
    if(state.v) {
      // a+v+
      return getImageResource("av")
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
      return getImageResource("av")
    }
    if(state.a && state.v) {
      // a+v-
      return getImageResource("a")
    }
    // a-v+
    return getImageResource("v")
  }
  // both off
  return getImageResource("")
}

/**
  Sets the backgound image to the one at the given URI

  @param {String} imageURL - the image URI
  @return {null}
*/
function setImage(imageURI) {
  document.body.style.backgroundImage = `url('${imageURI}')`
}

let loopingInterval = setInterval(() => {})
/**
  The main loop

  @param {Number} index - the index of where we want to start in the sequence
  @param {Number} frame - optional, the frame of the flicker we're on, defaults to 0
  @return {null}
*/
function loop(index, frame) {
  // get the previous and next indexes
  let prevIndex = index-1 > -1 ? index-1 : flickers.length-1
  let nextIndex = index+1 < flickers.length ? index+1 : 0
  let flicker = flickers[index]
  if(frame === undefined) frame = 0

  let time = flicker.amount > 0 ? flicker.time/flicker.amount : flicker.time

  clearInterval(loopingInterval)

  if(state.firstRun) {
    setImage(getImage(state))
    state.firstRun = false
  }

  loopingInterval = setInterval(() => {
    // flicker the current frame on/off
    toggleFlicker(flicker.name)

    // set the image to be displayed, based on the current state
    setImage(getImage(state))
    // increment frame
    frame++

    if(flicker.time > time*frame) {
      loop(index, frame)
    } else {
      loop(nextIndex)
    }
  }, time)
}

// get the JSON file with the sequence data in
const req = new XMLHttpRequest()
req.open("GET", "flickers.json", true)
req.onreadystatechange = function () {
  if(!req.responseText) return
  flickers = JSON.parse(req.responseText)
  // start loop
  loop(0)
}
req.send(null)

