import express from "express" ; 
import dotenv from "dotenv" ; 
import { Sequelize } from "sequelize";
import connKey from "./config/connect";
import incidentRoutes from "./routes/incident";



dotenv.config(); 

const app = express() ; 

const PORT = process.env.PORT || 5000 ;  

const sequelize = new Sequelize(connKey) ; 


sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');

}).catch((error) => {
   console.error('Unable to connect to the database: ', error);

});

app.use(express.urlencoded({ extended : true })) ; 


app.use("/", incidentRoutes);

app.listen ( PORT , () => console.log (`Server running on port ${PORT}`)) ; 
