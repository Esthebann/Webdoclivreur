document.addEventListener("DOMContentLoaded", function() {
  var splash = document.getElementById('splash');
  if(sessionStorage.getItem('internalNav') === 'true'){
    sessionStorage.removeItem('internalNav');
    splash.style.display = 'none';
  } else {
    splash.addEventListener('animationend', function() {
      splash.parentNode.removeChild(splash);
    });
  }
  document.querySelector(".intro-begin").addEventListener("click", function(event) {
    event.preventDefault();
    sessionStorage.setItem('internalNav', 'true');
    var overlay = document.querySelector(".transition-overlay");
    overlay.style.left = "0";
    overlay.classList.add("active");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 3000);
  });
  document.querySelector(".credit").addEventListener("click", function(event) {
    event.preventDefault();
    sessionStorage.setItem('internalNav', 'true');
    window.location.href = "credits.html";
  });
});
