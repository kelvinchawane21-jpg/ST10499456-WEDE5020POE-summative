/* ==========================================================================
   SKATEMONKEY - PART 3 JAVASCRIPT FUNCTIONALITY
   Module: WEDE5020 (Web Development Introduction)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initButtonInteractions();
    initContactPageResponse();
    initTicketPageSelections();
    initProductCartCounter();
});

/* ==========================================================================
   1. GENERAL BUTTON INTERACTIONS (Interactive Feedback)
   ========================================================================== */
function initButtonInteractions() {
    const allButtons = document.querySelectorAll("button, .submit-btn");
    
    allButtons.forEach(button => {
        button.addEventListener("mousedown", function() {
            this.style.transform = "scale(0.96)";
        });
        button.addEventListener("mouseup", function() {
            this.style.transform = "scale(1)";
        });
        button.addEventListener("mouseleave", function() {
            this.style.transform = "scale(1)";
        });
    });
}

/* ==========================================================================
   2. CONTACT PAGE: "Thank you for the reply"
   ========================================================================== */
function initContactPageResponse() {
    // Detect contact form by checking for the message textarea
    const messageInput = document.getElementById("message");
    const contactForm = document.querySelector(".contact-form");

    if (contactForm && messageInput) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const fullName = document.getElementById("full-name").value.trim();
            if (!fullName) return;

            // Check or create thank you response box
            let responseBox = contactForm.querySelector(".contact-response-msg");
            if (!responseBox) {
                responseBox = document.createElement("div");
                responseBox.className = "contact-response-msg";
                responseBox.style.marginTop = "1rem";
                responseBox.style.padding = "1rem";
                responseBox.style.backgroundColor = "#e8f5e9";
                responseBox.style.color = "#2e7d32";
                responseBox.style.borderRadius = "4px";
                responseBox.style.fontWeight = "bold";
                responseBox.style.textAlign = "center";
                contactForm.appendChild(responseBox);
            }

            responseBox.textContent = `Thank you for the reply, ${fullName}! Your message has been received.`;

            setTimeout(() => {
                contactForm.reset();
            }, 3500);
        });
    }
}

/* ==========================================================================
   3. TICKET PAGE: Ticket Selections & "Thank you for your purchase"
   ================================================= */
function initTicketPageSelections() {
    const eventSelectInput = document.getElementById("event-select");
    const ticketCards = document.querySelectorAll(".product-card");
    const ticketForm = document.querySelector(".contact-form");

    // Interactive ticket selection from event cards
    ticketCards.forEach(card => {
        const buyBtn = card.querySelector("button");
        const titleElement = card.querySelector("h3");
        
        if (buyBtn && titleElement && titleElement.textContent.includes("Pass") || titleElement && titleElement.textContent.includes("Clinic") || titleElement && titleElement.textContent.includes("Exhibition")) {
            buyBtn.addEventListener("click", function() {
                const eventName = titleElement.textContent;
                if (eventSelectInput) {
                    eventSelectInput.value = eventName;
                    // Highlight input to show it was populated
                    eventSelectInput.style.backgroundColor = "#fff3e0";
                    setTimeout(() => {
                        eventSelectInput.style.backgroundColor = "#fff";
                    }, 1000);
                }
                alert(`Selected Ticket: "${eventName}" has been added to your reservation form!`);
            });
        }
    });

    // Ticket Purchase Completion Message
    if (ticketForm && eventSelectInput) {
        ticketForm.addEventListener("submit", function(e) {
            e.preventDefault();

            let purchaseMsg = ticketForm.querySelector(".purchase-success-msg");
            if (!purchaseMsg) {
                purchaseMsg = document.createElement("div");
                purchaseMsg.className = "purchase-success-msg";
                purchaseMsg.style.marginTop = "1rem";
                purchaseMsg.style.padding = "1rem";
                purchaseMsg.style.backgroundColor = "#e3f2fd";
                purchaseMsg.style.color = "#1565c0";
                purchaseMsg.style.borderRadius = "4px";
                purchaseMsg.style.fontWeight = "bold";
                purchaseMsg.style.textAlign = "center";
                ticketForm.appendChild(purchaseMsg);
            }

            purchaseMsg.textContent = "Thank you for your purchase! Your tickets have been successfully booked.";

            setTimeout(() => {
                ticketForm.reset();
            }, 4000);
        });
    }
}

/* ==========================================================================
   4. PRODUCT PAGE: Item Selection Counter (Cart Badge)
   ========================================================================== */
function initProductCartCounter() {
    const productGrid = document.querySelector(".product-grid");
    const navLinks = document.querySelector(".nav-links");

    // Only run if we are on the product page or a page with product cards
    if (productGrid && navLinks) {
        let itemCount = 0;

        // Create a live cart counter badge in the navigation bar dynamically
        let cartBadgeLink = document.getElementById("navCartCounter");
        if (!cartBadgeLink) {
            cartBadgeLink = document.createElement("a");
            cartBadgeLink.id = "navCartCounter";
            cartBadgeLink.href = "#";
            cartBadgeLink.style.backgroundColor = "#ff5722";
            cartBadgeLink.style.color = "#fff";
            cartBadgeLink.style.padding = "0.5rem 0.75rem";
            cartBadgeLink.style.borderRadius = "4px";
            cartBadgeLink.innerHTML = `Cart Items: <span id="cartCountNum">0</span>`;
            navLinks.appendChild(cartBadgeLink);
        }

        const countNumSpan = document.getElementById("cartCountNum");
        const addButtons = productGrid.querySelectorAll(".product-card button");

        addButtons.forEach(button => {
            if (button.textContent.includes("Add to Cart")) {
                button.addEventListener("click", function() {
                    itemCount++;
                    if (countNumSpan) {
                        countNumSpan.textContent = itemCount;
                    }

                    // Button state change interaction
                    const originalText = this.textContent;
                    this.textContent = "Added! ✓";
                    this.style.backgroundColor = "#4caf50";
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.backgroundColor = "#ff5722";
                    }, 1200);
                });
            }
        });
    }
}