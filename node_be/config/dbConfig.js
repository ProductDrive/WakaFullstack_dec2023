import pg from 'pg';

const { Pool } = pg;

// Create a pool instance
// const pool = new Pool({
//     connectionString: process.env.POSTGRES_URL,
// });

const pool = new Pool({
    host: process.env.LOCAL_POSTGRES_HOST,
    port:process.env.DB_PORT || 5432,
    dbname:process.env.LOCAL_POSTGRES_DATABASE || "postgres",
    user: process.env.LOCAL_POSTGRES_USER || "postgres",
    password: process.env.LOCAL_POSTGRES_PASSWORD || "7ebXW3kYDURO", 
});


// Connect to the database and handle connection errors
pool.connect()
    .then(() => {
        console.log('Connected to db');
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });

// Export the pool instance for use in other modules
export { pool };

// Optionally, you can add a function to close the pool when your application exits
const shutdownPool = async () => {
    try {
        await pool.end();
        console.log('Database connection pool closed.');
    } catch (err) {
        console.error('Error closing database connection pool:', err);
    }
};

// If you want to gracefully handle application shutdown, you can listen for process events
process.on('SIGINT', shutdownPool);
process.on('SIGTERM', shutdownPool);






// import pg from 'pg';

// const { Pool } = pg;

// const pool = new Pool({
//     connectionString: process.env.POSTGRES_URL,
//   })

// pool.connect((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('connected to db');
//   }
// });

// export {pool};



// const pool = new Pool({
//     host: process.env.LOCAL_POSTGRES_HOST,
//     port:process.env.DB_PORT || 5432,
//     dbname:process.env.LOCAL_POSTGRES_DATABASE || "postgres",
//     user: process.env.LOCAL_POSTGRES_USER || "postgres",
//     password: process.env.LOCAL_POSTGRES_PASSWORD || "7ebXW3kYDURO", 
// });