import * as mysql from 'mysql2/promise'
// connection database
const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'express_mvc'
})

// promise
connection
.connect()
    .then(() => console.log(`Connexion établie avec MySQL`))
    .catch(err => console.log(err));



// callback

// connection.connect((err)=>{
// if(err){
//     console.log(err);
    
// }else{
//     console.log(`Connexion établie avec MySQL`);  
// }
// })

export default connection