const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', e => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      const userId = userCredential.user.uid;

      // Get user role from DB
      db.ref('users/' + userId + '/role').once('value')
        .then(snapshot => {
          const role = snapshot.val();

          if (!role) {
            alert('User role not found.');
            auth.signOut();
            return;
          }

          // Save role in localStorage
          localStorage.setItem('userRole', role);
          localStorage.setItem('userId', userId);

          // Redirect based on role
          if (role === 'admin') {
            window.location.href = 'admin-dashboard.html';
          } else if (role === 'user') {
            window.location.href = 'user-dashboard.html';
          } else {
            alert('Invalid user role.');
          }
        });
    })
    .catch(error => {
      alert('Incorrect email or password!');
    });
});