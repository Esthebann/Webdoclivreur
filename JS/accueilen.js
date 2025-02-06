document.addEventListener("DOMContentLoaded", function() {
  var splash = document.getElementById('splash');
  
  if (sessionStorage.getItem('internalNav') === 'true') {
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
    
    // Redirection vers la page d'accueil anglaise.
    // Adaptez le lien si nécessaire (par exemple, vers "indexen.html")
    setTimeout(() => {
      window.location.href = "indexen.html";
    }, 3000);
  });
  
  document.querySelector(".credit").addEventListener("click", function(event) {
    event.preventDefault();
    sessionStorage.setItem('internalNav', 'true');
    
    // Redirection vers la page des crédits en anglais.
    // Adaptez le lien si nécessaire (par exemple, vers "crediten.html")
    window.location.href = "creditsen.html";
  });
});
