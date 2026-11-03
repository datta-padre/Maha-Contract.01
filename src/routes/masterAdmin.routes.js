import {Router} from 'express';
import executeQuery from '../config/db.js';
const router = Router();

router.get('/', async (req, res) => {
  res.render("masterAdmin/index.ejs");
});

router.get('/about_company', async (req, res) => {
  var about_company = await executeQuery('SELECT * FROM about_company');
  res.render("masterAdmin/about_company.ejs", { about_company: about_company[0] });
});

router.post('/save_company', async (req, res) => {
  const { company_name, company_address, company_email, company_mobile, company_whatsapp, instagram, facebook, twitter, linkedin } = req.body;
  await executeQuery(`UPDATE about_company SET company_name = ?, company_address = ?, company_email = ?, company_mobile = ?, company_whatsapp = ?, instagram = ?, facebook = ?, twitter = ?, linkedin = ? WHERE company_id = 1`, [company_name, company_address, company_email, company_mobile, company_whatsapp, instagram, facebook, twitter, linkedin]);
  res.redirect('/masterAdmin/about_company');
}); 

export default router;