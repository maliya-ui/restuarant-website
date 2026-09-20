document.addEventListener('DOMContentLoaded', () => {
  const menuGrid = document.getElementById('menu-grid');
  const reservationForm = document.getElementById('reservation-form');
  const contactForm = document.getElementById('contact-form');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    });
  });

  async function loadMenu() {
    try {
      const response = await fetch('/api/menu');
      if (!response.ok) throw new Error('Ma awoodin in menu la soo geliyo');
      const items = await response.json();

      if (!menuGrid) return;

      menuGrid.innerHTML = items
        .map(
          (item) => `
            <article class="menu-card">
              <img src="${item.image}" alt="${item.name}" />
              <div class="menu-card-body">
                <div class="menu-card-header">
                  <h3>${item.name}</h3>
                  <span>$${Number(item.price).toFixed(2)}</span>
                </div>
                <p class="menu-category">${item.category}</p>
                <p>${item.description}</p>
              </div>
            </article>
          `
        )
        .join('');
    } catch (error) {
      console.error(error);
      if (menuGrid) {
        menuGrid.innerHTML = '<p class="error-message">Menu hadda lama heli karo. Fadlan soo booqo mar dambe.</p>';
      }
    }
  }

  if (reservationForm) {
    reservationForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const submitButton = reservationForm.querySelector('button[type="submit"]');
      const status = document.getElementById('reservation-status');

      submitButton.disabled = true;
      submitButton.textContent = 'Diraya...';

      const payload = Object.fromEntries(new FormData(reservationForm).entries());

      try {
        const response = await fetch('/api/reservation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Bookhadhku wuu fashilmay');

        status.textContent = result.message;
        status.className = 'form-status success';
        reservationForm.reset();
      } catch (error) {
        status.textContent = error.message;
        status.className = 'form-status error';
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Meesha xaajiso';
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const status = document.getElementById('contact-status');

      submitButton.disabled = true;
      submitButton.textContent = 'Diraya...';

      const payload = Object.fromEntries(new FormData(contactForm).entries());

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Fariinta way fashiltay');

        status.textContent = result.message;
        status.className = 'form-status success';
        contactForm.reset();
      } catch (error) {
        status.textContent = error.message;
        status.className = 'form-status error';
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Dir fariin';
      }
    });
  }

  loadMenu();
});
