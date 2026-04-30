const button = document.getElementById("start");
const item1 = document.getElementById("item1");
const item2 = document.getElementById("item2");
const item3 = document.getElementById("item3");
const item4 = document.getElementById("item4");
const header = document.getElementById("header");
const footer = document.getElementById("footer");
const tekstDomein = document.getElementById("textDomein");
const headerDomein = document.getElementById("headerDomein");

header.classList.add("bg-economisch");
footer.classList.add("bg-economisch")
button.addEventListener("click", e => {
    e.preventDefault();

    headerDomein.classList.add("fade-out");
    tekstDomein.classList.add("fade-out");

    [item1, item2, item3, item4].forEach(item => item.classList.remove("highlight"));
    setTimeout(() => {
        let classItem1 = document.getElementById("item1").className;
        let classItem2 = document.getElementById("item2").className;
        let classItem3 = document.getElementById("item3").className;
        let classItem4 = document.getElementById("item4").className;

        item1.classList.remove(classItem1);
        item1.classList.add(classItem3);

        item3.classList.remove(classItem3);
        item3.classList.add(classItem4);

        item4.classList.remove(classItem4);
        item4.classList.add(classItem2);

        item2.classList.remove(classItem2);
        item2.classList.add(classItem1);

        header.classList.remove("bg-economisch", "bg-sociaal", "bg-cultureel", "bg-politiek");
        footer.classList.remove("bg-economisch", "bg-sociaal", "bg-cultureel", "bg-politiek");

        if (item1.classList.contains("top")) {
            header.classList.add("bg-economisch");
            headerDomein.innerText = "Economie: Hoe we overleven en groeien";
            tekstDomein.innerText = "Binnen het economische domein draait alles om de middelen van bestaan. Het beschrijft hoe mensen proberen te overleven en rijkdom te vergaren. In de vroege geschiedenis ging dit vooral over landbouw en zelfvoorziening, maar later verschoof de focus naar handel, de opkomst van steden en de industriële revolutie. Het gaat over wat mensen produceren, hoe ze handelen met anderen en hoe geld of ruilmiddelen de wereld veranderen.";
        } else if (item2.classList.contains("top")) {
            header.classList.add("bg-sociaal");
            headerDomein.innerText = "Sociaal: De plek van het individu in de groep";
            tekstDomein.innerText = "Het sociale domein onderzoekt de opbouw van de samenleving en de onderlinge verhoudingen tussen mensen. Geen enkele samenleving is volledig gelijk; er zijn altijd verschillen in status, rijkdom of afkomst. Dit domein kijkt naar de gelaagdheid van de bevolking (zoals adel, burgers en slaven), de rollen van mannen en vrouwen, en de manier waarop verschillende bevolkingsgroepen met elkaar samenleven of juist met elkaar in conflict komen.";
        } else if (item3.classList.contains("top")) {
            header.classList.add("bg-cultureel");
            headerDomein.innerText = "Cultuur: Wat we geloven en maken";
            tekstDomein.innerText = "Het culturele domein richt zich op de menselijke geest en expressie. Het gaat over de manier waarop mensen betekenis geven aan hun leven en de wereld om hen heen. Dit omvat religie en geloof in goden, maar ook wetenschappelijke ontdekkingen, filosofische ideeën en kunstvormen zoals architectuur en schilderkunst. Kortom: alles wat mensen denken, geloven en creëren om hun identiteit vorm te geven.";
        } else if (item4.classList.contains("top")) {
            header.classList.add("bg-politiek");
            headerDomein.innerText = "Politiek: De strijd om de macht";
            tekstDomein.innerText = "Het politieke domein kijkt naar de manier waarop een samenleving wordt bestuurd. Het draait om de vraag wie de macht heeft en hoe die macht wordt gebruikt. Dit kan variëren van een machtige keizer die alles alleen beslist tot een democratie waarin burgers stemrecht hebben. Belangrijke onderwerpen binnen dit domein zijn de vorming van staten, het invoeren van wetten, het voeren van oorlogen om territorium en de strijd voor politieke rechten.";
        }

        headerDomein.classList.remove("fade-out");
        tekstDomein.classList.remove("fade-out");

        if (item1.classList.contains("top")) {
            footer.classList.add("bg-economisch");
        } else if (item2.classList.contains("top")) {
            footer.classList.add("bg-sociaal");
        } else if (item3.classList.contains("top")) {
            footer.classList.add("bg-cultureel");
        } else if (item4.classList.contains("top")) {
            footer.classList.add("bg-politiek");
        }

        [item1, item2, item3, item4].forEach(item => {
            if (item.classList.contains("top")) {
                item.classList.add("highlight");
            }
        });

        headerDomein.classList.remove("fade-out");
        tekstDomein.classList.remove("fade-out");
    }, 600);
});