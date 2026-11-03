import {Router} from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.render("masterAdmin/index.ejs");
});

router.get('/about_company', (req, res) => {
  res.render("masterAdmin/about_company.ejs");
});

export default router;