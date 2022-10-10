const { Client } = require("pg")
const dotenv = require("dotenv")
dotenv.config()

const fs = require('fs');


//функция выбора случайной даты между 2 датами
function randomDate(date1, date2){
    function randomValueBetween(min, max) {
      return Math.random() * (max - min) + min;
    }
    var date1 = date1 || '01-01-1970'
    var date2 = date2 || new Date().toLocaleDateString()
    date1 = new Date(date1).getTime()
    date2 = new Date(date2).getTime()
    if( date1>date2){
        return new Date(randomValueBetween(date2,date1)).toLocaleDateString()   
    } else{
        return new Date(randomValueBetween(date1, date2)).toLocaleDateString()  

    }
}


function readFile(filePath) {
	
	try {
		const data = fs.readFileSync(filePath);
		return data;
	}
	catch 
	{
		return ''
	}
}


//читаем массив марок авто из файла, данные пойдут в столбец "наименоваение"
let cars = readFile('car.txt').toString().split('\r\n');


//читаем данные подключения к БД из .env и подключаемся
const client = new Client({
		user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT
})

client.connect()

let sql_drop = 'DROP TABLE IF EXISTS public.welbextest';
let sql_create = 'CREATE TABLE IF NOT EXISTS public.welbextest (date date,name text,amount bigint,distance numeric)';

client.query(sql_drop, (err, res) => {
  //console.log(res)
})

client.query(sql_create, (err, res) => {
  //console.log(res)
})

let r_date = ''
let randomIndex = 0;
let distRandom = 0;
let amountRandom = 0;


//загружаем в БД 100 строк с рандомными данными
for (let i=0;i<100;i++)
{
	randomIndex = Math.floor(Math.random() * (cars.length - 1));
	amountRandom = Math.floor(Math.random() * 1000);
	distRandom = Math.floor(Math.random() * 10000);
	r_date = randomDate('01/01/2010', '01/01/2020')
	sql_ins = `INSERT INTO public.welbextest(date,name,amount,distance) VALUES('${r_date}','${cars[randomIndex]}',${amountRandom},${distRandom})`;

	client.query(sql_ins, (err, res) => { })
}

console.log('data loaded');

var cors = require('cors')


const app = require('express')();
app.use(cors());
const port = 3030;

let sql_select = 'SELECT * FROM public.welbextest';

app.get('/table', (req, res) => {
  
  client.query(sql_select, (err, res_a) => {
     console.log("read data: "+res_a.rows.length)
     res.send(res_a.rows)
  })
  
})

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})

