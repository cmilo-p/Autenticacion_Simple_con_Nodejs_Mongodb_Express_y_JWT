const { Router } = require('express');
const router = Router();

const User = require('../model/User');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hello Word'));

router.post('/signUp', async (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, 'secretKey');

    res.status(200).json({ token })
});

router.post('/signIn', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) return res.status(401).send("The email doesn´t exists");
    if (user.password !== password) return res.status(401).send("Wrong Password");

    const token = jwt.sign({ _id: user._id }, 'secretkey');
    return res.status(200).json({ token });
})

/* Rutas Publicas */
router.get('/tasks', (req, res) => {
    res.json([{
        "_id": 1,
        "name": "Task One",
        "description": "Lorem ipsum",
        "date": "2019-11-17T20:39:05.2112"
    },
    {
        "_id": 2,
        "name": "Task Two",
        "description": "Lorem ipsum",
        "date": "2019-11-17T20:39:05.2112"
    },
    {
        "_id": 3,
        "name": "Task Three",
        "description": "Lorem ipsum",
        "date": "2019-11-17T20:39:05.2112"
    }])
})
/* Rutas Privadas */
router.get('/private-tasks', verifyToken, (req, res) => {
    res.json([{
        "_id": 4,
        "name": "Task Four",
        "description": "Lorem ipsum",
        "date": "2019-11-17T20:39:05.2112"
    },
    {
        "_id": 5,
        "name": "Task Five",
        "description": "Lorem ipsum",
        "date": "2019-11-17T20:39:05.2112"
    },
    {
        "_id": 6,
        "name": "Task Six",
        "description": "Lorem ipsum",
        "date": "2019-11-17T20:39:05.2112"
    }])
})

module.exports = router;

/* Verificación de Tokens */
function verifyToken(req, res , next){
    if(!req.headers.anuthorization)
    return res.status(401).send('Unauthorize Request');

    const token = req.headers.anuthorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorize Request');
    }

    const payload = jwt.verify(token, 'secretkey');
    req.useriD = payload._id;
    next();
}
