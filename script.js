//Game Constants and variables
let inputDir = { x: 0, y: 0 }
const movesound = new Audio("move.mp3")
const foodsound = new Audio("food.mp3")
const gameoverSound = new Audio("gameover.mp3")
let speed = 5
let lastpainttime = 0
let snakearr = [{ x: 13, y: 15 }]
food = { x: 6, y: 7 }
let score = 0

//Game functions
main = (ctime) => {
  window.requestAnimationFrame(main)
  //console.log(ctime);
  if ((ctime - lastpainttime) / 1000 < 1 / speed) {
    return
  }
  lastpainttime = ctime
  gameEngine()
}

collide = (snake) => {
  //if you bump into yourself
  for (let i = 1; i < snakearr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true
    }
  }
  //if you bump into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true
  }
  return false
}

gameEngine = () => {
  //Part 1-->updating snake and food
  if (collide(snakearr)) {
    gameoverSound.play()
    inputDir = { x: 0, y: 0 }
    alert("Game Over:(Press ctrl + r to refrest the game")
    snakearr = [{ x: 13, y: 15 }]
    score = 0
  }

  //if you have eaten the food,regenerate the food
  if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
    foodsound.play()
    score++
    if (score > highscoreval) {
      highscoreval = score
      localStorage.setItem("hiscore", JSON.stringify(highscoreval))
      hiscorebox.innerHTML = "Hiscore: " + highscoreval
    }
    scorebox.innerHTML = "Score: " + score
    snakearr.unshift({
      x: snakearr[0].x + inputDir.x,
      y: snakearr[0].y + inputDir.y,
    })
    let a = 2,
      b = 16
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    }
  }
  //move the snake
  for (let i = snakearr.length - 2; i >= 0; i--) {
    snakearr[i + 1] = { ...snakearr[i] }
  }
  snakearr[0].x += inputDir.x
  snakearr[0].y += inputDir.y

  //Part 2-->Display /Render snake and food

  //Display snake
  playarea.innerHTML = ""
  snakearr.forEach((e, index) => {
    snakeElement = document.createElement("div")
    snakeElement.style.gridRowStart = e.y
    snakeElement.style.gridColumnStart = e.x

    if (index === 0) {
      snakeElement.classList.add("head")
    } else {
      snakeElement.classList.add("snake")
    }
    playarea.appendChild(snakeElement)
  })

  //Display food
  foodElement = document.createElement("div")
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add("food")
  playarea.appendChild(foodElement)
}

//main logic behind running the game
let hiscore = localStorage.getItem("hiscore")
if (hiscore === null) {
  highscoreval = 0
  localStorage.setItem("hiscore", JSON.stringify(highscoreval))
} else {
  highscoreval = JSON.parse(hiscore)
  hiscorebox.innerHTML = "HiScore: " + hiscore
}
window.requestAnimationFrame(main)
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }
  switch (e.key) {
    case "ArrowUp":
      console.log("Arrow Up")
      inputDir.x = 0
      inputDir.y = -1
      break
    case "ArrowDown":
      console.log("Arrow Down")
      inputDir.x = 0
      inputDir.y = 1
      break
    case "ArrowLeft":
      console.log("Arrow Left")
      inputDir.x = -1
      inputDir.y = 0
      break
    case "ArrowRight":
      console.log("Arrow Right")
      inputDir.x = 1
      inputDir.y = 0
      break

    default:
      break
  }
})
