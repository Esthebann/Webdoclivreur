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
    
    // Redirection vers la page d'accueil espagnole.
    // Adaptez le lien si nécessaire (par exemple, vers "indexesp.html")
    setTimeout(() => {
      window.location.href = "indexes.html";
    }, 3000);
  });
  
  document.querySelector(".credit").addEventListener("click", function(event) {
    event.preventDefault();
    sessionStorage.setItem('internalNav', 'true');
    
    // Redirection vers la page des crédits en espagnol.
    // Adaptez le lien si nécessaire (par exemple, vers "creditesp.html")
    window.location.href = "creditses.html";
  });
});
