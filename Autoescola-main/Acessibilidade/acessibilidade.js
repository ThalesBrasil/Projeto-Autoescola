document.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.querySelector('header').classList.add('dark-mode');
        document.querySelector('nav').classList.add('dark-mode');
        document.querySelector('footer').classList.add('dark-mode');
        document.getElementById('modo-escuro-btn').textContent = 'Modo Claro';
    }

    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        document.body.style.fontSize = savedFontSize + 'px';
        fontSize = parseInt(savedFontSize);
    }
});

document.getElementById('modo-escuro-btn').addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelector('nav').classList.toggle('dark-mode');
    document.querySelector('footer').classList.toggle('dark-mode');

    const btn = document.getElementById('modo-escuro-btn');
    btn.textContent = isDarkMode ? 'Modo Claro' : 'Modo Escuro';
    localStorage.setItem('darkMode', isDarkMode); 
});

let fontSize = 16;

document.getElementById('aumentar-fonte-btn').addEventListener('click', () => {
    fontSize += 2;
    document.body.style.fontSize = fontSize + 'px';
    localStorage.setItem('fontSize', fontSize);
});

document.getElementById('diminuir-fonte-btn').addEventListener('click', () => {
    if (fontSize > 12) {
        fontSize -= 2;
        document.body.style.fontSize = fontSize + 'px';
        localStorage.setItem('fontSize', fontSize); 
    }
});