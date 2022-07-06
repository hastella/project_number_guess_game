// 랜덤번호 지정
// 유저가 번호 입력한다 그리고 go 라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면, 정답입니다!
// 랜덤번호가 < 유저번호, Down!
// 랜덤번호가 > 유저번호, Up!
// Reset 번튼을 누르면 게임이 리셋된다
// 5번의 기회를 다쓰면 게임이 끝난다 (버튼이 disabled)
// 유저가 1-100 범위 밖의 수를 입력하면 알려준다.  기회를 깎지 않는다.
// 유저가 이미 입력한 숫자를 다시 입력하면 알려준다. 기회를 깎지 않는다.

let randomNum = 0
let playButton = document.getElementById("play-btn")    //html document에서 버튼에 지정된 ID로 버튼을 가져오는 코드
let userInput = document.getElementById("user-input")
let resultArea = document.getElementById("result-area")
let resetButton = document.getElementById("reset-btn")
let chances = 5
let gameOver = false
let chanceArea = document.getElementById("chance-area")
let history=[]

playButton.addEventListener("click", play)
// click 말고 mouseover,focus 등 다양한 이벤트가 들어갈 수 있다
// play를 둔것처럼 이벤트 실행시 어떠한 함수를 호출해준다. 함수를 매개변수처럼 넘기는 방법이므로 "play()"가 아닌 "play"로 호출해야 한다.
resetButton.addEventListener("click", reset)
userInput.addEventListener("focus", function(){userInput.value=""})
//userInput창을 누르면 userInput창의 value값을 없애준다
//focus 이벤트는 어떠한 것에 커서를 대거나 클릭하면~
//function(){userInput.value=""} 처럼 이렇게 바로 함수값을 이름없이 지정할수 있는데 이 경우는 다른곳에서 함수가 사용되지 않을 경우 (=이름 지정을 굳이 안해줘도 되는 경우)에만 쓴다.

function pickRandomNum() {
    randomNum = Math.floor(Math.random() * 100) + 1
    // Math.random()은 0-1 사이의 랜덤 수 (1은 포함이 안된다)
    // +1을 해주는 이유는 0-99에서 (Math.random()이 1 이전까지의 수를 반환하기때문) 1-100사이의 수로 범위변경을 해주기 위함.
    console.log("정답", randomNum)
}

function play(){
   let userValue = userInput.value

   if(userValue < 1 || userValue > 100) {
    resultArea.textContent = "1과 100사이의 숫자를 입력해주세요"
    return; //이 if문을 딱 종료시켜주는 역할
   }

   if(history.includes(userValue)) {    //history에 이미 userValue값이 있다면
     resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요."
     return;
   }

   chances--
   chanceArea.textContent = `남은 찬스: ${chances}번`   //정적인 값과 동적인 값은 한번에 쓸때 사용하는 문법!
   console.log("chance", chances)

   if(userValue < randomNum) {
        resultArea.textContent = "Up!"  //text-area에 결과값이 뜨도록 설정해준다.
   } else if (userValue > randomNum) {
        resultArea.textContent = "Down!"
   } else {
        resultArea.textContent = "!정답!"
        gameOver = true
   }

   history.push(userValue) //입력한 값 히스토리 배열에 저장
   console.log(history)

   if(chances < 1){
    gameOver = true
   }

   if(gameOver == true) {
    playButton.disabled = true
   }
}

function reset(){
    //user input창이 깨끗하게 정리된다
    userInput.value = ""
    //새로운 번호가 생성된다
    pickRandomNum()

    resultArea.textContent = "결과값이 여기 나옵니다"
}

pickRandomNum()

