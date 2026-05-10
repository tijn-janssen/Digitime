const domeinData = {
    "Economisch": {
        kleur: "bg-economisch",
        hex: "#00adef",
        titel: "Economie: Hoe we overleven en groeien",
        tekst: "Binnen het economische domein draait alles om de middelen van bestaan. Het beschrijft hoe mensen proberen te overleven en rijkdom te vergaren. In de vroege geschiedenis ging dit vooral over landbouw en zelfvoorziening, maar later verschoof de focus naar handel, de opkomst van steden en de industriële revolutie. Het gaat over wat mensen produceren, hoe ze handelen met anderen en hoe geld of ruilmiddelen de wereld veranderen."
    },
    "Sociaal": {
        kleur: "bg-sociaal",
        hex: "#f8e010",
        titel: "Sociaal: De plek van het individu in de groep",
        tekst: "Het sociale domein onderzoekt de opbouw van de samenleving en de onderlinge verhoudingen tussen mensen. Geen enkele samenleving is volledig gelijk; er zijn altijd verschillen in status, rijkdom of afkomst. Dit domein kijkt naar de gelaagdheid van de bevolking (zoals adel, burgers en slaven), de rollen van mannen en vrouwen, en de manier waarop verschillende bevolkingsgroepen met elkaar samenleven of juist met elkaar in conflict komen."
    },
    "Cultureel": {
        kleur: "bg-cultureel",
        hex: "#f7941d",
        titel: "Cultuur: Wat we geloven en maken",
        tekst: "Het culturele domein richt zich op de menselijke geest en expressie. Het gaat over de manier waarop mensen betekenis geven aan hun leven en de wereld om hen heen. Dit omvat religie en geloof in goden, maar ook wetenschappelijke ontdekkingen, filosofische ideeën en kunstvormen zoals architectuur en schilderkunst. Kortom: alles wat mensen denken, geloven en creëren om hun identiteit vorm te geven."
    },
    "Politiek": {
        kleur: "bg-politiek",
        hex: "#e61d8c",
        titel: "Politiek: De strijd om de macht",
        tekst: "Het politieke domein kijkt naar de manier waarop een samenleving wordt bestuurd. Het draait om de vraag wie de macht heeft en hoe die macht wordt gebruikt. Dit kan variëren van een machtige keizer die alles alleen beslist tot een democratie waarin burgers stemrecht hebben. Belangrijke onderwerpen binnen dit domein zijn de vorming van staten, het invoeren van wetten, het voeren van oorlogen om territorium en de strijd voor politieke rechten."
    }
};

const coordinaten = [
    { top: '25%', left: '50%' },
    { top: '50%', left: '75%' },
    { top: '75%', left: '50%' },
    { top: '50%', left: '25%' }
];

function updateContent(domeinId) {
    const data = domeinData[domeinId];
    const header = document.getElementById("header");
    const footer = document.getElementById("footer");
    const hDomein = document.getElementById("headerDomein");
    const tDomein = document.getElementById("textDomein");

    if (data) {
        // 1. Verwijder alle mogelijke oude achtergrondkleuren
        // (Zorg dat je hier alle kleuren uit je domeinData object opsomt)
        const alleKleuren = ["bg-economisch", "bg-sociaal", "bg-cultureel", "bg-politiek"];
        header.classList.remove(...alleKleuren);
        footer.classList.remove(...alleKleuren);

        // 2. Voeg de nieuwe kleur toe (de rest van de klassen blijven staan!)
        header.classList.add(data.kleur);
        footer.classList.add(data.kleur);

        // 3. Update de tekst
        hDomein.innerText = data.titel;
        tDomein.innerText = data.tekst;
    }
}

const bollen = [
    document.getElementById("Economisch"),
    document.getElementById("Cultureel"),
    document.getElementById("Politiek"),
    document.getElementById("Sociaal")
];

let huidigePosities = [0, 1, 2, 3];

bollen.forEach(bol => {
    const data = domeinData[bol.id];
    if (data) {
        bol.style.backgroundColor = data.hex;
    }
});

if (bollen[0]) {
    bollen[0].classList.add("highlight");
    updateContent(bollen[0].id);
}

document.getElementById('start').addEventListener('click', function(e) {
    e.preventDefault();

    const hDomein = document.getElementById("headerDomein");
    const tDomein = document.getElementById("textDomein");

    hDomein.classList.add("fade-out");
    tDomein.classList.add("fade-out");

    const eerste = huidigePosities.shift();
    huidigePosities.push(eerste);

    bollen.forEach((bol, index) => {
        const posIndex = huidigePosities[index];
        const coords = coordinaten[posIndex];

        bol.style.top = coords.top;
        bol.style.left = coords.left;
        bol.classList.remove("highlight");
    });

    setTimeout(() => {
        bollen.forEach((bol, index) => {
            if (huidigePosities[index] === 0) {
                updateContent(bol.id);
                bol.classList.add("highlight");
            }
        });

        hDomein.classList.remove("fade-out");
        tDomein.classList.remove("fade-out");

    }, 300);
});