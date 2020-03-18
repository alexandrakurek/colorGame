const cardsColor = ["red","red", "lightpink", "lightpink", "hotpink", "hotpink", "orange", "orange", "yellow", "yellow", "purple", "purple", "green", "green", "aqua", "aqua","blue", "blue"];

let cards = document.querySelectorAll("div");
// console.log(cards instanceof Array); (wyjdzie false)
/*Zamieniamy nodeList na tablicę, bo potrzebujemy więcej metod */
cards = [...cards];
// cards = [div, div, div, div] to są te nasze '...'
// console.log(cards);
// console.log(cards instanceof Array);(wyjdzie true)

const startTime = new Date().getTime();

let activeCard=""; // ta która jest kliknięta
const activeCards = []; // te pary 

const gamePairs = cards.length/2;
let gameResult = 0;


const clickCard = function(){
    console.log("klik");
    activeCard = this;

    //klikanie w ten sam element i żeby on nam nie zniknął. Return powoduje przerwanie funkcji.
    if(activeCard == activeCards[0]){
        return;
    }

    activeCard.classList.remove("hidden"); // usuwamy klasę hidden

    // 1 kliknięcie
    if(activeCards.length === 0){
        activeCards[0] = activeCard;
        return;
    } 
    // 2 kliknięcie - zablokowanie kolejnego kliknięcia + zniknięcie 
    else {
        cards.forEach(card => {
            card.removeEventListener("click", clickCard);
        })
        activeCards[1] = activeCard;

        setTimeout(function(){

        if(activeCards[0].className === activeCards[1].className){
            console.log("wygrałeś");
            activeCards.forEach(card => card.classList.add("off"));
            gameResult++;
            cards = cards.filter(card => !card.classList.contains("off"));

            if(gameResult == gamePairs){
                const endTime = new Date().getTime();
                const gameTime = (endTime - startTime)/1000; // ile czasu graliśmy, wyliczone w s, a nie w ms
                alert(`Udało się! Twój wynik to: ${gameTime} sekund` );
                location.reload();
            }
        } 
            else {
                console.log("przegrana");
                activeCards.forEach(card => card.classList.add("hidden"));
            }
            // po każdych 2 kliknięciach odpowiedź wygrana lub przegrana, a później reset do stanu wyjściowego.
            activeCard ="";
            activeCards.length = 0;
            cards.forEach(card => card.addEventListener("click", clickCard))

        }, 1000);
    }
    
}
const init = function () {
    cards.forEach(function (card) { // card jest naszym divem i losujemy za każdym razem pozycję z tablicy, czyli kolor i na którym divie ma się nam wyświetlić
        const position = Math.floor(Math.random()*cardsColor.length);
        card.classList.add(cardsColor[position]);
        cardsColor.splice(position, 1); // usuń nam 1 element z pozycji 
    })
    setTimeout (function(){
        cards.forEach(function(card){
            card.classList.add("hidden");
            card.addEventListener("click", clickCard);
        })
    }, 2000)
}
init();