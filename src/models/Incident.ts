import { Sequelize, DataTypes } from 'sequelize';
import connKey from '../config/connect';

const sequelize = new Sequelize(connKey);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error: Error) => {
    console.error('Unable to connect to the database: ', error);
  });

interface IncidentAttributes {
  client_id: number;
  incident_desc: string;
  city: string;
  country: string;
  weather_report?: object;
}

const Incident = sequelize.define<IncidentAttributes | any>('incidents', {
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  incident_desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weather_report: {
    type: DataTypes.JSON,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log('Incident table created successfully!');
  })
  .catch((error: Error) => {
    console.error('Unable to create table : ', error);
  });

export default Incident;
