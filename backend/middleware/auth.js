const authorize = (role) => {
    return (req, res, next) => {
        const userRole = req.headers['x-user-role']; // 
        if (userRole === role) {
            next();
        } else {
            res.status(403).json({ message: "Forbidden: You don't have access" });
        }
    };
};
module.exports = authorize;