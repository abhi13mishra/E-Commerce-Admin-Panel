const userRole = localStorage.getItem('userRole');

if (userRole !== 'admin') {
  window.location.href = 'user-dashboard.html';
}

// Logout button
document.getElementById('logoutBtn').addEventListener('click', () => {
  auth.signOut().then(() => {
    localStorage.clear();
    window.location.href = 'login.html';
  });
});

const productsContainer = document.getElementById('productsContainer');
const addProductForm = document.getElementById('addProductForm');

// Load products from DB 
function loadProducts() {
  db.ref('products').on('value', snapshot => {
    productsContainer.innerHTML = ''; // clear
    const products = snapshot.val();
    if (products) {
      Object.entries(products).forEach(([id, product]) => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
          <img src="${product.image}" alt="${product.title}" width="100" />
          <h4>${product.title}</h4>
          <p>Price: $${product.price}</p>
          <button onclick="editProduct('${id}', '${product.title}', ${product.price}, '${product.image}')">Edit</button>
          <button onclick="deleteProduct('${id}')">Delete</button>
        `;
        productsContainer.appendChild(div);
      });
    } else {
      productsContainer.innerHTML = '<p>No products found.</p>';
    }
  });
}

loadProducts();

addProductForm.addEventListener('submit', e => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const price = Number(document.getElementById('price').value);
  const image = document.getElementById('image').value.trim();

  const newProductRef = db.ref('products').push();
  newProductRef.set({
    title,
    price,
    image
  })
  .then(() => {
    alert('Product added!');
    addProductForm.reset();
  })
  .catch(err => {
    alert('Error adding product: ' + err.message);
  });
});

window.editProduct = function(id, currentTitle, currentPrice, currentImage) {
  const newTitle = prompt('Edit Title:', currentTitle);
  const newPrice = prompt('Edit Price:', currentPrice);
  const newImage = prompt('Edit Image URL:', currentImage);

  if(newTitle && newPrice && newImage) {
    db.ref('products/' + id).update({
      title: newTitle,
      price: Number(newPrice),
      image: newImage
    })
    .then(() => alert('Product updated!'))
    .catch(err => alert('Error updating product: ' + err.message));
  }
};

window.deleteProduct = function(id) {
  if(confirm('Are you sure to delete this product?')) {
    db.ref('products/' + id).remove()
    .then(() => alert('Product deleted!'))
    .catch(err => alert('Error deleting product: ' + err.message));
  }
};