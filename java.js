document.addEventListener("DOMContentLoaded", () => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzNSf8148IYB677rl4QkOc9i8mKMI6NmVyQRs9o-k8S_bt0rrf3Y_1tLf6zdhI1bIj-/exec'; // Replace with your actual script URL
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById("msg");

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            // Sending form data to Google Script
            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => response.json())
                .then(data => {
                    if (data.result === 'success') {
                        msg.innerHTML = 'Message Sent Successfully';
                        msg.style.color = '#4caf50'; // Green for success
                        form.reset(); // Clear the form

                        // Clear message after 5 seconds
                        setTimeout(() => {
                            msg.innerHTML = '';
                        }, 5000);
                    } else {
                        throw new Error(data.error || 'Network response was not ok.'); // Handle errors
                    }
                })
                .catch(error => {
                    console.error("Error!", error.message);
                    msg.innerHTML = 'Failed to send message. Please try again.'; // Display error message
                    msg.style.color = '#f44336'; // Red for errors

                    // Clear error message after 5 seconds
                    setTimeout(() => {
                        msg.innerHTML = '';
                    }, 5000);
                });
        });
    } else {
        console.error("Form not found! Please check the form name in your HTML.");
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const sidemenu = document.getElementById('sidemenu');

    menuIcon.addEventListener('click', () => {
        sidemenu.classList.add('active');
    });

    closeIcon.addEventListener('click', () => {
        sidemenu.classList.remove('active');
    });
});


// Ensure sections align correctly on load and on click
document.addEventListener("DOMContentLoaded", function () {
    const headerHeight = document.querySelector("header").offsetHeight;

    // Adjust scroll position for in-page navigation links
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetPosition = targetElement.offsetTop - headerHeight;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
