const toggleSwitch = document.getElementById('darkModeLightMode');
const lightModeKnop = document.getElementById('lightMode');
const darkModeKnop = document.getElementById('darkMode');

const storageKey = 'darkModeLightMode';

lightModeKnop.style.display = 'none';
document.body.classList.add('no-transition');

if (localStorage.getItem(storageKey) === 'dark') {
    document.body.style.backgroundColor = '#272727';
    document.body.style.color = 'white';
    document.body.classList.add('dark-mode');

    darkModeKnop.style.display = 'none';
    lightModeKnop.style.display = 'inline-block';
    toggleSwitch.checked = true;
} else {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = '#272727';
    document.body.classList.remove('dark-mode');

    lightModeKnop.style.display = 'none';
    darkModeKnop.style.display = 'inline-block';
    toggleSwitch.checked = false;
}

toggleSwitch.addEventListener('change', function() {
    document.body.classList.remove('no-transition');

    if (this.checked) {
        // Schakel naar DARK
        document.body.style.backgroundColor = '#272727';
        document.body.style.color = 'white';
        document.body.classList.add('dark-mode');

        darkModeKnop.style.display = 'none';
        lightModeKnop.style.display = 'inline-block';
        localStorage.setItem(storageKey, 'dark');
    } else {
        // Schakel naar LIGHT
        document.body.style.backgroundColor = 'white';
        document.body.style.color = '#272727';
        document.body.classList.remove('dark-mode');

        lightModeKnop.style.display = 'none';
        darkModeKnop.style.display = 'inline-block';
        localStorage.setItem(storageKey, 'light');
    }
});

setTimeout(function() {
    document.body.classList.remove('no-transition');
}, 50);