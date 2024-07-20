import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
            return res
                  .status(401)
                  .json({ message: "Access denied. No token provided." });
      }

      try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.user;
            next();
      } catch (error) {
            res.status(401).json({ message: "Invalid token. Please Signin" }); 
      }
};

export default authMiddleware;