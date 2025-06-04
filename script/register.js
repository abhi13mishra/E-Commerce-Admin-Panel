
import { auth, database } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', e => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const role = document.getElementById('role').value;

  if (!role) {
    alert('Please select a role');
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const userId = userCredential.user.uid;

      // Save user info and role in Realtime DB
      db.ref('users/' + userId).set({
        email: email,
        role: role
      });

      alert('Registration successful! Please login.');
      window.location.href = 'login.html';
    })
    .catch(error => {
      alert('Error: ' + error.message);
    });
});