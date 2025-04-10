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
    
    // Remove any existing "active" classes from all slides
    slides.forEach((slide) => slide.classList.remove("active"));
    // Set the first slide as active
    if (slides.length > 0) {
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



// Array of words to display.
const words = ["Innovative.", "Creative.", "Passionate.", "Strategic.", "Reliable."];
let currentIndex = 0;

// Get the container element.
const container = document.getElementById('wordScroller');

// Function to animate one word.
function animateWord() {
  // Create a new span element for the word.
  const wordElement = document.createElement('span');
  wordElement.classList.add('word');
  wordElement.textContent = words[currentIndex];
  
  // Append it to the container.
  container.appendChild(wordElement);
  
  // Force reflow to ensure the animation restarts correctly.
  void wordElement.offsetWidth;
  
  // Add the animation class.
  wordElement.classList.add('animate');
  
  // When the animation ends, remove the word and schedule the next.
  wordElement.addEventListener('animationend', () => {
    container.removeChild(wordElement);
    
    // Update index, and start the next word immediately.
    currentIndex = (currentIndex + 1) % words.length;
    animateWord();
  });
}

// Start the animation once the DOM is loaded.
document.addEventListener("DOMContentLoaded", animateWord);









  const backToTopBtn = document.getElementById("backToTopBtn");
  const foot = document.getElementById("foot");
  
  window.addEventListener('scroll', () => {
    const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
    
    // show/hide
    backToTopBtn.style.display = (scrolled > 20) ? 'block' : 'none';
  
    // bump up when #foot enters viewport
    const footRect = foot.getBoundingClientRect();
    if (footRect.top <= window.innerHeight) {
      // foot is at or above the bottom of the viewport
      backToTopBtn.style.bottom = '152px';  // 20px + 30px
    } else {
      backToTopBtn.style.bottom = '48px';
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  window.onload = () => {
    const modal = document.getElementById("popupModal");
    modal.style.display = "flex";
  };

  // Close modal on click of close button
  document.getElementById("popupClose").onclick = () => {
    document.getElementById("popupModal").style.display = "none";
  };

  // Close modal if user clicks outside the image
  window.onclick = (event) => {
    const modal = document.getElementById("popupModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
