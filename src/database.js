const mogoose = require('mongoose');

mogoose.connect('mongodb://localhost/BonemaTI', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database is Coneccted'))
    .catch(err => console.log(err));