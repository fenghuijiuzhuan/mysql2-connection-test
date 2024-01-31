// import mysql from "mysql2";
import mysql from "mysql2/promise";

// 同步链接数据库
// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '123456',
//     database: 'practice',
// })

// 查
// connection.query(
//     'SELECT * FROM customers WHERE name LIKE ?',
//     ['李%'],
//     function(err, results, fields) {
//         console.log(err);
//         console.log(results);
//         console.log(fields.map(item => item.name));
//     }
// )

// 增
// connection.execute(
//     'INSERT INTO customers (name) VALUES (?)',
//     ['峰回九转'],
//     (err, results, fields) => {
//         console.log(err);
//     }
// )

// 改
// connection.execute(
//     'UPDATE customers SET name="峰回九转峰回九转" WHERE name="峰回九转"',
//     (err) => {
//         console.log(err);
//     }
// )

// 删
// connection.execute(
//     'DELETE FROM customers WHERE name=?',
//     ['峰回九转峰回九转'],
//     (err) => {
//         console.log(err);
//     }
// )

// 异步链接数据库
// (async function () {
//   const connection = await mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "123456",
//     database: "practice",
//   });

//   const [results, fields] = await connection.query("SELECT * FROM customers");
//   console.log(results);

//   console.log(fields.map((item) => item.name));
// })();

// 异步链接数据库使用连接池
(async function () {
  const pool = await mysql.createPool({
    host: "localhost",
    // port: 3306,
    user: "root",
    password: "123456",
    database: "practice",
    // 连接池相关
    waitForConnections: true, // 没有可用连接时等待，设置为false会直接返回报错
    connectionLimit: 10, // 指定最多有多少个链接，超出了排队
    maxIdle: 10, // 最多有多少个空闲的，超出的空闲链接将被释放
    idleTimeout: 60000, // 空闲连接多长时间断开
    queueLimit: 0, // 可以排队的请求数量，超过这个数量就直接返回报错说没有连接了。设置为 0 就是排队没有上限。
    
    // enableKeepAlive、keepAliveInitialDelay是保持心跳用的，默认就好
    // enableKeepAlive: true,
    // keepAliveInitialDelay: 0,
  });

  // query和execute时会自动从pool中取connection
  // const [results] = await pool.query("SELECT * FROM customers");

  // 手动从连接池中取connection
  const connection = await pool.getConnection();
  const [results] = await connection.query("SELECT * FROM orders");

  console.log(results);
})();
