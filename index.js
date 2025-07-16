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
    
    // Navigation function
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

    // Initialize home page
    navigateToPage('home');
    
    // Fetch Services from MockAPI
    async function fetchServices() {
      try {
        const response = await fetch("https://6615df57b8b8e32ffc7c72b4.mockapi.io/api/v1/services");
        if (!response.ok) throw new Error("Failed to fetch services");
        const services = await response.json();
        renderServices(services);
      } catch (error) {
        document.getElementById("services-container").innerHTML = `
          <p class="error">⚠️ Failed to load services. <button onclick="fetchServices()">Retry</button></p>
        `;
      }
    }

    // Render Services Dynamically
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

    // Load services on page load
    document.addEventListener("DOMContentLoaded", fetchServices);