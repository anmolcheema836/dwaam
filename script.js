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
    let contactForm = document.querySelector("#contact-form");
    let footSection = document.querySelector("#foot");
    let isHidden = false; // Flag to prevent overlapping hide actions

    function hideButton() {
        if (!isHidden) {
            isHidden = true;
            coffeeButton.style.display = "none";
            // Show the button again after 120 seconds (120,000 ms)
            setTimeout(function () {
                coffeeButton.style.display = "flex"; // Assuming flex was the original display style
                isHidden = false;
            }, 120000);
        }
    }

    // Hide the button on click and scroll to #contact-form
    coffeeButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default anchor behavior
        if (contactForm) {
            contactForm.scrollIntoView({ behavior: "smooth" });
        }
        hideButton();
    });

    // Use IntersectionObserver to detect when #contact-form or #foot is in view
    if (contactForm || footSection) {
        let observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    hideButton();
                }
            });
        });
        if (contactForm) observer.observe(contactForm);
        if (footSection) observer.observe(footSection);
    }
});


function scrollToContact() {
  document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
}