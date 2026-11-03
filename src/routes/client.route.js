import {Router} from "express";
import executeQuery from "../config/db.js";
const router = Router(); 

router.get("/", async (req, res) => {
    const about_company = await executeQuery('SELECT * FROM about_company');
    res.render("userView/index", { about_company: about_company[0] });
});

router.get("/privacy-policy", async (req, res) => {
    const about_company = await executeQuery('SELECT * FROM about_company');
    res.render("userView/privacyPolicy", { about_company: about_company[0] });
});

router.get("/terms-of-service", async (req, res) => {
    const about_company = await executeQuery('SELECT * FROM about_company');
    res.render("userView/termsOfService", { about_company: about_company[0] });
}); 

router.get("/contact-us", async (req, res) => {
    const about_company = await executeQuery('SELECT * FROM about_company');
    res.render("userView/contactUs", { about_company: about_company[0] });
});

router.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;
    const about_company = await executeQuery('SELECT * FROM about_company');
    res.redirect("/contact-us");
});

router.post("/register/:role", async (req, res) => {
    const { phone, email, password } = req.body;
    const role = req.params.role;
    res.json({ success: true, message: "User registered successfully" });
});

router.post("/login/:role", async (req, res) => {
    const { email, password } = req.body;
    const role = req.params.role;
    res.json({ success: true, message: "User logged in successfully" });
});

export default router;