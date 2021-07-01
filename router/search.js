const router = require('express').Router();
const { init } = require('../function');
const { getDrive } = init;

router.get('/', async (req, res) => {
    const drive = getDrive();
    try {
        const { q = "" } = req.query;
        const { data } = await drive.files.list({ q: `name contains '${q}'` });
        res.json(data);
    } catch (error) {
        res.sendStatus(404);
    }
});

module.exports = router