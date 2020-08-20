const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-encircled-05415',
    user : 'yash',
    password : '',
    database : 'face-ai'
  }
})

// db.select('*').from('users').then(data => {
// 	console.log(data);
// });


const app = express();

app.use(express.json());
app.use(cors());


const database = {
	users : [
		{
			id: '123',
			name: "Yash",
			email: "yash@gmail.com",
			password: "abcd",
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: "Megh",
			email: "megh@gmail.com",
			password: "efgh",
			entries: 0,
			joined: new Date()
		}
	]
}

app.get('/', (req, res) => {
	res.send('it is working');
})

app.post('/signin', (req, res) => signin.handlesignin(req,res, db, bcrypt))

app.post('/register', (req, res) => register.handleregister(req,res, db, bcrypt))

app.get('/profile/:id', (req, res) => profile.handleprofileGet(req,res,db))

app.put('/image', (req, res) => image.handleimage(req,res,db))

app.post('/imageUrl', (req, res) => {image.handleApiCall(req,res)})



app.listen(process.env.PORT || 3001, () => {
	console.log(`App is running on port 3000 ${process.env.PORT}`)
})


