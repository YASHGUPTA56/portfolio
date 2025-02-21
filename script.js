const navs = document.querySelectorAll('.nav-list li');
const cube = document.querySelector('.box');
const sections = document.querySelectorAll('.section');

const resumeList = document.querySelectorAll('.resume-list');
const resumeBoxs = document.querySelectorAll('.resume-box');

const portfolioList = document.querySelectorAll('.portfolio-list');
const portfolioBoxs = document.querySelectorAll('.portfolio-box');

const contactList = document.querySelectorAll('.contact-list'); // Added for Contact Section
const contactBoxs = document.querySelectorAll('.contact-box'); // Added for Contact Section

// Navbar actions and cube rotation when navbar is clicked
navs.forEach((nav, idx) => {
    nav.addEventListener('click', () => {
        console.log(idx);
        
        const activeNav = document.querySelector('.nav-list li.active');
        if (activeNav) activeNav.classList.remove('active');

        nav.classList.add('active');
        // Rotate the cube to show the corresponding section
        cube.style.transform = `rotateY(${idx * -90}deg)`;

        document.querySelector('.section.active').classList.remove('active');
        sections[idx].classList.add('active');

        const array = Array.from(sections);
        const arrSecs = array.slice(1, -1);
        arrSecs.forEach(arrSec => {
            if (arrSec.classList.contains('active')) {
                sections[4].classList.add('action-contact');
            }
        });
        if (sections[0].classList.contains('active')) {
            sections[4].classList.remove('action-contact')
        }
    });
});

// Resume section: When clicking tab-list, show the corresponding box
resumeList.forEach((list, idx) => {
    list.addEventListener('click', () => {
        const activeResumeList = document.querySelector('.resume-list.active');
        if (activeResumeList) activeResumeList.classList.remove('active');

        list.classList.add('active');

        const activeResumeBox = document.querySelector('.resume-box.active');
        if (activeResumeBox) activeResumeBox.classList.remove('active');

        resumeBoxs[idx].classList.add('active');
    });
});

// Portfolio section: When clicking tab-list, show the corresponding box
portfolioList.forEach((list, idx) => {
    list.addEventListener('click', () => {
        const activePortfolioList = document.querySelector('.portfolio-list.active');
        if (activePortfolioList) activePortfolioList.classList.remove('active');

        list.classList.add('active');

        const activePortfolioBox = document.querySelector('.portfolio-box.active');
        if (activePortfolioBox) activePortfolioBox.classList.remove('active');

        portfolioBoxs[idx].classList.add('active');
    });
});

// Contact section: When clicking tab-list, show the corresponding box
contactList.forEach((list, idx) => {  // Fixed selector
    list.addEventListener('click', () => {
        const activeContactList = document.querySelector('.contact-list.active');
        if (activeContactList) activeContactList.classList.remove('active');

        list.classList.add('active');

        const activeContactBox = document.querySelector('.contact-box.active');
        if (activeContactBox) activeContactBox.classList.remove('active');

        contactBoxs[idx].classList.add('active');  // Fixed array reference
    });
});

// Ensure the contact section is visible on page reload (optional)
window.addEventListener('load', () => {
    cube.classList.add('no-animation'); // Prevent rotation on load
});



document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
    const statusMessage = document.getElementById("status-message");

    // Simple validation
    if (!name || !email || !phone || !subject || !message) {
        statusMessage.innerText = "Please fill in all fields!";
        return;
    }

    // Send data to PHP file using Fetch API
    fetch("send.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(message)}`
    })
    .then(response => response.text())
    .then(data => {
        statusMessage.innerText = data;
        document.getElementById("contact-form").reset(); // Clear the form
    })
    .catch(error => {
        console.error("Error:", error);
        statusMessage.innerText = "Failed to send message!";
    });
});
