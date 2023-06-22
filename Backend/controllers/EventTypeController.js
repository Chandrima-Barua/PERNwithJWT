import db from "../models/index.js";
import {findUser} from "./UserController.js"
const eventType = db.events;
const User = db.users;
const Op = db.Sequelize.Op;


// create a event type
export const createEventType = async (req, res) => {
    try {
        // checking if user is admin
        if (findUser) {
            if (findUser['role'] == "admin") {
                let types = await eventType.create({
                    name: req.body.name,
                });
                res.json(types);
            } else {
                res.json("Admin access Required for this action!")
            }
        } else {
            res.json("User isn't registered!")
        }

    } catch (error) {
        console.log(error);
    }
}


// get all Event Types
export const getEventTypes = async (req, res) => {
    try {
        const eventTypes = await eventType.findAll({
            // attributes: ['id', 'first_name', 'email']
        });
        res.json(eventTypes);
    } catch (error) {
        console.log(error);
    }
}

export const updateEventType = async (req, res, next) => {
    try {

        // checking if user is admin
        if (findUser) {
            console.log(findUser)
            if (findUser['role'] == "admin") {
                await eventType.update({ name: req.body.name }, {
                    where: {
                        id: req.body.eventID
                    }
                });
                res.json("Successfully updated!");
            } else {
                res.json("Admin access Required for this action!")
            }
        } else {
            res.json("User isn't registered!")
        }

    } catch (error) {
        console.log(error);
    }
}

export const deleteEventType = async (req, res, next) => {
    try {

        // checking if user is admin
        if (findUser) {
            if (findUser['role'] == "admin") {
                await eventType.destroy({
                    where: {
                        id: req.body.eventID
                    }
                  });
                  res.json("Successfully deleted!")
            } else {
                res.json("Admin access Required for this action!")
            }
        } else {
            res.json("User isn't registered!")
        }

    } catch (error) {
        console.log(error);
    }
}