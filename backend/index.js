const express=require('express')

const bodyParser=require('body-parser')

const meetRoutes=require('./routes/meet-route')

const errorController=require('./controllers/error')

const cors = require('cors');

const app=express()


const ports=process.env.PORT || 3000;

app.use(bodyParser.json())

// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin','*');
//     res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
//     next();
// })

// var corsOptions = {
//     origin: 'http://localhost:4200',
//     optionsSuccessStatus: 200 ,
//     methods: "GET, PUT,POST,DELETE"
// }

// app.use(cors(corsOptions));
 app.use(cors());

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow_Header','Content-Type, Authorization');
    next();
});


app.use('/meeting-details',meetRoutes)

// app.use(meetRoutes)
// app.use('/getById',meetRoutes)


// app.use(cors());

app.use(errorController.get404)
app.use(errorController.get505)

app.listen(ports, ()=>console.log(`Listening on port ${ports}`))