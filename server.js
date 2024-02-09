const Express=require('express');
const dotenv=require('dotenv'); // for using the env variables from a config env file
const morgan=require('morgan'); //for logging the api requests
const path=require('path'); //Useful for specifying the directories and their paths
const bodyparser=require('body-parser');
const app=Express();
const {connectDB}= require('./server/database/mongodb')
dotenv.config({path: 'config.env'});
const PORT=process.env.PORT;
app.use(bodyparser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({extended:true}));
app.use(morgan('tiny'));

//mongodb connection
connectDB()

app.set('view engine','ejs');
//app.set('views',path.resolve(__dirname,'views/path/to/ejs'))
app.use('/css',Express.static(path.resolve(__dirname,'Assets/css')));
app.use('/img',Express.static(path.resolve(__dirname,'Assets/img')));
app.use('/js',Express.static(path.resolve(__dirname,'Assets/js')));
app.use('/Assets/css',Express.static('./Assets/css'))
const routes=require('./server/routes/routes')
app.use(routes)

app.listen(PORT,()=>console.log(`Server listening on port number ${PORT} open the url ${process.env.MAIN_URL}`))
