const header = document.getElementById("eeuwenRekenmachine");
if (header) {
    header.style.setProperty('color', 'white', 'important');
}

document.getElementById('jaarInput').addEventListener('input', function() {
    const jaarInput = this.value;
    const jaar = parseInt(jaarInput);
    const resultBox = document.getElementById('resultaatBox');
    const eeuwOut = document.getElementById('eeuwOutput');
    const tvOut = document.getElementById('tijdvakOutput');
    const uitlegOut = document.getElementById('uitlegRegel');
    const container = document.querySelector('.hist-calc-container');

    const tijdvakKleuren = {
        'tv-pre': '#52251b',
        'tv-ono': '#00455C',
        'tv-oud': '#253562',
        'tv-mid': '#4B6327',
        'tv-vro': '#D4AC0D',
        'tv-mod': '#f06936',
        'tv-eig': '#F34033'
    };

    if (!isNaN(jaar) && jaarInput.length > 0) {
        resultBox.style.display = 'block';
        const absoluutJaar = Math.abs(jaar);
        let eeuw = (absoluutJaar === 0) ? 0 : Math.ceil(absoluutJaar / 100);

        let uitgang = "de";
        if (eeuw === 1 || eeuw === 8 || eeuw >= 20) {
            uitgang = "ste";
        }

        let uitlegZin = "";
        if (absoluutJaar === 0) {
            uitlegZin = "Het jaar 0 bestaat niet in onze tijdrekening.";
        } else if (absoluutJaar % 100 === 0) {
            uitlegZin = `Omdat <b>${absoluutJaar}</b> eindigt op <b>00</b>, zijn de eerste cijfers direct de eeuw.`;
        } else {
            const eersteCijfers = Math.floor(absoluutJaar / 100);
            uitlegZin = `Omdat <b>${absoluutJaar}</b> niet eindigt op 00, neem je de eerste cijfers (<b>${eersteCijfers}</b>) en doe je <b>+ 1</b>.`;
        }

        const suffix = jaar < 0 ? " v.C." : "";
        if (eeuw === 0) {
            eeuwOut.innerHTML = "Oeps!";
        } else {
            eeuwOut.innerHTML = eeuw + `<sup>${uitgang}</sup> eeuw` + suffix;
        }
        uitlegOut.innerHTML = uitlegZin;

        let tv = ""; let cl = "";
        if (jaar < -3299) { tv = "Prehistorie"; cl = "tv-pre"; }
        else if (jaar < -799) { tv = "Oude Nabije Oosten"; cl = "tv-ono"; }
        else if (jaar < 476) { tv = "Klassieke Oudheid"; cl = "tv-oud"; }
        else if (jaar < 1492) { tv = "Middeleeuwen"; cl = "tv-mid"; }
        else if (jaar < 1789) { tv = "Vroegmoderne Tijd"; cl = "tv-vro"; }
        else if (jaar < 1946) { tv = "Moderne Tijd"; cl = "tv-mod"; }
        else { tv = "Hedendaagse Tijd"; cl = "tv-eig"; }

        tvOut.innerText = tv;
        tvOut.className = "hist-tijdvak-badge " + cl;

        const gloedKleur = tijdvakKleuren[cl];
        container.style.setProperty('box-shadow', `0 0 70px 15px ${gloedKleur}99`, 'important');
        container.style.setProperty('border-color', gloedKleur, 'important');
    } else {
        resultBox.style.display = 'none';
        container.style.removeProperty('box-shadow');
        container.style.removeProperty('border-color');
    }
});

document.querySelectorAll('.btn-step').forEach(button => {
    button.addEventListener('click', function() {
        const input = document.getElementById('jaarInput');
        const stap = parseInt(this.getAttribute('data-step'));
        const huidigeWaarde = parseInt(input.value) || 0;
        input.value = huidigeWaarde + stap;
        input.dispatchEvent(new Event('input'));
    });
});

document.getElementById('resetBtn').addEventListener('click', function() {
    const input = document.getElementById('jaarInput');
    input.value = "";
    input.dispatchEvent(new Event('input'));
});