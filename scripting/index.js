const boxs = document.getElementsByClassName("box");
const showTurn = document.getElementById("showTurn");
const reset = document.getElementById("reset");
const para = document.getElementById("para");
const line = document.getElementsByClassName("line")[0];

let turn  = "X";
showTurn.textContent = turn;
const changeTurn = ()=>{
    return turn === "X" ? "0" : "X";
}

let winState = false;
let winStatement = "";

let isGameOver = true;
const checkGameOver = ()=>{
    Array.from(boxs).forEach((box)=>{
        if(box.innerHTML === ""){
            isGameOver = false;
        }
    })
    isGameOver ? console.log("game over") : console.log("game not over");
    return isGameOver;
}
const checkWin = ()=>{
    const wins = [
        [0, 1, 2, 143, -72, 90],
        [3, 4, 5, 143, 30, 90],
        [6, 7, 8, 143, 125, 90],
        [0, 3, 6, 47, 25, 0],
        [1, 4, 7, 148, 25, 0],
        [2, 5, 8, 244, 25, 0],
        [2, 4, 6, 146, 31, 45],
        [0, 4, 8, 145, 32, -45],
    ];
    wins.forEach((e)=>{
        if((boxs[e[0]].innerHTML === boxs[e[1]].innerHTML) && (boxs[e[1]].innerHTML === boxs[e[2]].innerHTML) && (boxs[e[0]].innerHTML !==  "")){
            winState = true;
            winStatement = `Congratulations ${boxs[e[0]].innerHTML} won the game! Reset the game to play again.`;
            line.style.height = "230px";
            line.style.width = "3px";
            line.style.transform = `translate(${e[3]}px, ${e[4]}px) rotate(${e[5]}deg)`;
        }
    })
    return winStatement; 
}

Array.from(boxs).forEach((box)=>{
    box.addEventListener("click", ()=>{
        if(box.innerHTML === ""){
            box.innerHTML = turn;
            turn = changeTurn();
            para.innerHTML = `Turn for ${showTurn.textContent = turn}`;
            checkWin();
            checkGameOver();
            if(winState){
                document.getElementById("para").innerHTML = winStatement;
                winState = false;
                winStatement = "";
                const img = document.getElementById("img");
                img.style.width = "150px";
                img.style.height = "200px";
            }
            else if(isGameOver){
                console.log("game over!");
                para.innerHTML = "Game Over! Reset the game to play again.";
                isGameOver = true;
            }
            isGameOver = true;
        }
    })
})


// reset the game;
reset.addEventListener("click", ()=>{
    line.style.height = "0px";
    line.style.width = "0px";
    line.style.transform = "none";
    const img = document.getElementById("img");
    img.style.width = "0px";
    img.style.height = "0px";
    Array.from(boxs).forEach((box)=>{
        box.innerHTML = "";
        turn = "X";
        para.innerHTML = `Turn for ${showTurn.textContent = turn}`;
    })
})
