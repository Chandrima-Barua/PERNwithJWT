import db from "../models/index.js";
const Service = db.services;

// create a service
export const createService = async (req, res) => {
    try {
        let service = await Service.create({
            name: req.body.name,         
        });
        res.json(service);
    } catch (error) {
        console.log(error);
    }
}


// get all services
export const getServices = async (req, res) => {
    try {
        const services = await Service.findAll({
            // attributes: ['id', 'first_name', 'email']
        });
        res.json(services);
    } catch (error) {
        console.log(error);
    }
}