// Handle registration
document.getElementById('register-btn')?.addEventListener('click', function() {
  const username = document.getElementById('register-username');
  const email = document.getElementById('register-email');
  const password = document.getElementById('register-password');

  if (username && email && password && username.value && email.value && password.value) {
      const user = {
          username: username.value,
          email: email.value,
          password: password.value
      };
      localStorage.setItem(username.value, JSON.stringify(user));
      alert('Registration successful! You can now log in and plan your day with SemDue.');
      window.location.href = 'index.html'; 
  } else {
      alert("Please fill in all the sections.");
  }
});

// Handle login
document.getElementById('login-btn')?.addEventListener('click', function() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const storedUser = localStorage.getItem(username);

  // Check if the user exists
  if (storedUser) {
      const user = JSON.parse(storedUser);
      
      // Check if the password matches
      if (user.password === password) {
          alert('Login successful!');
          document.getElementById('auth').style.display = 'none';
          document.getElementById('task').style.display = 'block';
          loadTasks(username);

          // Display today's date
          const today = new Date();
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          document.getElementById('today-date').textContent = today.toLocaleDateString(undefined, options);
      } else {
          alert('Incorrect password. Please try again.');
      }
  } else {
      alert('User not found. Please register first.');
  }
});

// Handle task addition
document.getElementById('add-task-button')?.addEventListener('click', function() {
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  if (taskInput.value) {
      const li = document.createElement('li');
      li.textContent = taskInput.value;

      // Create delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.style.marginLeft = '10px'; // Spacing
      deleteButton.style.backgroundColor = '#dc3545'; // Red for delete
      deleteButton.style.color = 'white';
      deleteButton.style.border = 'none';
      deleteButton.style.borderRadius = '5px';
      deleteButton.style.cursor = 'pointer';

      // Handle delete action
      deleteButton.addEventListener('click', function() {
          taskList.removeChild(li); // Remove the task from the list
          deleteTask(taskInput.value); // Delete the task from local storage
      });

      li.appendChild(deleteButton); // Add delete button to the task item
      taskList.appendChild(li);
      saveTask(taskInput.value); // Save task before clearing input
      taskInput.value = ''; // Clear input after saving
  } else {
      alert("Please enter a task.");
  }
});

// Handle logout
document.getElementById('logout-btn')?.addEventListener('click', function() {
  document.getElementById('auth').style.display = 'block';
  document.getElementById('task').style.display = 'none';
});

// Load tasks from local storage
function loadTasks(username) {
  const tasks = JSON.parse(localStorage.getItem(username + '-tasks')) || [];
  const taskList = document.getElementById('task-list');
  
  tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task;

      // Create delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.style.marginLeft = '10px'; // Spacing
      deleteButton.style.backgroundColor = '#dc3545'; // Red for delete
      deleteButton.style.color = 'white';
      deleteButton.style.border = 'none';
      deleteButton.style.borderRadius = '5px';
      deleteButton.style.cursor = 'pointer';

      // Handle delete action
      deleteButton.addEventListener('click', function() {
          taskList.removeChild(li); // Remove the task from the list
          deleteTask(task); // Delete the task from local storage
      });

      li.appendChild(deleteButton); // Add delete button to the task item
      taskList.appendChild(li);
  });
}

// Save task to local storage
function saveTask(task) {
  const username = document.getElementById('login-username').value;
  const tasks = JSON.parse(localStorage.getItem(username + '-tasks')) || [];
  tasks.push(task);
  localStorage.setItem(username + '-tasks', JSON.stringify(tasks));
}

// Delete task from local storage
function deleteTask(task) {
  const username = document.getElementById('login-username').value;
  let tasks = JSON.parse(localStorage.getItem(username + '-tasks')) || [];
  tasks = tasks.filter(t => t !== task); // Filter out the deleted task
  localStorage.setItem(username + '-tasks', JSON.stringify(tasks));
}

