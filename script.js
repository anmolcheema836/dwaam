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

const scroller = document.getElementById('wordScroller');
const words = ["Innovative", "Creative", "Passionate", "Strategic", "Reliable"];
let currentIndex = 0;

// Create four span elements for left, center, right, and next words
const leftSpan = document.createElement('span');
const centerSpan = document.createElement('span');
const rightSpan = document.createElement('span');
const nextSpan = document.createElement('span');

// Add a class for center styling (if desired)
centerSpan.classList.add('center');

// Append spans to container
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
  // Disable transitions for immediate positioning
  leftSpan.style.transition = 'none';
  centerSpan.style.transition = 'none';
  rightSpan.style.transition = 'none';
  nextSpan.style.transition = 'none';
  
  // Set starting positions:
  // - Side words are now scaled down to 0.5 and pushed back in Z axis.
  leftSpan.style.transform = 'translate3d(-150px, 0, -150px) scale(0.5) rotateY(30deg)';
  centerSpan.style.transform = 'translate3d(0, 0, 200px) scale(1.5) rotateY(0deg)';
  rightSpan.style.transform = 'translate3d(150px, 0, -150px) scale(0.5) rotateY(-30deg)';
  nextSpan.style.transform = 'translate3d(300px, 0, -300px) scale(0.5) rotateY(-45deg)';
  
  leftSpan.style.opacity = '0.2';
  centerSpan.style.opacity = '1';
  rightSpan.style.opacity = '0.2';
  nextSpan.style.opacity = '0.2';
}

function animateCycle() {
  // Enable transitions for smooth animation
  leftSpan.style.transition = 'transform 1s, opacity 1s';
  centerSpan.style.transition = 'transform 1s, opacity 1s';
  rightSpan.style.transition = 'transform 1s, opacity 1s';
  nextSpan.style.transition = 'transform 1s, opacity 1s';
  
  // Force reflow to ensure transition starts
  void leftSpan.offsetWidth;
  
  // Animate positions:
  // - leftSpan moves further left off-screen.
  // - centerSpan shifts to become a side word (shrinking to 0.5).
  // - rightSpan becomes the new center (grows to 1.5 and pops out).
  // - nextSpan shifts into the right side position.
  leftSpan.style.transform = 'translate3d(-300px, 0, -300px) scale(0.5) rotateY(30deg)';
  centerSpan.style.transform = 'translate3d(-150px, 0, -150px) scale(0.5) rotateY(30deg)'; // becomes side word
  rightSpan.style.transform = 'translate3d(0, 0, 200px) scale(1.5) rotateY(0deg)';  // new center word
  nextSpan.style.transform = 'translate3d(150px, 0, -150px) scale(0.5) rotateY(-30deg)';
  
  leftSpan.style.opacity = '0';
  centerSpan.style.opacity = '0.2';
  rightSpan.style.opacity = '1';
  nextSpan.style.opacity = '0.2';
  
  // Cycle to the next word after animation
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % words.length;
    updateText();
    resetPositions();
    setTimeout(animateCycle, 500); // brief pause before the next cycle
  }, 1000);
}

// Initialize the scroller
updateText();
resetPositions();
animateCycle();
