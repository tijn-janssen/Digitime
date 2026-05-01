const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const vraagTekstVak = document.getElementById("question-text");
const scoreTekstVak = document.getElementById("score-text");
const startKnop = document.getElementById("start-knop");

canvas.width = 800;
canvas.height = 500;

let spelBezig = false;
let startScore = 0;
let huidigeVraag = 0;

const quizVragen = [
    {q: "Invoering van het algemeen kiesrecht:", options: ["Politiek", "Economisch", "Sociaal", "Cultureel"], correct: 0},
    {q: "Bouw van religieuze kathedralen:", options: ["Politiek", "Economisch", "Sociaal", "Cultureel"], correct: 3},
    {q: "Handelscontacten tussen Europa en Azië:", options: ["Politiek", "Economisch", "Sociaal", "Cultureel"], correct: 1},
    {q: "Strijd om status tussen adel en burgerij:", options: ["Politiek", "Economisch", "Sociaal", "Cultureel"], correct: 2},
    {q: "Wettelijk verbod op kinderarbeid:", options: ["Politiek", "Economisch", "Sociaal", "Cultureel"], correct: 0},
    {q: "Verspreiding van kennis via boekdrukkunst:", options: ["Politiek", "Economisch", "Sociaal", "Cultureel"], correct: 3},
    {q: "Ontstaan van landbouw als bestaansmiddel:", options: ["Politiek", "Economisch", "Sociaal", "Cultureel"], correct: 1},
    {q: "Sociale ongelijkheid tussen slaaf en heer:", options: ["Politiek", "Economisch", "Sociaal", "Cultureel"], correct: 2},
    {q: "Grensoorlog tussen twee staten:", options: ["Politiek", "Economisch", "Sociaal", "Cultureel"], correct: 0},
    {q: "Ontwikkeling van de Griekse filosofie:", options: ["Politiek", "Economisch", "Sociaal", "Cultureel"], correct: 3}
];
// De kleuren van je domeinen met 60% opacity
const poortKleuren = [
    "rgba(226, 183, 68, 0.6)",  // Geel (#E2B744)
    "rgba(1, 175, 235, 0.6)",   // Blauw (#01AFEB)
    "rgba(241, 145, 31, 0.6)",  // Oranje (#F1911F)
    "rgba(179, 6, 95, 0.6)"     // Paars/Rood (#B3065F)
];

let vogel = {
    x: 100,
    y: canvas.height / 2,
    width: 24,
    height: 14,
    velocity: 0,
    gravity: 0.05,
    lift: -2
};

let muur = {
    x: canvas.width,
    width: 120,
    speed: 2,
};

const vraag = () => {
    vraagTekstVak.innerText = quizVragen[huidigeVraag].q;
};

const vlieg = () => {
    if (spelBezig) vogel.velocity = vogel.lift;
};

const resetGame = () => {
    spelBezig = false;
    startKnop.style.display = "block";
    startScore = 0;
    huidigeVraag = 0;
    vogel.y = 300;
    vogel.velocity = 0;
    muur.x = canvas.width;
    muur.speed = 2;
    scoreTekstVak.innerText = "Score: " + startScore;
    vraagTekstVak.innerText = "Klik op START";
};

const update = () => {
    if (!spelBezig) return;

    vogel.velocity += vogel.gravity;
    vogel.y += vogel.velocity;

    if (vogel.y + vogel.height > canvas.height || vogel.y < 0) {
        resetGame();
        return;
    }

    muur.x -= muur.speed;

    if (muur.x < vogel.x + vogel.width && muur.x + muur.width > vogel.x) {
        let vakHoogte = canvas.height / 4;
        let vogelVakIndex = Math.floor((vogel.y + vogel.height / 2) / vakHoogte);

        if (vogelVakIndex !== quizVragen[huidigeVraag].correct) {
            resetGame();
            return;
        }
    }

    if (muur.x + muur.width < 0) {
        muur.x = canvas.width;
        startScore++;
        scoreTekstVak.innerText = "Score: " + startScore;
        huidigeVraag = (huidigeVraag + 1) % quizVragen.length;
        vraag();
        muur.speed += 0.1;
    }
};

const teken = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Teken de vogel
    if (spelBezig) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(vogel.x, vogel.y, vogel.width, vogel.height);
    }

    let vakHoogte = canvas.height / 4;

    for (let i = 0; i < 4; i++) {
        // 1. Teken de poort
        ctx.fillStyle = poortKleuren[i];
        ctx.fillRect(muur.x, i * vakHoogte, muur.width, vakHoogte - 5);

        // 2. Teken de tekst en reset de instellingen specifiek voor deze loop
        ctx.save(); // Sla huidige staat op
        ctx.fillStyle = "white";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        let tekst = quizVragen[huidigeVraag].options[i];
        let middenX = muur.x + (muur.width / 2);
        let middenY = (i * vakHoogte) + (vakHoogte / 2);

        ctx.fillText(tekst, middenX, middenY);
        ctx.restore(); // Herstel staat naar 'normaal' (voorkomt alignment bugs elders)
    }

    update();
    requestAnimationFrame(teken);
};

window.addEventListener("keydown", (e) => {
    if (e.code === "Space") vlieg();
    e.preventDefault();
});

gameCanvas.addEventListener("touchstart", (e) => {
    vlieg();
    e.preventDefault();
}, { passive: false });

startKnop.addEventListener("click", () => {
    spelBezig = true;
    startKnop.style.display = "none";
    vraag();
});

teken();