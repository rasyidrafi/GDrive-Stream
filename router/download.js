const router = require('express').Router();
const { init } = require('../function');
const { getDrive } = init;

router.get('/', async (req, res) => {
    const drive = getDrive();
    try {
        const { id } = req.query;
        if (!id) return res.status(404).send("id parameter required")
        const { data } = await drive.files.get({ fileId: id, fields: 'name' });
        const { name } = data;
        drive.files.get({ fileId: id, alt: 'media' }, { responseType: "stream" })
            .then(doc => {
                let headers = doc.headers;
                res.set({
                    ...headers,
                    'Content-disposition': 'attachment; filename=' + name
                });
                doc.data.pipe(res)
            })
            .catch(err => {
                res.sendStatus(502).json();
            });
    } catch (error) { res.sendStatus(404).json() }
});

module.exports = router