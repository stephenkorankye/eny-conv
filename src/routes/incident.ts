import express, { Router } from "express";
import { getIncident, addIncident } from "../controllers/incident";

const router: Router = express.Router();

router.get("/incidents/get", getIncident);

router.post("/incidents/add", addIncident);

export default router;
