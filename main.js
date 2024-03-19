const bowling = {
    "players" : [
        {"nome" : "Antonio", "scores" : [] , "finalScore" : 0 },
        {"nome" : "Giulia", "scores" : [] , "finalScore" : 0},
        {"nome" : "Valeria", "scores" : [] , "finalScore" : 0},
        {"nome" : "Maria", "scores" : [] , "finalScore" : 0},
    ],
    "setScores" : function(){
        if(this.players[0].scores.length < 10){
            this.players.forEach( (giocatore) =>{
                let tiro = Math.round(Math.random()* (10-0)+0)
                if(tiro == 10){
                    let img = document.createElement("img")
                    img.setAttribute("src","https://gifdb.com/images/high/bowling-strike-homer-simpson-kynr6b6caj09atni.webp")
                    img.classList.add("img-strike");
                    document.body.appendChild(img)
                    setTimeout(() => {
                        img.remove()
                    }, 5000);

                }


                    giocatore.scores.push(tiro)
                    giocatore.finalScore = giocatore.scores.reduce( (acc,val)=> acc + val ,0)
            })
        }
    },
    "setWinner": function(){
        this.players.sort( (a, b)=> b.finalScore - a.finalScore )
    },

    "setEquality" : function(){
        this.setWinner()
        if(this.players[0].finalScore === this.players[1].finalScore){
            console.log(`I primi due giocatori ${this.players[0].nome} e ${this.players[1].nome} hanno pareggiato con ${this.players[0].finalScore} punti`);
        }else {
            console.log(`Il VINCITORE è ${this.players[0].nome} con ${this.players[0].finalScore}`);
        }
    },

    "addPlayer" : function(nome){
        this.players.push({"nome" : nome, "scores" :[], "finalScore" : 0})
    },
    "scoreRanking" : function(){
        this.players.forEach( (giocatore)=> {
            console.log(`${giocatore.nome} : ${giocatore.finalScore}`);
        })
    },
    "createTable" : function(){
        playersWrapper.innerHTML = ""
        this.players.forEach( (giocatore , i)=>{
            let tr = document.createElement("tr");
            tr.innerHTML = `
                            <th scope="row">${i+1}</th>
                            <td>${giocatore.nome}</td>
                            <td>${giocatore.scores[0] ? giocatore.scores[0] : 0}</td>
                            <td>${giocatore.scores[1] ? giocatore.scores[1] : 0}</td>
                            <td>${giocatore.scores[2] ? giocatore.scores[2] : 0}</td>
                            <td>${giocatore.scores[3] ? giocatore.scores[3] : 0}</td>
                            <td>${giocatore.scores[4] ? giocatore.scores[4] : 0}</td>
                            <td>${giocatore.scores[5] ? giocatore.scores[5] : 0}</td>
                            <td>${giocatore.scores[6] ? giocatore.scores[6] : 0}</td>
                            <td>${giocatore.scores[7] ? giocatore.scores[7] : 0}</td>
                            <td>${giocatore.scores[8] ? giocatore.scores[8] : 0}</td>
                            <td>${giocatore.scores[9] ? giocatore.scores[9] : 0}</td>
                            <td>${giocatore.finalScore}</td>
                        `
            playersWrapper.appendChild(tr)
        } )
    },
    "setModalResult" : function(){
        modalWinner.innerHTML = `Il vincitore è ${this.players[0].nome}`
        this.players.forEach( (giocatore,i)=>{
            let p = document.createElement("p")
            p.innerHTML = `<p>#${i+1} - ${giocatore.nome}, Punteggio finale : ${giocatore.finalScore}</p>`
            modalBody.appendChild(p)
        } )
    },
    "resetGame" : function (){
        this.players = []
    }
}
/* gioca turno */
let playersWrapper = document.querySelector("#playersWrapper");
bowling.createTable()


/* eventi pulsanti */
let playRound = document.querySelector("#playRound");

playRound.addEventListener("click", ()=>{
    bowling.setScores();
    bowling.createTable()
    if(bowling.players[0].scores.length == 10){
        btnResults.classList.remove("d-none")
    }
})

/* Nuovo giocatore */
let btnNewPlayer = document.querySelector("#btnNewPlayer")
let inputNewPlayer = document.querySelector("#inputNewPlayer")

btnNewPlayer.addEventListener("click" , ()=>{
    bowling.addPlayer(inputNewPlayer.value)
    bowling.createTable()
    inputNewPlayer.value= ""
})

/* classifica */
let modalWinner = document.querySelector("#modalWinner")
let btnResults = document.querySelector("#btnResults")
let modalBody = document.querySelector("#modalBody")

btnResults.addEventListener("click" , ()=>{
    modalBody.innerHTML = ""
    modalWinner.innerHTML = ""
    bowling.setWinner();
    bowling.setModalResult()
})

/* inizia partita */
let btnStart = document.querySelector("#btnStart");

btnStart.addEventListener("click", ()=>{
    btnStart.classList.add("d-none")
    playRound.classList.remove("d-none")
    btnNewPlayer.classList.add("d-none")

})

/* reset */
let btnResetGame = document.querySelector("#btnResetGame");
btnResetGame.addEventListener("click", () => {
    bowling.resetGame();
    bowling.createTable();
    btnNewPlayer.classList.remove("d-none");
    btnStart.classList.remove("d-none");
    playRound.classList.add("d-none");
    btnResults.classList.add("d-none");
})