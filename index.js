// Shopping Cart Logic
let cart = [];

function addToCart(name, price) {
  cart.push({name, price});
  updateCart();
  alert(`${name} added to cart!`);
}

function updateCart() {
  const countElement = document.getElementById('cart-count');
  const itemsContainer = document.getElementById('cart-items');
  const totalElement = document.getElementById('cart-total');
  
  countElement.textContent = cart.length;
  itemsContainer.innerHTML = '';
  
  let total = 0;
  cart.forEach((item, index) => {
    itemsContainer.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>KES ${item.price.toLocaleString()}</span>
        <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#ff5e8e; cursor:pointer;">✕</button>
      </div>
    `;
    total += item.price;
  });
  
  totalElement.textContent = total.toLocaleString();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Checkout Functionality
document.getElementById('checkout-btn').addEventListener('click', () => {
  if(cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  
  const modal = document.getElementById('checkoutModal');
  const orderSummary = document.getElementById('order-summary');
  const cartItemsData = document.getElementById('cart-items-data');
  
  // Build order summary
  let summaryHTML = '<h4 style="color:#9b2e61; margin-top:0;">Your Order:</h4><ul style="padding-left:20px;">';
  cart.forEach(item => {
    summaryHTML += `<li>${item.name} - KES ${item.price.toLocaleString()}</li>`;
  });
  summaryHTML += `</ul><p style="font-weight:bold; margin-bottom:0;">Total: KES ${cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</p>`;
  
  orderSummary.innerHTML = summaryHTML;
  cartItemsData.value = JSON.stringify(cart);
  
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
});

// Navigation function with cart visibility control
function navigateToPage(sectionId) {
  // Update active nav link
  document.querySelectorAll('header nav ul li a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('onclick').includes(sectionId)) {
      link.classList.add('active');
    }
  });
  
  // Hide all sections
  document.querySelectorAll('.section, .hero, #home-cards').forEach(sec => {
    sec.style.display = 'none';
  });
  
  // Show target section
  const target = document.getElementById(sectionId);
  if (target) {
    if (sectionId === 'home') {
      document.querySelector('.hero').style.display = 'flex';
      document.getElementById('home-cards').style.display = 'flex';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      target.style.display = 'block';
      window.scrollTo({
        top: target.offsetTop - 20,
        behavior: 'smooth'
      });
    }
  }
  
  // Show/hide cart based on current page
  const cartContainer = document.getElementById('cart-container');
  if (sectionId === 'products') {
    cartContainer.style.display = 'block';
  } else {
    cartContainer.style.display = 'none';
  }
}

// Modal functions
function openModal(serviceName) {
  document.getElementById('selectedService').value = serviceName;
  document.getElementById('bookingModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.style.display = 'none';
  });
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
  document.querySelectorAll('.modal').forEach(modal => {
    if (event.target == modal) {
      closeModal();
    }
  });
}

// Initialize page on load
document.addEventListener('DOMContentLoaded', function() {
  // Show home page by default
  navigateToPage('home');
  
  // Set home link as active
  document.querySelector('nav ul li a[onclick*="home"]').classList.add('active');
  
  // Initialize cart as hidden
  document.getElementById('cart-container').style.display = 'none';
});

// Fetch Services 
async function fetchProducts() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/Demestrine/PHASE1PROJECT-MORINGA/main/db.json");
    if (!response.ok) throw new Error("Failed to fetch products");
    const data = await response.json();
    

    console.log("Fetched data:", data);
    console.log("Attempting to render products:", data.products?.length || 0); 
    

    if (data.services) renderServices(data.services); // If you have services in JSON
    if (data.products) renderProducts(data.products);
    
  } catch (error) {
    console.error("Fetch error:", error);
    document.getElementById("products-grid").innerHTML = `
      <p class="error">⚠️ Failed to load products. <button onclick="fetchProducts()">Retry</button></p>
    `;
  }
}


// Render Services 
function renderServices(services) {
  const container = document.getElementById("services-container");
  container.innerHTML = services.map(service => `
    <div class="service-card">
      <h3>${service.name}</h3>
      <p>KES ${service.price}</p>
      <p>${service.description || "Professional social media strategy"}</p>
      <button onclick="Calendly.initPopupWidget({url: 'https://calendly.com/demestrine'});">
        Book Now
      </button>
    </div>
  `).join("");
}

// Smooth scrolling for packages on desktop
document.querySelectorAll('.package-card').forEach(card => {
  card.addEventListener('click', function() {
    this.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  });
});