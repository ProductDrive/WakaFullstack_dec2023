
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  })

// const pool = new Pool({
//     host: process.env.LOCAL_POSTGRES_HOST,
//     port:process.env.DB_PORT || 5432,
//     dbname:process.env.LOCAL_POSTGRES_DATABASE || "postgres",
//     user: process.env.LOCAL_POSTGRES_USER || "postgres",
//     password: process.env.LOCAL_POSTGRES_PASSWORD || "7ebXW3kYDURO", 
// });


pool.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to db');
  }
});

export {pool};



// //production
// module.exports = {
//     HOST:'localhost',
//     USER:'productd_wakauser',
//     PASSWORD:'Wakauser@2019',
//     DB:'productd_waka',
//     dialect:'mysql',
//     pool:{
//         max:5,
//         min:0,
//         acquire:30000,
//         idle:10000
//     }
// }


//development
// module.exports = {
//     HOST:'localhost',
//     USER:'root',
//     PASSWORD:'',
//     DB:'awari_db',
//     dialect:'mysql',

//     pool:{
//         max:5,
//         min:0,
//         acquire:30000,
//         idle:10000
//     }
// }
