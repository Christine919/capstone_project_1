document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const popup = document.getElementById("popup");
    const homeButton = document.getElementById("homeButton");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const data = new URLSearchParams(formData).toString();
  
      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log(result.message); // Optional: log the success message
          popup.classList.remove("hidden");
        } else {
          console.error("Submission failed");
          alert("There was a problem with your submission. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("There was a problem with your submission. Please try again.");
      }
    });
  
    homeButton.addEventListener("click", () => {
      window.location.href = "/"; // Redirect to home page
    });
  });
  