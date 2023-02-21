const router = require('express').Router();

router.get('/test', (req, res) => {
  res.send('hey from api/test');
});

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
