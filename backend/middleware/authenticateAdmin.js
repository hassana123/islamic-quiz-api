// middleware/authenticateAdmin.js
function authenticateAdmin(req, res, next) {
    const token = req.header("x-auth-token");
  
    // Simple token check for demonstration purposes
    if (!token || token !== "your-secret-admin-token") {
      return res.status(401).json({ message: "Access denied. Unauthorized." });
    }
  
    next();
  }
  
  module.exports = authenticateAdmin;
  