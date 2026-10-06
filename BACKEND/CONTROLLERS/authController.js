const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../MODELS/Users");

// generate jwt

const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        });
};


// register

const register = async (req, res) => {
    try {
        const { name, email, password, securityQuestions, securityAnswers } = req.body;
        if (!name || !email || !password || !securityQuestions || !securityAnswers) {
            return res.status(400).json({
                message: "Name, email, password, securityQuestions and securityAnswers are required"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            })
        }
        if (securityAnswers.trim().length < 2) {
            return res.status(400).json({
                message: "securityAnswers must be at least 2 characters"
            })
        }

        const exitingUser = await User.findOne({
            email: email.toLowerCase(),
        });

        if (exitingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedSecurityAnswers = await bcrypt.hash(securityAnswers, 10);
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            securityQuestions,
            securityAnswers: hashedSecurityAnswers
        });
        const token = generateToken(user._id);
        res.status(201).json({
            message: "Registration successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage,
                // securityQuestions: user.securityQuestions,
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
};


// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }
        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if (!user) {
            return res.status(401).json({
                message: "invalid email and password"
            });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "invalid email or password"
            })
        }
        const token = generateToken(user._id);
        res.status(201).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};


// get profile

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get profile",
            error: error.message,
        });
    }
};


// update profile

const updateProfile = async (req, res) => {
    try {
        const { name, email, profileImage } = req.body;
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        if (name) {
            user.name = name;
        }
        if (email) {
            const exitingUser = await User.findOne({
                email: email.toLowerCase(),
                _id: { $ne: user._id }
            });
            if (exitingUser) {
                return res.status(400).json({
                    message: "Email already in use"
                });
            }
            user.email = email.toLowerCase();
        }
        if (profileImage !== undefined) {
            user.profileImage = profileImage;
        }
        await user.save();
        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update profile",
            error: error.message,
        });
    }
}


// change password
const changePassword = async (req, res) => {
    try {
        const {
            currentPassword, newPassword
        } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: "Current and new password are required"
            });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({
                message: "New password must be at least 6 characters"
            });
        }
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Current password is incorrect"
            });
        }
        user.password = await bcrypt.hash(
            newPassword,
            10
        );
        await user.save();
        res.status(200).json({
            message: "Password Changed Successfully"
        });


    } catch (error) {
        res.status(500).json({
            message: "Failed to change password",
            error: error.message,
        });
    }
};




// start : get security question

const getSecurityQuestions = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }
        const user = await User.findOne({
            email: email.toLowerCase()
        }).select("securityQuestions");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            securityQuestions: user.securityQuestions
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get security question",
            error: error.message
        });
    }
}
// end




// Start: verify security answer
const verifySecurityAnswer = async (req, res) => {
    try {
        const {
            email,
            securityAnswers
        } = req.body;
        if (!email || !securityAnswers) {
            return res.status(400).json({
                message: "Email and security answer are required"
            });
        }
        const user = await User.findOne({
            email: email.toLowerCase()
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const normalizedAnswer =
            securityAnswers.trim().toLowerCase();

        const isAnswerCorrect = await bcrypt.compare
            (securityAnswers.trim().toLowerCase(),
                user.securityAnswers,
            );
        if (!isAnswerCorrect) {
            return res.status(401).json({
                message: "Incorrect security answer"
            });
        }
        res.status(200).json({
            message: "Security answer verified"
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to verify security question",
            error: error.message,
        });
    }
}
// end



// start: reset password
const resetPassword = async (req, res) => {
    try {
        const {
            email,
            securityAnswers,
            newPassword,
            confirmNewPassword
        } = req.body;

        // Check required field

        if (
            !email ||
            !securityAnswers ||
            !newPassword ||
            !confirmNewPassword
        ) {
            return res.status(400).json({
                message: "Email, security answer, new password and confirm password are required"
            });
        }

        // password length validation
        if (newPassword.length < 6) {
            return res.status(400).json({
                message: "New password must be at least 6 characters"
            });
        }

        // confirm password validation
        if (newPassword !== confirmNewPassword) {
            return res.status(404).json({
                message: "New Password and confirm password do not match"
            });
        }

        // find user
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(404).josn({
                message: "User not found"
            });
        }

        // verify security answer
        const isAnswerCorrect = await bcrypt.compare(
            securityAnswers.trim().toLowerCase(), user.securityAnswers
        );
        if (!isAnswerCorrect) {
            return res.status(404).json({
                message: "Incorrect secruity answer"
            });
        }

        // hash new password
        const normalizedSecurityAnswer =
            securityAnswers.trim().toLowerCase();

        const hashedSecurityAnswers =
            await bcrypt.hash(normalizedSecurityAnswer, 10);
        await user.save();

        res.status(200).json({
            message: "Password reset successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to reset password",
            error: error.message,
        });
    }
}
// end




module.exports = {
    register,
    login,
    getProfile,
    updateProfile,
    changePassword,
    verifySecurityAnswer,
    getSecurityQuestions,
    resetPassword

};