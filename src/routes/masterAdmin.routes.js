import {Router} from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.render("masterAdmin/index.ejs");
});

export default router;