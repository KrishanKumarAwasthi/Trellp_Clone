const mockAuth = (req, res, next) => {
 
  req.user = {
    // Fake user added ;)
    id: 'default-mock-user-id',
    name: 'Admin User',
  };
  
  next();
};

module.exports = mockAuth;
