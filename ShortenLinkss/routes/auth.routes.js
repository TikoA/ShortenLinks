const {Router} = require('express')
const router = Router()
const config = require('config')
const {check, validationResult} =  require('express-validator')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
router.post(
    '/register',
    [
        check('email', 'Не валидный email').isEmail(),
        check('password', 'Пароль Говно')
            .isLength({ min : 6 })
    ],
    async  (req, res)=>{
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({errors:errors.array(),message: 'Incorrect register data'})
        }

        const {email,password} = req.body

        const candidate = await User.findOne({email})
        if (candidate) {
            return res.status(400).json({message: 'Vad es hopar, es mail ov mard ka arden'})
        }

        const hashedpass = await  bcrypt.hash(password, 12)
        const user = new User({email, password: hashedpass})
        await user.save()

        res.status(201).json({message: 'User is sarqac'})


    }

    catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте позже' })    }
})
router.post(
    '/login'
    , [
        check('email', 'Write correct email').normalizeEmail().isEmail(),
        check('password', 'Write password').exists()
            .isLength({ min : 6 })
    ],
    async  (req, res)=>{
        try{
            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                return res.status(400).json(
                    {
                     errors:errors.array(),
                    message: 'Incorrect login data'
                    })
            }

            const {email,password} = req.body

            const user = await User.findOne({email})

            if (!user){
                return res.status(400).json({message:'Invalid Email or Password'})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({message: 'Invalid Email or Password'})
            }

            const token = jwt.sign(
                {userId : user.id},
                config.get('secretj'),
                {expiresIn:  '2h'}
            )

            res.json({token, userId : user.id})
        }
        catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуй чуть позже.' })    }

})

module.exports = router