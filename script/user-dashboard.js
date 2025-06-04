const userRoleUser = localStorage.getItem('userRole');

if (userRoleUser !== 'user') {
  window.location.href = 'admin-dashboard.html';
}

// Logout button
document.getElementById('logoutBtn').addEventListener('click', () => {
  auth.signOut().then(() => {
    localStorage.clear();
    window.location.href = 'login.html';
  });
});

const productsContainerUser = document.getElementById('productsContainer');

function loadProductsUser() {
  db.ref('products').on('value', snapshot => {
    productsContainerUser.innerHTML = '';
    const products = snapshot.val();
    if (products) {
      Object.values(products).forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
          <img src="${product.image}" alt="${product.title}" width="100" />
          <h4>${product.title}</h4>
          <p>Price: $${product.price}</p>
        `;
        productsContainerUser.appendChild(div);
      });
    } else {
      productsContainerUser.innerHTML = '<p>No products found.</p>';
    }
  });
}

loadProductsUser();