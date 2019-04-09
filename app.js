// Configuration

const express = require('express');
const bodyP = require('body-parser');
const cookieP = require('cookie-parser');
   
const app = express();
app
    .use(bodyP.urlencoded({ extended: false }))
    .use(cookieP());

const consolidate = require('consolidate');
app.engine('html', consolidate.nunjucks);
app.set('view engine', 'nunjucks');
//app.set('views', 'views');

   
// Your handlers go here

// On ajoute une route pour l'url /s
app.use('/s', express.static('public'));

// On crée une route pour l'url /signin
app.get('/signin', function(req, res)
                    {
                      res.sendFile(__dirname + '/public/form.html');
                    }
);

// On crée une route pour l'url /hello
app.get('/hello', function(req, res)
                  {
                    res.render('hello.html', { 'name' : req.query.name,
                                               'rouge' : ['cherry', 'strawberry', 'blood'],
                                               'jaune' : ['sun', 'lemon', 'banana'],
                                                couleur : req.query.couleur
                                             });
                  }
);


   
app.listen(process.env.PORT);['sun', 'lemon', 'banana']