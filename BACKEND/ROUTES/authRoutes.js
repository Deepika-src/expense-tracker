const express = require("express");

const {
    register,
    login,
    getProfile,
    changePassword,
    updateProfile,
    verifySecurityAnswer,
    getSecurityQuestions,
    resetPassword
} = require("../CONTROLLERS/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ==============================
// PUBLIC AUTH ROUTES
// ==============================

router.post("/register", register);

router.post("/login", login);


// ==============================
// FORGOT PASSWORD
// ==============================

router.post(
    "/forgot-password/question",
    getSecurityQuestions
);

router.post(
    "/forgot-password/verify",
    verifySecurityAnswer
);

router.post(
    "/reset-password",
    resetPassword
);


// ==============================
// PROTECTED ROUTES
// ==============================

router.get(
    "/profile",
    protect,
    getProfile
);

router.put(
    "/profile",
    protect,
    updateProfile
);

router.put(
    "/change-password",
    protect,
    changePassword
);


module.exports = router;

























// const express = require("express");
// const {
//     register,
//     login,
//     getProfile,
//     changePassword,
//     updateProfile,
//     verifySecurityAnswer,
//     getSecurityQuestions,
//     resetPassword

// } = require("../CONTROLLERS/authController")

// const protect = require("../middleware/authMiddleware");

// const router = express.Router();

// // Public route
// router.post('/register', register);
// router.post('/login', login);

// // forget password
// router.post("/forgot-password/question",
//     getSecurityQuestions
// );
// router.post("/forgot-password/verify",
//     verifySecurityAnswer
// )

// router.post("/forgot-password/reset/",
//     resetPassword
// )



// // same url and same method is not used 





// // FORGET PASSWORD

// router.post('/register', register);
// router.post



// // PROTECTED ROUTES
// router.get('/profile', protect, getProfile);
// router.put('/profile', protect, updateProfile);
// router.put('/change-password', protect, changePassword);




// module.exports = router;