import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
    res.render("houseowner/index");
});

router.get("/post_tender", (req, res) => {
    res.render("houseowner/post_tender");
});

router.get("/view_tenders", (req, res) => {
    res.render("houseowner/view_tenders");
});

export default router;