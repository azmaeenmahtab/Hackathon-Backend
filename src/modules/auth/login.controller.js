

// This controller assumes the auth middleware has already verified the token and set req.user

const Login = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    console.log("User data:", req.user);
    return res.json({ message: "Token verified", user: req.user });
};

module.exports = Login;