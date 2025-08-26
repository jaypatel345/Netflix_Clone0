const jwt = require("jsonwebtoken");

function verify(req, res, next) {
    const authHeader = req.headers.token;
    console.log("authHeader:", authHeader); // <== Add this line
  
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      console.log("token:", token); // <== Add this line
  
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          console.error("JWT error:", err.message);
          return res.status(403).json("Token is not valid!");
        }
  
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  }

module.exports = verify;