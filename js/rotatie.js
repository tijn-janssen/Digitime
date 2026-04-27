const button = document.getElementById("start");
const item1 = document.getElementById("item1");
const item2 = document.getElementById("item2");
const item3 = document.getElementById("item3");
const item4 = document.getElementById("item4");
const header = document.getElementById("header");
const footer = document.getElementById("footer")

header.classList.add("bg-economisch");
footer.classList.add("bg-economisch")
button.addEventListener("click", e => {
    [item1, item2, item3, item4].forEach(item => item.classList.remove("highlight"));
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
    } else if (item2.classList.contains("top")) {
        header.classList.add("bg-sociaal");
    } else if (item3.classList.contains("top")) {
        header.classList.add("bg-cultureel");
    } else if (item4.classList.contains("top")) {
        header.classList.add("bg-politiek");
    }

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
});