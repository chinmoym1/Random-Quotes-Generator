async function getQuote() {
    try {
        // Always use full backend URL for API to avoid CORS issues with Live Server
        const apiBaseUrl = "http://localhost:3000";
        const response = await fetch(`${apiBaseUrl}/api`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const quote = data.content;
        const author = data.author;

        displayQuote(quote, author);
    } catch (error) {
        console.error("Failed to fetch quote:", error);
        displayError("Failed to load quote. Please try again.");
    }
}

function displayQuote(quote, author) {
    const quoteElement = document.getElementById("quote");
    const authorElement = document.getElementById("author");

    if (quoteElement && authorElement) {
        // Remove animation classes if present
        quoteElement.classList.remove("fadeInText", "swing");
        authorElement.classList.remove("fadeInText", "swing");

        // Update text content
        quoteElement.textContent = quote;
        authorElement.textContent = `- ${author}`;

        // Trigger reflow to restart animation
        void quoteElement.offsetWidth;
        void authorElement.offsetWidth;

        // Add animation classes
        quoteElement.classList.add("fadeInText", "swing");
        authorElement.classList.add("fadeInText", "swing");
    } else {
        console.error("Quote or author element not found.");
    }
}

function displayError(message) {
    const quoteElement = document.getElementById("quote");
    const authorElement = document.getElementById("author");

    if (quoteElement && authorElement) {
        quoteElement.textContent = message;
        authorElement.textContent = "";
    } else {
        console.error("Quote element not found.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const newQuoteButton = document.getElementById("new-quote");
    const quoteContainer = document.getElementById("quote-container");
    if (newQuoteButton && quoteContainer) {
newQuoteButton.addEventListener("click", () => {
    if (!quoteContainer.classList.contains("open") && !quoteContainer.classList.contains("hidden")) {
        // Envelope is closed and visible, fetch quote and open
        getQuote();
        quoteContainer.classList.add("open");
    } else if (quoteContainer.classList.contains("hidden")) {
        // Envelope is hidden, show it and fetch quote
        quoteContainer.classList.remove("hidden");
        getQuote();
        quoteContainer.classList.add("open");
    } else if (quoteContainer.classList.contains("open")) {
        // Envelope is open, close it to prepare for next quote
        quoteContainer.classList.remove("open");
        // Wait for envelope close animation before fetching next quote
        setTimeout(() => {
            getQuote();
            quoteContainer.classList.add("open");
        }, 700);
    }
});

const quoteContent = document.getElementById("quote-content");
quoteContent.addEventListener("transitionend", (event) => {
    if (event.propertyName === "top" && quoteContainer.classList.contains("open")) {
        // Hide the envelope after quote text has moved out fully
        quoteContainer.classList.add("hidden");
        // Remove open class so envelope can be opened again on next click
        quoteContainer.classList.remove("open");
    }
});
    } else {
        console.error("New quote button or quote container not found.");
    }

    getQuote(); // Fetch a quote when the page loads
});






// async function getQuote() {
//   try {
//     const response = await fetch("https://api.quotable.io/random");
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log(data);  // Debugging line to check the API response

//     const quote = data.content;
//     const author = data.author;

//     displayQuote(quote, author);
//   } catch (error) {
//     console.error("Failed to fetch quote:", error);
//     displayError("Failed to load quote. Please try again.");
//   }
// }

// function displayQuote(quote, author) {
//   const quoteElement = document.getElementById("quote");
//   const authorElement = document.getElementById("author");

//   console.log(quoteElement, authorElement);  // Debugging line to ensure elements are found

//   if (quoteElement && authorElement) {
//     quoteElement.textContent = quote;
//     authorElement.textContent = `- ${author}`;
//   } else {
//     console.error("Quote or author element not found.");
//   }
// }

// function displayError(message) {
//   const quoteElement = document.getElementById("quote");
//   const authorElement = document.getElementById("author");

//   console.log(quoteElement, authorElement);  // Debugging line to ensure elements are found

//   if (quoteElement && authorElement) {
//     quoteElement.textContent = message;
//     authorElement.textContent = "";
//   } else {
//     console.error("Quote element not found.");
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const newQuoteButton = document.getElementById("new-quote");
//   if (newQuoteButton) {
//     newQuoteButton.addEventListener("click", getQuote);
//   } else {
//     console.error("New quote button not found.");
//   }

//   getQuote();
// });

