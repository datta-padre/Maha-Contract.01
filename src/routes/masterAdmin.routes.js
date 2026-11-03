import {Router} from 'express';
import executeQuery from '../config/db.js';
const router = Router();

router.get('/', async (req, res) => {
  res.render("masterAdmin/index.ejs");
});

router.get('/about_company', async (req, res) => {
  var about_company = await executeQuery('SELECT * FROM about_company');
  const updated_at = about_company[0].updated_at;
  const formattedDate = new Date(updated_at).toLocaleString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    day: '2-digit',
    month: 'long',
    year: 'numeric'
});

  res.render("masterAdmin/about_company.ejs", { about_company: about_company[0], formattedDate: formattedDate });
});

router.post('/save_company', async (req, res) => {
  const { company_name, company_address, company_email, company_mobile, company_whatsapp, instagram, facebook, twitter, linkedin } = req.body;
  await executeQuery(`UPDATE about_company SET company_name = ?, company_address = ?, company_email = ?, company_mobile = ?, company_whatsapp = ?, instagram = ?, facebook = ?, twitter = ?, linkedin = ? WHERE company_id = 1`, [company_name, company_address, company_email, company_mobile, company_whatsapp, instagram, facebook, twitter, linkedin]);
  res.redirect('/masterAdmin/about_company');
}); 

router.get("/contact_us", async (req, res) => {
  const contact_messages = await executeQuery('SELECT * FROM contact_messages ORDER BY created_at DESC');
  res.render("masterAdmin/contact_us.ejs", { contact_messages });
});

export default router;