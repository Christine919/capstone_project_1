// contact page
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
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
  
  document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/submissions')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.querySelector('#submissionsTable tbody');
        const noSubmissionsDiv = document.querySelector('#noSubmissions');

        if (data.length === 0) {
          noSubmissionsDiv.style.display = 'block';
        } else {
          noSubmissionsDiv.style.display = 'none';
          data.forEach(submission => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${submission.fname}</td>
              <td>${submission.lname}</td>
              <td>${submission.email}</td>
              <td>${submission.phonenum}</td>
              <td>${submission.inquiry}</td>
              <td>${new Date(submission.inquiry_date).toLocaleString()}</td>
            `;
            tableBody.appendChild(row);
          });
        }
      })
      .catch(error => console.error('Error fetching submissions:', error));
  });

// about page
  document.addEventListener('DOMContentLoaded', function() {
    const sidebarItems = document.querySelectorAll('#accordionSidebar .list-group-item');
    const collapseElements = document.querySelectorAll('.collapse');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetId = item.getAttribute('data-bs-target');
            
            collapseElements.forEach(collapse => {
                if (collapse.id !== targetId && collapse.classList.contains('show')) {
                    new bootstrap.Collapse(collapse, {
                        toggle: false
                    }).hide();
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const listItems = document.querySelectorAll('#accordionSidebar .list-group-item');

  listItems.forEach(item => {
      item.addEventListener('click', function() {
          // Remove active class from all list items
          listItems.forEach(el => el.classList.remove('active'));

          // Add active class to the clicked item
          this.classList.add('active');
      });
  });
});
