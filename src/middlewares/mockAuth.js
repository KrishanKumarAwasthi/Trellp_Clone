const mockAuth = (req, res, next) => {
  // Assuming a default logged-in user for the Kanban app
  // In a real application, this would verify a JWT or session cookie
  req.user = {
    id: 'default-mock-user-id',
    name: 'Admin User',
  };
  
  next();
};

module.exports = mockAuth;
