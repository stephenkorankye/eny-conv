import axios from "axios";
import { Sequelize } from "sequelize";
import { Request, Response } from "express";
import  Incident  from "../models/Incident";

const key: string = process.env.API_KEY || "" ;
let url: string = `https://api.openweathermap.org/data/2.5/weather?q=`;


export const getIncident = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    Incident.findAll()
      .then((data: any) => {
        res.status(200).json({ data });
      })
      .catch((err: Error) => {
        console.log("There was an error : ", err);
        res.status(404).json({ message: "Not found" });
      });
  } catch (err) {
    console.log("There was an error : ", err);
    res.status(404).json({ message: err });
  }
};

export const addIncident = async (req: Request, res: Response): Promise<Response | void>  => {
  try {
    console.log(req.body);

    let errors: string[] = [];

    let { client_id, incident_desc, city, country } = req.body ; 

    if (!client_id) errors.push("Client ID required");
    if (!incident_desc) errors.push("Incident ID required");
    if (!city) errors.push("City required");
    if (!country) errors.push("Country required");

    if (errors.length > 0) {
      return res.status(200).json({ success: false, message: errors });
    }

    //Fetch Data
    await axios.get(`${url}+${city}`, {
        params: {
          appid: key,
        },
      })
      .then((ans: any) => {
        const { data } = ans;

        Incident.create({
          client_id,
          incident_desc,
          city,
          country,
          weather_report: data,
        })
          .then((ans: any) => {
            return res.status(200).json({ success: true, message: "Saved Successfully" });
          })
          .catch((err: Error) => {
            return res.status(404).json({ success: false, message: err });
          });
      })
      .catch((err: Error) => {
        console.log("Error fetching data : ", err);
        return res.status(404).json({ message: `${city} Could not be found` });
      });
  } catch (err) {
    console.log("Error Adding data : ", err);
    res.status(500).json({ message: err });
  }
};
