const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const userdb = JSON.parse(fs.readFileSync('users.json', 'UTF-8'));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const port = process.env.PORT || 3002;

// Check if the user exists in the database
const isAuthenticated = ({ username, password }) => {
  return (
    userdb.users.findIndex((user) => user.username === username && user.password === password) !==
    -1
  );
};

// Login using username and password
server.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    const status = 400;
    const message = 'Username and password are required';
    res.status(status).json({ isAuthenticated: false, message });
    return;
  }

  if (isAuthenticated({ username, password }) === false) {
    const status = 401;
    const message = 'Incorrect username or password';
    res.status(status).json({ isAuthenticated: false, message });
    return;
  }

  // Authentication successful, you can customize the response as needed
  res.status(200).json({ isAuthenticated: true, message: 'Login successful' });
});

// Logout endpoint
server.post('/auth/logout', (req, res) => {
  // Perform any necessary actions to clear authentication status
  // In this simple example, we don't store sessions or tokens, so nothing needs to be done
  const message = 'Logged out successfully';
  res.status(200).json({ isAuthenticated: false, message });
});

server.use(
  jsonServer.rewriter({
    '/api/*': '/$1'
  })
);
server.use(router);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
