const {Router} = require('express')
const Link = require('../models/Links')
const router = Router()

router.get('/:code',async (req,res) => {
    try{

        const link = await Link.findOne({code : req.params.code})

        if (link) {
            link.clicks ++
            await link.save()
            return res.redirect(link.from)
        }
        res.status(404).json('Wrong Ссылка...')

    }
    catch (e) {
        res.status(500).json({message: 'Ми бан эн чи, кркин пордзек кич уш' })    }
})


module.exports = router