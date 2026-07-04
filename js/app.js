document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Theme Toggle (LocalStorage & Icons) ---
    const themeBtn = document.getElementById("theme-toggle");
    const moonIcon = document.getElementById("moon-icon");
    const sunIcon = document.getElementById("sun-icon");
    
    // Check saved theme
    if (localStorage.getItem("aroma-theme") === "dark") {
        document.body.classList.add("dark-mode");
        if(moonIcon && sunIcon) {
            moonIcon.classList.add("hidden");
            sunIcon.classList.remove("hidden");
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            
            localStorage.setItem("aroma-theme", isDark ? "dark" : "light");
            
            if(moonIcon && sunIcon) {
                moonIcon.classList.toggle("hidden");
                sunIcon.classList.toggle("hidden");
            }
        });
    }

    // --- 2. Mobile Burger Menu ---
    const burgerMenu = document.querySelector(".burger-menu");
    const navLinks = document.querySelector(".nav-links");

    if (burgerMenu) {
        burgerMenu.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // --- 3. Scroll Animation Observer (Premium touch) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    document.querySelectorAll(".animate-on-scroll").forEach(el => {
        observer.observe(el);
    });

    // --- 4. Fetch API: Menu Generation with FIXED Prices ---
    const menuGrid = document.getElementById("menu-grid");
    const loader = document.getElementById("loader");

    // Real high-quality images
    const coffeeImages = [
        "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80", // Espresso
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80", // Cappuccino
        "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=600&q=80", // Latte
        "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&q=80", // Americano
        "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600&q=80", // Mocha
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80"  // Flat White
    ];

    // Requested Fix: Fixed specific names and prices
    const coffeeNames = ["ესპრესო", "კაპუჩინო", "ლატე", "ამერიკანო", "მოკა", "ფლეთ უაითი"];
    const coffeePrices = ["4.50", "6.00", "6.50", "5.00", "7.50", "8.00"];

    if (menuGrid) {
        fetchMenu();
    }

    async function fetchMenu() {
        try {
            // Simulated fetch request for academic requirement
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            if (!response.ok) throw new Error("მონაცემები ვერ მოიძებნა");
            
            await response.json(); // wait for fake data
            
            // Add a small delay to show off the loader animation
            setTimeout(() => {
                if(loader) loader.style.display = "none";

                for(let i = 0; i < 6; i++) {
                    const card = document.createElement("div");
                    card.classList.add("menu-item", "animate-on-scroll"); // Add animation class
                    
                    card.innerHTML = `
                        <div class="menu-img-wrapper">
                            <img src="${coffeeImages[i]}" alt="${coffeeNames[i]}" class="menu-img">
                        </div>
                        <div class="menu-info">
                            <h3>${coffeeNames[i]}</h3>
                            <span class="menu-price">${coffeePrices[i]} ₾</span>
                        </div>
                    `;
                    menuGrid.appendChild(card);
                    // Observe new element for scroll animation
                    observer.observe(card);
                }
            }, 800);

        } catch (error) {
            console.error(error);
            if(loader) loader.innerHTML = `<p style="color:red">შეცდომა: მენიუს ჩატვირთვა ვერ მოხერხდა.</p>`;
        }
    }

    // --- 5. Premium Form Validation ---
    const bookingForm = document.getElementById("booking-form");

    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            let isValid = true;
            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            
            const nameErr = document.getElementById("err-name");
            const phoneErr = document.getElementById("err-phone");
            
            nameErr.innerText = "";
            phoneErr.innerText = "";

            // Name logic
            if (name.length < 2) {
                nameErr.innerText = "გთხოვთ მიუთითოთ სრული სახელი.";
                isValid = false;
            }

            // Phone logic
            const phoneRegex = /^[0-9\s\-\+]{9,15}$/;
            if (!phoneRegex.test(phone)) {
                phoneErr.innerText = "გთხოვთ მიუთითოთ ვალიდური ნომერი.";
                isValid = false;
            }

            // Success execution
            if (isValid) {
                const successMsg = document.getElementById("success-msg");
                successMsg.classList.remove("hidden");
                bookingForm.reset();
                
                // Remove success message after 4 seconds
                setTimeout(() => {
                    successMsg.classList.add("hidden");
                }, 4000);
            }
        });
    }
});
