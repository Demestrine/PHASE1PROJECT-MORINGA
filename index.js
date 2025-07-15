// Navigation logic
function navigateToPage(sectionId) {
  // Hide all sections and hero area
  document.querySelectorAll('.section, .hero, #home-cards').forEach(sec => {
    sec.style.display = 'none';
  });

  // Show only the selected section
  const target = document.getElementById(sectionId);
  if (target) {
    if (sectionId === 'home') {
      document.querySelector('.hero').style.display = 'flex';
      document.getElementById('home-cards').style.display = 'flex';
    } else {
      target.style.display = 'block';
    }
  }
}

// Set initial page view to home
navigateToPage('home');

// Example form submission (you can connect this to an actual backend)
document.addEventListener('DOMContentLoaded', function () {
  // Book session form
  const bookButton = document.querySelector('#book button');
  if (bookButton) {
    bookButton.addEventListener('click', function () {
      const name = document.querySelector('#book input[type="text"]').value;
      const email = document.querySelector('#book input[type="email"]').value;
      const phone = document.querySelector('#book input[type="tel"]').value;
      const experience = document.querySelector('#experience').value;
      const budget = document.querySelector('#budget').value;

      if (name && email && phone) {
        alert(
          `Thanks ${name}! We'll get back to you at ${email} within 24 hours.`
        );
      } else {
        alert('Please fill in all required fields.');
      }
    });
  }

  // Contact form
  const contactButton = document.querySelector('#contact button');
  if (contactButton) {
    contactButton.addEventListener('click', function () {
      const name = document.querySelector('#contact input[type="text"]').value;
      const email = document.querySelector('#contact input[type="email"]').value;
      const message = document.querySelector('#contact textarea').value;

      if (name && email && message) {
        alert(`Thank you ${name}, we received your message.`);
      } else {
        alert('Please complete all fields before sending.');
      }
    });
  }

  // Buy Now / Add to Cart buttons (basic example)
  const productButtons = document.querySelectorAll('.product-card button');
  productButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      alert('This feature is coming soon!');
    });
  });
});
