    function togglePages() {
      const reg = document.getElementById('registerPage');
      const login = document.getElementById('loginPage');
      reg.style.display = reg.style.display === 'none' ? 'block' : 'none';
      login.style.display = login.style.display === 'none' ? 'block' : 'none';
      document.getElementById('regMessage').innerText = '';
      document.getElementById('loginMessage').innerText = '';
    }

    function register() {
      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const phone = document.getElementById('regPhone').value.trim();
      const dept = document.getElementById('regDept').value.trim();
      const level = document.getElementById('regLevel').value;
      const pass = document.getElementById('regPass').value;
      const pass2 = document.getElementById('regPass2').value;

      if (!name || !email || !phone || !dept || !level || !pass || !pass2) {
        showMessage('regMessage', 'All fields are required!', 'red');
        return;
      }

      if (pass !== pass2) {
        showMessage('regMessage', 'Passwords do not match!', 'red');
        return;
      }

      const user = { name, email, phone, dept, level, pass };
      localStorage.setItem('studentUser', JSON.stringify(user));

      showMessage('regMessage', 'Registration successful! You can now login.', 'green');
      setTimeout(togglePages, 1500);
    }

    function login() {
      const email = document.getElementById('loginEmail').value.trim();
      const pass = document.getElementById('loginPass').value;

      const stored = JSON.parse(localStorage.getItem('studentUser'));

      if (stored && stored.email === email && stored.pass === pass) {
        showDashboard(stored);
      } else {
        showMessage('loginMessage', 'Invalid email or password!', 'red');
      }
    }

    function showMessage(id, message, color) {
      const el = document.getElementById(id);
      el.innerText = message;
      el.style.color = color;
    }

    function showDashboard(user) {
      document.getElementById('registerPage').style.display = 'none';
      document.getElementById('loginPage').style.display = 'none';
      document.getElementById('dashboard').style.display = 'block';
      document.getElementById('dashName').innerText = user.name;
      document.getElementById('dashEmail').innerText = user.email;
      document.getElementById('dashPhone').innerText = user.phone;
      document.getElementById('dashDept').innerText = user.dept;
      document.getElementById('dashLevel').innerText = user.level;
    }

    function logout() {
      document.getElementById('dashboard').style.display = 'none';
      document.getElementById('loginPage').style.display = 'block';
      document.getElementById('loginEmail').value = '';
      document.getElementById('loginPass').value = '';
      showMessage('loginMessage', 'You have been logged out.', 'green');
    }