import { Sequelize } from "sequelize-typescript";
import config from "../config";
import path from "path";
import { dbLogger } from "../logger";

const sequelize = new Sequelize(config.db.db_name as string,config.db.db_user as string,config.db.db_password,{
    host:config.db.db_host,
    port:config.db.db_port as unknown as number,
    dialect:'mysql',
    pool:{ //连接池
        max:5, //最大连接次数
        idle:30000,
        acquire:60000
    },
    logging:msg =>dbLogger.info(msg),
    // logging:msg => sqlLogger.info('sql',msg),
    models:[path.join(__dirname,'..','model/**/*.ts'),path.join(__dirname,'..','model/**/*.js')],
    dialectOptions:{
        charset:'utf8mb4',
    },
    define: {
        timestamps:true,
        createdAt:'created_at',
        updatedAt:'updated_at',
        deletedAt:'deleted_at'
    }
})
const db = async () =>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }catch{
        console.log('Unable to connect to the database:');
    }
}

export default db
