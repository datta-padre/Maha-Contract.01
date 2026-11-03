import {Router} from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.render("contractor/index.ejs");
});

export default router;