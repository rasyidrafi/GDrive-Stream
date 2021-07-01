const router = require('express').Router();
const { init } = require('../function');
const { auth, tokenBack } = init;

router.get('/', (req, res) => {
  const result = auth();
  if (result.status) return res.render('success');
  else return res.render('code', { url: result.url });
});

router.post('/', async (req, res) => {
  const { code } = req.body
  const submitToken = await tokenBack(code);
  if (submitToken.status) return res.render('success');
  else return res.send("ERROR\n" + submitToken.msg);
})

module.exports = router;