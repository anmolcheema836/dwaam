window.addEventListener('scroll', function () {
  const nav = document.querySelector('nav');
  if (window.scrollY > 0) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("#navpart2 a");
  const checkbox = document.getElementById("checkbox");
  const currentUrl = window.location.pathname.split("/").pop(); // Get current page filename

  // Active link detection
  navLinks.forEach(link => {
    const linkUrl = link.getAttribute("href");
    if (linkUrl === currentUrl || (linkUrl === "index.html" && currentUrl === "")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Close menu when clicking a link (on mobile)
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      checkbox.checked = false; // Close menu
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const factsSection = document.querySelector('.Factsaboutus');
  const facts = document.querySelectorAll('.fact h3');

  // Function to trigger the counter animation
  function startCounter(fact) {
    const target = parseInt(fact.getAttribute('data-target'));
    let count = 0;
    const increment = Math.ceil(target / 100);
    function updateCounter() {
      if (count < target) {
        count += increment;
        if (count > target) count = target;
        fact.textContent = count;
        setTimeout(updateCounter, 50);
      } else {
        fact.textContent = target;
      }
    }
    updateCounter();
  }

  // Intersection Observer to detect when the Factsaboutus section is in view
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        facts.forEach(fact => startCounter(fact));
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });
  observer.observe(factsSection);
});

document.addEventListener("DOMContentLoaded", function () {
  // Inject CSS for arrow click animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes arrowClick {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    .animate-arrow {
      animation: arrowClick 0.3s ease-in-out;
    }
  `;
  document.head.appendChild(style);

  // Select all review containers within the Ourteam section
  const reviews = document.querySelectorAll(".Ourteam .review");
  reviews.forEach((review) => {
    const slides = review.querySelectorAll(".slide");
    let currentSlide = 0;
    if (slides.length > 0 && !slides[0].classList.contains("active")) {
      slides[0].classList.add("active");
    }
    const leftArrow = review.querySelector(".arrow.left");
    const rightArrow = review.querySelector(".arrow.right");

    function updateSlide(newIndex) {
      slides[currentSlide].classList.remove("active");
      currentSlide = newIndex;
      slides[currentSlide].classList.add("active");
    }

    function animateArrow(arrow) {
      arrow.classList.add("animate-arrow");
      arrow.addEventListener(
        "animationend",
        function () {
          arrow.classList.remove("animate-arrow");
        },
        { once: true }
      );
    }

    function prevSlide(e) {
      e.preventDefault();
      animateArrow(leftArrow);
      const newIndex = (currentSlide - 1 + slides.length) % slides.length;
      updateSlide(newIndex);
    }

    function nextSlide(e) {
      e.preventDefault();
      animateArrow(rightArrow);
      const newIndex = (currentSlide + 1) % slides.length;
      updateSlide(newIndex);
    }

    leftArrow.addEventListener("click", prevSlide);
    rightArrow.addEventListener("click", nextSlide);
    leftArrow.addEventListener("touchstart", prevSlide);
    rightArrow.addEventListener("touchstart", nextSlide);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let coffeeButton = document.querySelector(".whatsapp-float");

  // Scroll to contact form on button click
  coffeeButton.addEventListener("click", function (event) {
    event.preventDefault();
    const contactForm = document.querySelector("#contact-form");
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: "smooth" });
    }
  });

  // Store the original bottom value of the button
  const originalBottom = window.getComputedStyle(coffeeButton).bottom;
  // Get the image element inside the button
  const buttonImg = coffeeButton.querySelector("img");

  // Observer to adjust the button's bottom position and image when #foot is in view
  const footSection = document.querySelector("#foot");
  if (footSection) {
    const footObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Increase bottom by 100px and change image source
          coffeeButton.style.bottom = `calc(${originalBottom} + 65px)`;
          if (buttonImg) buttonImg.src = "assets/button.png";
        } else {
          // Revert back to the original bottom and image source
          coffeeButton.style.bottom = originalBottom;
          if (buttonImg) buttonImg.src = "assets/ctabutton.png";
        }
      });
    });
    footObserver.observe(footSection);
  }
});

function scrollToContact() {
  document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
}

// Array of words to scroll through
const words = ["Innovative", "Creative", "Strategic", "Reliable", "Passionate"];
const scroller = document.getElementById('wordScroller');
let currentIndex = 0;

// Create four span elements for left, center, right, and next (upcoming) words
const leftSpan = document.createElement('span');
const centerSpan = document.createElement('span');
const rightSpan = document.createElement('span');
const nextSpan = document.createElement('span');

scroller.appendChild(leftSpan);
scroller.appendChild(centerSpan);
scroller.appendChild(rightSpan);
scroller.appendChild(nextSpan);

function updateText() {
  const leftIndex = (currentIndex - 1 + words.length) % words.length;
  const centerIndex = currentIndex;
  const rightIndex = (currentIndex + 1) % words.length;
  const nextIndex = (currentIndex + 2) % words.length;
  
  leftSpan.textContent = words[leftIndex];
  centerSpan.textContent = words[centerIndex];
  rightSpan.textContent = words[rightIndex];
  nextSpan.textContent = words[nextIndex];
}

function resetPositions() {
  leftSpan.style.transition = 'none';
  centerSpan.style.transition = 'none';
  rightSpan.style.transition = 'none';
  nextSpan.style.transition = 'none';
  
  leftSpan.style.transform = 'translateX(-150px)';
  centerSpan.style.transform = 'translateX(0px)';
  rightSpan.style.transform = 'translateX(150px)';
  nextSpan.style.transform = 'translateX(300px)';
  
  leftSpan.style.opacity = '0.2';
  centerSpan.style.opacity = '1';
  rightSpan.style.opacity = '0.2';
  nextSpan.style.opacity = '0.2';
}

function animateCycle() {
  leftSpan.style.transition = 'transform 4s, opacity 4s';
  centerSpan.style.transition = 'transform 4s, opacity 4s';
  rightSpan.style.transition = 'transform 4s, opacity 4s';
  nextSpan.style.transition = 'transform 4s, opacity 4s';
  
  void leftSpan.offsetWidth;
  
  leftSpan.style.transform = 'translateX(-300px)';
  centerSpan.style.transform = 'translateX(-150px)';
  rightSpan.style.transform = 'translateX(0px)';
  nextSpan.style.transform = 'translateX(150px)';
  
  leftSpan.style.opacity = '0';
  centerSpan.style.opacity = '0.2';
  rightSpan.style.opacity = '1';
  nextSpan.style.opacity = '0.2';
  
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % words.length;
    updateText();
    resetPositions();
    setTimeout(animateCycle, 1000);
  }, 4000);
}

updateText();
resetPositions();
animateCycle();
