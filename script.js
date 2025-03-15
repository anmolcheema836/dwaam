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

document.addEventListener("DOMContentLoaded", function() {
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
                // When the section is in view, start the counter for each fact
                facts.forEach(fact => startCounter(fact));
                observer.disconnect();  // Stop observing after animation starts
            }
        });
    }, { threshold: 0.5 });  // Trigger when 50% of the section is in view

    // Start observing the Factsaboutus section
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
  
      // Ensure the first slide is active if none is already set
      if (slides.length > 0 && !slides[0].classList.contains("active")) {
        slides[0].classList.add("active");
      }
  
      const leftArrow = review.querySelector(".arrow.left");
      const rightArrow = review.querySelector(".arrow.right");
  
      // Function to update the active slide
      function updateSlide(newIndex) {
        slides[currentSlide].classList.remove("active");
        currentSlide = newIndex;
        slides[currentSlide].classList.add("active");
      }
  
      // Function to add click animation to arrow
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
  
      // Move to the previous slide
      function prevSlide(e) {
        e.preventDefault();
        animateArrow(leftArrow);
        const newIndex = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide(newIndex);
      }
  
      // Move to the next slide
      function nextSlide(e) {
        e.preventDefault();
        animateArrow(rightArrow);
        const newIndex = (currentSlide + 1) % slides.length;
        updateSlide(newIndex);
      }
  
      // Add both click and touchstart event listeners for mobile compatibility
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
        event.preventDefault(); // Prevent default anchor behavior
        const contactForm = document.querySelector("#contact-form");
        if (contactForm) {
            contactForm.scrollIntoView({ behavior: "smooth" });
        }
    });

    // Observer to hide the button when #foot is in view
    const footSection = document.querySelector("#foot");
    if (footSection) {
        const footObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    coffeeButton.style.display = "none";
                    // Show the button again after 5 seconds
                    setTimeout(() => {
                        coffeeButton.style.display = "flex"; // Assuming original display was "flex"
                    }, 2000);
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

// Update the text for each span based on currentIndex
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

// Set the initial positions and opacities instantly (no transition)
function resetPositions() {
  // Remove transitions for an instant reset
  leftSpan.style.transition = 'none';
  centerSpan.style.transition = 'none';
  rightSpan.style.transition = 'none';
  nextSpan.style.transition = 'none';
  
  // Set starting positions:
  // Left word is at -150px, center at 0px, right at 150px, next at 300px.
  leftSpan.style.transform = 'translateX(-150px)';
  centerSpan.style.transform = 'translateX(0px)';
  rightSpan.style.transform = 'translateX(150px)';
  nextSpan.style.transform = 'translateX(300px)';
  
  // Set opacities: center is emphasized, others are less prominent
  leftSpan.style.opacity = '0.2';
  centerSpan.style.opacity = '1';
  rightSpan.style.opacity = '0.2';
  nextSpan.style.opacity = '0.2';
}

// The recursive animation cycle that plays each time a new word comes to center.
function animateCycle() {
  // Set CSS transitions for smooth animation over 4 seconds
  leftSpan.style.transition = 'transform 4s, opacity 4s';
  centerSpan.style.transition = 'transform 4s, opacity 4s';
  rightSpan.style.transition = 'transform 4s, opacity 4s';
  nextSpan.style.transition = 'transform 4s, opacity 4s';
  
  // Force reflow so that the transition styles take effect immediately
  void leftSpan.offsetWidth;
  
  // Animate positions:
  // Left word slides further left: from -150px to -300px.
  // Center word moves left: from 0px to -150px.
  // Right word moves into center: from 150px to 0px.
  // Next word moves into the right position: from 300px to 150px.
  leftSpan.style.transform = 'translateX(-300px)';
  centerSpan.style.transform = 'translateX(-150px)';
  rightSpan.style.transform = 'translateX(0px)';
  nextSpan.style.transform = 'translateX(150px)';
  
  // Animate opacities:
  // Left word fades out from 0.2 to 0.
  // Center word fades out from 1 to 0.2.
  // Right word fades in from 0.2 to 1.
  // Next word stays at 0.2.
  leftSpan.style.opacity = '0';
  centerSpan.style.opacity = '0.2';
  rightSpan.style.opacity = '1';
  nextSpan.style.opacity = '0.2';
  
  // After the 4-second animation...
  setTimeout(() => {
    // Update the current index to move to the next word
    currentIndex = (currentIndex + 1) % words.length;
    updateText();
    
    // Instantly reset positions and opacities for the next cycle
    resetPositions();
    
    // Optionally, wait 1 second before starting the next animation cycle
    setTimeout(animateCycle, 1000);
  }, 4000);
}

// Initial setup: set text and positions, then start the animation cycle.
updateText();
resetPositions();
animateCycle();
