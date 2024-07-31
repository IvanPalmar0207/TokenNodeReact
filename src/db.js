import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'reactnodejwt',
    'root',
    '',
    {
        host : 'localhost',
        dialect : 'mysql'
    }
)

export default sequelize