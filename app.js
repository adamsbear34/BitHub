
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
require('dotenv/config');
const app = express();
const path = require('path');


//app.use('/api/auth');
const PORT = config.get('port') || 5000;

//Подключение к MogoDB
async function start(){
    try{
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        app.listen(PORT, () => console.log(`App has started on prot ${PORT}...`));
    }catch (e){
        console.log('Server Error', e.message);
        process.exit(1);
    }

}
//Middleware
app.use(express.json({extened: false}));

//Роуты 
app.use('/api/profile', require('./routes/api/profile.routes'));
app.use('/api/posts', require('./routes/api/posts.routes'));
app.use('/api/auth', require('./routes/api/auth.routes'));
app.use('/api/users', require('./routes/api/users.routes'));
app.use('/api/coins', require('./routes/api/tracker.routes'));
app.use('/api/category', require('./routes/api/category.routes'));
app.use('/api/analytics', require('./routes/api/analytics.routes'));
app.use('/api/search', require('./routes/api/search.routes'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }


start();



