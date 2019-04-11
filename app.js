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
/*app.get('/hello', function(req, res)
                  {
                    res.render('hello.html', { 'name' : req.query.name,
                                               'rouge' : ['cherry', 'strawberry', 'blood'],
                                               'jaune' : ['sun', 'lemon', 'banana'],
                                                couleur : req.query.couleur
                                             });
                  }
);*/

// On crée une route pour l'url /bye
/*app.get('/bye/:name', function(req, res)
                {
                  res.send('Bye bye, '  + req.params.name);
                }
);*/

// On crée une route pour l'url /hello
app.post('/hello', function(req, res)
                  {
                    res.render('hello.html', { 'name' : req.body.name,
                                               'rouge' : ['cherry', 'strawberry', 'blood'],
                                               'jaune' : ['sun', 'lemon', 'banana'],
                                                couleur : req.body.couleur
                                             });
                    //res.send('Bonjour, ' + req.body.name);
                  }
);

// On crée une route pour l'url /bye
app.post('/bye', function(req, res)
                {
                  res.send('Bye bye, '  + req.body.name);
                }
);

// On crée une route pour l'url /:name/counter
app.get('/:name/counter/', function(req, res)
                            {
                              res.send(req.params.name + ', c est votre première visite <br> <a href = /' +
                                       req.params.name + '/counter/1> Suivant </a>');
                            }
)

// On crée une route pour l'url /:name/counter
app.get('/:name/counter/:cnt', function(req, res)
                              {
                                //var exp = /^([1-9]+)$/;
                                var resultat = '';
                                var cnt = (parseInt(req.params.cnt) + 1);
                                resultat += req.params.name + ', vous avez visité cette page ' + cnt + ' fois <br> <a href = /'+
                                             req.params.name + '/counter/' + cnt + '> Suivant </a>';
                                if( cnt === 1000000)
                                {
                                  resultat += '<br> Vous avez gagné une voiture !!!!';
                                }  
                                res.send(resultat);
                            }
)

// On crée une route pour l'url /cookie-monster
app.get('/cookie-monster', function(req, res)
                            {
                              var count;
                              var gagner = '';
                              var resultat = '';
                              if(req.cookies.count)
                              {
                                count = parseInt(req.cookies.count) + 1;
                                res.cookie('count', count);
                                if(count === 1000000)
                                {
                                  gagner += '<br><br> Félicitation Vous avez gagné une voiture !!!!';
                                } 
                              } 
                              else
                              {
                                count = 1;
                                res.cookie('count', count);
                              }
                              resultat += 'Vous avez visité ' + count + ' fois' + gagner;
                              res.send(resultat);
                            }
);

// On crée une route pour l'url /cookie-monster
app.get('/cookie-monster', function(req, res)
                            {
                              var count;
                              var gagner = '';
                              var resultat = '';
                              if(req.cookies.count)
                              {
                                count = parseInt(req.cookies.count) + 1;
                                res.cookie('count', count);
                                if(count === 1000000)
                                {
                                  gagner += '<br><br> Félicitation Vous avez gagné une voiture !!!!';
                                } 
                              } 
                              else
                              {
                                count = 1;
                                res.cookie('count', count);
                              }
                              resultat += 'Vous avez visité ' + count + ' fois' + gagner;
                              res.send(resultat);
                            }
);

// On crée une route pour l'url /cookie-monster
app.get('/', function(req, res)
              {
                var count = 0;
                if(localStorage.getItem('count'))
                {
                  count += parseInt(localStorage.getItem('count'));
                  localStorage.setItem('count', count);
                }
                else
                {
                  count = 1;
                  localStorage.setItem('count', count);
                }
                
                res.send('Nombre de visiteur: ' + count);
              }
);
                            

app.listen(process.env.PORT);