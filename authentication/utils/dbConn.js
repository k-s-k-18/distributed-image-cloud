import dotenv from 'dotenv';
import {Sequelize} from 'sequelize';

dotenv.config();


export const createDBConnection = ()=>{
    return new Sequelize(process.env.DB_CONN_URI);
}

export const checkConnection = async ()=>{
    try{
        await connection.authenticate();
        console.log('Connection alive');
        return true;
    }catch(err){
        console.log('Connection error:',err);
        return false;
    }
}
