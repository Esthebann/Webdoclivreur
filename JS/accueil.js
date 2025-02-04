document.querySelector(".intro-begin").addEventListener("click", function (event) {
    event.preventDefault();

    // Déclenche l'animation
    document.querySelector(".transition-overlay").style.left = "0";

    // Redirige après l'animation
    setTimeout(() => {
        window.location.href = "index.html";
    }, 800);
});