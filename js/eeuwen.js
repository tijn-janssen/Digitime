document.getElementById('jaarInput').addEventListener('input', function() {
    const jaarInput = this.value;
    const jaar = parseInt(jaarInput);
    const resultBox = document.getElementById('resultaatBox');
    const eeuwOut = document.getElementById('eeuwOutput');
    const tvOut = document.getElementById('tijdvakOutput');
    const uitlegOut = document.getElementById('uitlegRegel');
    // De hoofdcontainer selecteren voor de schaduw
    const container = document.querySelector('.hist-calc-container');

    // Kleurcodes die matchen met je CSS badges
    const tijdvakKleuren = {
        'tv-pre': '#52251b',
        'tv-ono': '#00455C',
        'tv-oud': '#253562',
        'tv-mid': '#4B6327',
        'tv-vro': '#D4AC0D',
        'tv-mod': '#ffcc80',
        'tv-eig': '#ce93d8'
    };

    if (!isNaN(jaar) && jaarInput.length > 0) {
        resultBox.style.display = 'block';

        const absoluutJaar = Math.abs(jaar);
        let eeuw;
        let uitlegZin = "";

        // --- REKENREGEL ---
        if (absoluutJaar === 0) {
            uitlegZin = "Het jaar 0 bestaat niet in onze tijdrekening.";
            eeuw = 0;
        } else if (absoluutJaar % 100 === 0) {
            eeuw = absoluutJaar / 100;
            uitlegZin = `Omdat <b>${absoluutJaar}</b> eindigt op <b>00</b>, zijn de eerste cijfers direct de eeuw.`;
        } else {
            eeuw = Math.floor(absoluutJaar / 100) + 1;
            const eersteCijfers = Math.floor(absoluutJaar / 100);
            uitlegZin = `Omdat <b>${absoluutJaar}</b> niet eindigt op 00, neem je de eerste cijfers (<b>${eersteCijfers}</b>) en doe je <b>+ 1</b>.`;
        }

        // --- OUTPUT ---
        const suffix = jaar < 0 ? " v.C." : "";
        eeuwOut.innerHTML = eeuw === 0 ? "Oeps!" : eeuw + "<sup>de</sup> eeuw" + suffix;
        uitlegOut.innerHTML = uitlegZin;

        // --- TIJDVAK EN SCHADUW ---
        let tv = ""; let cl = "";
        if (jaar < -3500) { tv = "Prehistorie"; cl = "tv-pre"; }
        else if (jaar < -800) { tv = "Oude Nabije Oosten"; cl = "tv-ono"; }
        else if (jaar < 476) { tv = "Klassieke Oudheid"; cl = "tv-oud"; }
        else if (jaar < 1450) { tv = "Middeleeuwen"; cl = "tv-mid"; }
        else if (jaar < 1750) { tv = "Vroegmoderne Tijd"; cl = "tv-vro"; }
        else if (jaar < 1945) { tv = "Moderne Tijd"; cl = "tv-mod"; }
        else { tv = "Eigentijdse Tijd"; cl = "tv-eig"; }

        tvOut.innerText = tv;
        tvOut.className = "hist-tijdvak-badge " + cl;

        // PAS DE BOX-SHADOW AAN
        const gloedKleur = tijdvakKleuren[cl];
        container.style.setProperty('box-shadow', `0 0 70px 15px ${gloedKleur}99`, 'important');
        container.style.borderColor = gloedKleur;

    } else {
        resultBox.style.display = 'none';
        // Reset schaduw naar standaard als veld leeg is
        container.style.boxShadow = "";
        container.style.borderColor = "";
    }
});