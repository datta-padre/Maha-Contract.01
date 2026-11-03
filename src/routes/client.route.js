import {Router} from "express";
const router = Router(); 

router.get("/", (req, res) => {
    res.render("userView/index");
});

router.get("/privacy-policy", (req, res) => {
    res.render("userView/privacyPolicy");
});

router.get("/terms-of-service", (req, res) => {
    res.render("userView/termsOfService");
}); 

router.get("/contact-us", (req, res) => {
    res.render("userView/contactUs");
});

router.post("/register/:role", (req, res) => {
    const { phone, email, password } = req.body;
    const role = req.params.role;
    res.json({ success: true, message: "User registered successfully" });
});

export default router;