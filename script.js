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
