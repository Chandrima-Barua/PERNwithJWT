import db from "../models/index.js";
const calendarDayModel = db.calendarday;
const Op = db.Sequelize.Op;

export const createCalendarDay = async (req, res) => {
    if (typeof req.user.userId === 'undefined') {
        return res.status(403).json({ message: "You are unauthenticated" });
    }
    
    if (typeof req.body.date === 'undefined') {
        return res.status(422).json({ message: "date must be specified" });
    }
    
    try {
        const dates = !Array.isArray(req.body.date) ? [req.body.date] : req.body.date;
        var calendarDay;

        for (let i = 0; i < req.body.date.length; i++) {
            calendarDay = await calendarDayModel.findOne({
                where: {
                    userID: req.user.userId,
                    date: new Date(dates[i]),
                }
            });

            if (calendarDay) {
                calendarDay.status = req.body.status;
                calendarDay.pricePerHour = req.body.pricePerHour;
                calendarDay.minimumFee = req.body.minimumFee;
                calendarDay.annotation = req.body.annotation;
        
                await calendarDay.save();
            } else {
                calendarDay = await calendarDayModel.create({
                    userID: req.user.userId,
                    date: new Date(dates[i]),
                    status: req.body.status,
                    pricePerHour: req.body.pricePerHour,
                    minimumFee: req.body.minimumFee,
                    annotation: req.body.annotation,
                });
            }
        }
        
        return res.status(200).send();
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Error creating calendarDay" });
    }
};

export const getCalendarDays = async (req, res) => {
    if (typeof req.user.userId === 'undefined') {
        return res.status(403).json({ message: "You are unauthenticated" });
    }

    let year = req.query.year ? req.query.year : new Date().getFullYear();
    
    try {
        const calendarDays = await calendarDayModel.findAll({
            where: {
                userID: req.user.userId,
                date: {
                    [Op.and]: [
                        { [Op.gte]: new Date(year, 0, 1) },
                        /*{ [Op.lte]: new Date(year, 11, 31) }*/
                    ]
                }
            },
            attributes: ['date', 'status', 'pricePerHour', 'minimumFee', 'annotation'],
        });

        return res.status(200).json(calendarDays);
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Error retrieving calendarDays" });
    }
};

export const updateCalendarDay = async (req, res, next) => {
    if (typeof req.user.userId === 'undefined') {
        return res.status(403).json({ message: "You are unauthenticated" });
    }

    try {
        const calendarDay = await calendarDayModel.findOne({
            where: {
                id: req.body.id,
                userID: req.user.userId,
            }
        });

        if (!calendarDay) {
            return res.status(404).json({ message: "Error updating calendarDay" });
        }

        calendarDay.status = req.body.status;
        calendarDay.pricePerHour = req.body.pricePerHour;
        calendarDay.minimumFee = req.body.minimumFee;
        calendarDay.annotation = req.body.annotation;

        await calendarDay.save();

        return res.status(200).json(calendarDay);
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Error updating calendarDay" });
    }
};

export const deleteCalendarDay = async (req, res, next) => {
    if (typeof req.user.userId === 'undefined') {
        return res.status(403).json({ message: "You are unauthenticated" });
    }

    try {
        const calendarDay = await calendarDayModel.findOne({
            where: {
                id: req.body.id,
                userID: req.user.userId,
            }
        });

        if (!calendarDay) {
            return res.status(404).json({ message: "calendarDay not found" });
        }

        await calendarDay.destroy();

        return res.status(200).json({ message: "calendarDay deleted" });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Error deleting calendarDay" });
    }
};