document.querySelector('.burger-menu').addEventListener('click', function() {
    var navLinks = document.querySelector('.burger-links');
    navLinks.classList.toggle('open');
  
    var content = document.querySelector('.container');
    if (navLinks.classList.contains('open')) {

      content.style.marginTop = '50px';
    } else {
      
      content.style.marginTop = '0';
    }
  });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();


        this.classList.add('active');

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

var lastAnimations = {};
function getRandomAnimation(element) {
    var animations;
    if (element === 'navbar' || element === 'logo' || element === 'nav-links') {
        animations = ['slideInLeft', 'slideInTop'];
    } else {
        animations = ['slideInLeft', 'slideInRight', 'slideInTop', 'slideInBottom'];
    }
    var randomAnimation;
    do {
        randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    } while (randomAnimation === lastAnimations[element]);
    lastAnimations[element] = randomAnimation;
    return randomAnimation;
}

var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            var element = entry.target;
            var animation = getRandomAnimation(element.className);
            element.style.animation = `fadeIn 2s, ${animation} 2s forwards`;
            observer.unobserve(element);
        }
    });
}, {
    threshold: 0
});

window.onload = function() {
  var elements = ['home', 'presentation', 'card', 'portfolio', 'contact', 'navbar', 'logo', 'nav-links'];
  elements.forEach(function(element) {
      var container = document.querySelector('.' + element);
      if (container) {
          observer.observe(container);
      }
  });

  var textarea = document.querySelector('#message');
  var counter = document.querySelector('#counter');

  textarea.addEventListener('input', function() {
      counter.textContent = 'Nombre de caractères : ' + this.value.length + ' / 1000';
  });
}

var mybutton = document.getElementById("back-to-top");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 175 || document.documentElement.scrollTop > 175) {
    mybutton.style.bottom = "100px";
  } else {
    mybutton.style.bottom = "-100px";
  }
}

mybutton.onclick = function() {topFunction()};

function topFunction() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  document.querySelector('form').addEventListener('submit', function(event){
    event.preventDefault();

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "contact.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var response = JSON.parse(this.responseText);
            if (response.error) {
                document.querySelector(".error").textContent = response.error;
                document.querySelector(".error").style.display = "block";
                document.querySelector(".success").style.display = "none";
            } else {
                document.querySelector(".success").textContent = response.success;
                document.querySelector(".success").style.display = "block";
                document.querySelector(".error").style.display = "none";
            }
        }
    }

    xhr.send(new URLSearchParams(new FormData(event.target)).toString());
});

