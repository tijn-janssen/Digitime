const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const vraagTekstVak = document.getElementById("question-text");
const scoreTekstVak = document.getElementById("score-text");
const startKnop = document.getElementById("start-knop");

const pasCanvasAan = () => {
    if (window.innerWidth <= 600) {
        // Mobiele weergave: verticaal (portrait)
        canvas.width = 500;
        canvas.height = 800;
    } else {
        // Laptop/desktop weergave: horizontaal (landscape)
        canvas.width = 800;
        canvas.height = 500;
    }
};

pasCanvasAan();

let spelBezig = false;
let startScore = 0;

// Laad de sprite afbeeldingen in
const imgOmhoog = new Image();
imgOmhoog.src = "../fotos/omhoog.png";

const imgOmlaag = new Image();
imgOmlaag.src = "../fotos/omlaag.png";

const quizVragen = [
    {
        q: "Invoering van het algemeen kiesrecht:",
        options: ["Politiek", "Economisch", "Sociaal", "Cultureel"],
        correct: 0
    },
    {q: "Bouw van religieuze kathedralen:", options: ["Politiek", "Economisch", "Sociaal", "Cultureel"], correct: 3},
    {
        q: "Handelscontacten tussen Europa en Azië:",
        options: ["Politiek", "Economisch", "Sociaal", "Cultureel"],
        correct: 1
    },
    {
        q: "Strijd om status tussen adel en burgerij:",
        options: ["Politiek", "Economisch", "Sociaal", "Cultureel"],
        correct: 2
    },
    {q: "Wettelijk verbod op kinderarbeid:", options: ["Politiek", "Economisch", "Sociaal", "Cultureel"], correct: 0},
    {
        q: "Verspreiding van kennis via boekdrukkunst:",
        options: ["Politiek", "Economisch", "Sociaal", "Cultureel"],
        correct: 3
    },
    {
        q: "Ontstaan van landbouw als bestaansmiddel:",
        options: ["Politiek", "Economisch", "Sociaal", "Cultureel"],
        correct: 1
    },
    {
        q: "Sociale ongelijkheid tussen slaaf en heer:",
        options: ["Politiek", "Economisch", "Sociaal", "Cultureel"],
        correct: 2
    },
    {q: "Grensoorlog tussen twee staten:", options: ["Politiek", "Economisch", "Sociaal", "Cultureel"], correct: 0},
    {
        q: "Ontwikkeling van de Griekse filosofie:",
        options: ["Politiek", "Economisch", "Sociaal", "Cultureel"],
        correct: 3
    }
];

const poortKleuren = [
    "#E2B744",  // Geel
    "#01AFEB",  // Blauw
    "#F1911F",  // Oranje
    "#B3065F"   // Paars/Rood
];

let vogel = {
    x: 100,
    y: canvas.height / 2,
    get width() {
        return (canvas.width <= 600) ? 70 : 55;
    },
    get height() {
        return (canvas.width <= 600) ? 70 : 55;
    },
    velocity: 0,
    get gravity() {
        return (canvas.width <= 600) ? 0.1 : 0.05;
    },
    get lift() {
        return (canvas.width <= 600) ? -4 : -2;
    }
};

let muren = [];

const initMuren = () => {
    muren = [];
    let afstand = 750;
    for (let i = 0; i < 3; i++) {
        muren.push({
            x: canvas.width + i * afstand,
            width: 120,
            speed: 2,
            vraagIndex: i % quizVragen.length,
            passed: false // Houdt bij of de vogel de muur al gepasseerd is
        });
    }
};

const vraag = (index) => {
    vraagTekstVak.innerText = quizVragen[index].q;
};

const vlieg = () => {
    if (spelBezig) vogel.velocity = vogel.lift;
};

const resetGame = () => {
    spelBezig = false;
    startKnop.style.display = "block";
    startScore = 0;
    vogel.y = canvas.height / 2;
    vogel.velocity = 0;
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

    for (let i = muren.length - 1; i >= 0; i--) {
        let muur = muren[i];
        muur.x -= muur.speed;

        // 1. Check direct wanneer de vogel de pilaar passeert
        if (!muur.passed && muur.x + muur.width < vogel.x) {
            muur.passed = true;

            startScore++;
            scoreTekstVak.innerText = "Score: " + startScore;

            // Laat meteen de vraag zien van de eerstvolgende pilaar
            if (i === 0 && muren.length > 1) {
                vraag(muren[1].vraagIndex);
            }
        }

        // Botsing detectie
        if (muur.x < vogel.x + vogel.width && muur.x + muur.width > vogel.x) {
            let vakHoogte = canvas.height / 4;
            let vogelVakIndex = Math.floor((vogel.y + vogel.height / 2) / vakHoogte);

            if (vogelVakIndex !== quizVragen[muur.vraagIndex].correct) {
                resetGame();
                return;
            }
        }

        // 2. Wanneer de muur volledig buiten beeld is, reset en voeg een nieuwe toe
        if (muur.x + muur.width < 0) {
            muren.shift();

            let laatsteMuur = muren[muren.length - 1];
            let nieuweIndex = (laatsteMuur.vraagIndex + 1) % quizVragen.length;

            muren.push({
                x: laatsteMuur.x + 750,
                width: 120,
                speed: laatsteMuur.speed + 0.05,
                vraagIndex: nieuweIndex,
                passed: false
            });
        }
    }
};

const teken = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const imgAchtergrond = new Image();
    imgAchtergrond.src = (canvas.width <= 600) ? "../fotos/gameHeaderMobile.png" : "../fotos/gameHeader.png";
    if (!spelBezig) {
        ctx.drawImage(imgAchtergrond, 0, 0, canvas.width, canvas.height);
    }

    // Muren tekenen op de achtergrond
    if (spelBezig) {
        for (let i = 0; i < muren.length; i++) {
            let muur = muren[i];
            let vakHoogte = canvas.height / 4;

            for (let j = 0; j < 4; j++) {
                ctx.fillStyle = poortKleuren[j];
                ctx.fillRect(muur.x, j * vakHoogte, muur.width, vakHoogte);

                ctx.save();
                ctx.fillStyle = "white";
                ctx.font = (canvas.width <= 600) ? "bold 20px Arial" : "bold 16px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                let tekst = quizVragen[muur.vraagIndex].options[j];
                let middenX = muur.x + (muur.width / 2);
                let middenY = (j * vakHoogte) + (vakHoogte / 2);

                ctx.fillText(tekst, middenX, middenY);
                ctx.restore();
            }
        }
    }

    // Het poppetje tekenen op de voorgrond
    if (spelBezig) {
        // Controleer of we stijgen (negatieve velocity) of dalen
        if (vogel.velocity < 0) {
            ctx.drawImage(imgOmhoog, vogel.x, vogel.y, vogel.width, vogel.height);
        } else {
            ctx.drawImage(imgOmlaag, vogel.x, vogel.y, vogel.width, vogel.height);
        }
    }

    update();
    requestAnimationFrame(teken);
};

window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        vlieg();
        e.preventDefault();
    }
});

canvas.addEventListener("touchstart", (e) => {
    vlieg();
    e.preventDefault();
}, {passive: false});

window.addEventListener("resize", () => {
    pasCanvasAan();
});

startKnop.addEventListener("click", () => {
    spelBezig = true;
    startKnop.style.display = "none";
    initMuren();
    vraag(muren[0].vraagIndex);
});

// Start de loop
teken();