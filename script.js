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
const words = ["Innovative.", "Creative.", "Passionate.", "Strategic.", "Reliable."];
let currentIndex = 0;
const GAP = 10; // Constant gap of 10px between words

// Create four span elements for left, center, right, and next words.
const leftSpan = document.createElement('span');
const centerSpan = document.createElement('span');
const rightSpan = document.createElement('span');
const nextSpan = document.createElement('span');

// Assign opacity classes.
centerSpan.classList.add('center');
leftSpan.classList.add('side');
rightSpan.classList.add('side');
nextSpan.classList.add('side');

// Append spans to container.
scroller.appendChild(leftSpan);
scroller.appendChild(centerSpan);
scroller.appendChild(rightSpan);
scroller.appendChild(nextSpan);

// Update text content for each span.
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

// Reset positions so that the center word is exactly centered.
function resetPositions() {
  // Remove transitions so positions update instantly.
  [leftSpan, centerSpan, rightSpan, nextSpan].forEach(span => {
    span.style.transition = 'none';
  });
  
  // Get container width and compute its horizontal center.
  const containerWidth = scroller.offsetWidth;
  const containerCenter = containerWidth / 2;
  
  // Measure widths.
  const leftWidth = leftSpan.offsetWidth;
  const centerWidth = centerSpan.offsetWidth;
  const rightWidth = rightSpan.offsetWidth;
  
  // Compute left position for the center word so it's centered.
  const centerLeft = containerCenter - centerWidth / 2;
  centerSpan.style.left = centerLeft + 'px';
  
  // Position left word: its right edge is GAP px to the left of center's left edge.
  leftSpan.style.left = (centerLeft - GAP - leftWidth) + 'px';
  
  // Position right word: its left edge is GAP px to the right of center's right edge.
  rightSpan.style.left = (centerLeft + centerWidth + GAP) + 'px';
  
  // Position next word: immediately to the right of right word with GAP px.
  nextSpan.style.left = (parseFloat(rightSpan.style.left) + rightWidth + GAP) + 'px';
  
  // Set opacities.
  leftSpan.style.opacity = '0.5';
  centerSpan.style.opacity = '1';
  rightSpan.style.opacity = '0.5';
  nextSpan.style.opacity = '0.5';
}

// Animate the cycle by shifting all words left by (center word width + GAP) pixels.
function animateCycle() {
  // Calculate shift based on current center word.
  const centerWidth = centerSpan.offsetWidth;
  const shift = centerWidth + GAP;
  
  // Get current left positions.
  const leftPos = parseFloat(leftSpan.style.left);
  const centerPos = parseFloat(centerSpan.style.left);
  const rightPos = parseFloat(rightSpan.style.left);
  const nextPos = parseFloat(nextSpan.style.left);
  
  // Use a transition duration of 1.2s for smooth movement.
  const duration = '1.2s';
  [leftSpan, centerSpan, rightSpan, nextSpan].forEach(span => {
    span.style.transition = `left ${duration}, opacity ${duration}`;
  });
  
  // Shift each word left by the computed shift.
  leftSpan.style.left = (leftPos - shift) + 'px';
  centerSpan.style.left = (centerPos - shift) + 'px';
  rightSpan.style.left = (rightPos - shift) + 'px';
  nextSpan.style.left = (nextPos - shift) + 'px';
  
  // Adjust opacity: as the center word moves out, fade it to side opacity.
  leftSpan.style.opacity = '0';
  centerSpan.style.opacity = '0.5';
  rightSpan.style.opacity = '1'; // the right word becomes the new center
  nextSpan.style.opacity = '0.5';
  
  // When the transition ends, update the text and re-center.
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % words.length;
    updateText();
    resetPositions();
    // Start the next cycle immediately.
    animateCycle();
  }, 1200);
}

// Initialize the scroller.
updateText();
setTimeout(() => {
  resetPositions();
  animateCycle();
}, 100);

  // Wait until the DOM is fully loaded
  document.addEventListener("DOMContentLoaded", function () {
    const popupModal = document.getElementById("popupModal");
    const popupClose = document.getElementById("popupClose");
    const popupImage = document.getElementById("popupImage");

    // Show the modal on page load
    popupModal.classList.add("active");

    // If the close button is clicked, hide the modal
    popupClose.addEventListener("click", function () {
      popupModal.classList.remove("active");
    });

    // When the image is clicked, redirect to bug.html
    popupImage.addEventListener("click", function () {
      window.location.href = "bug.html";
    });

    // Optional: If the user clicks outside the image, close the modal
    popupModal.addEventListener("click", function (e) {
      if (e.target === popupModal) {
        popupModal.classList.remove("active");
      }
    });
  });
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
  