import db from "../models/index.js";
const pricingModel = db.pricing;
const Op = db.Sequelize.Op;

export const createPricing = async (req, res) => {
    if (typeof req.user.userId === 'undefined') {
        return res.status(403).json({ message: "You are unauthenticated" });
    }

    try {
        var pricing = await pricingModel.findOne({
            where: {
                userID: req.user.userId,
                weekday: req.body.weekday,
            }
        });

        if (pricing) {
            pricing.weekday = req.body.weekday;
            pricing.status = req.body.status;
            pricing.pricePerHour = req.body.pricePerHour;
            pricing.minimumFee = req.body.minimumFee;
    
            await pricing.save();
        } else {
            pricing = await pricingModel.create({
                userID: req.user.userId,
                weekday: req.body.weekday,
                status: req.body.status,
                pricePerHour: req.body.pricePerHour,
                minimumFee: req.body.minimumFee,
            });
        }

        return res.status(200).json(pricing);
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Error creating pricing" });
    }
};

export const getPricings = async (req, res) => {
    // if (typeof req.user.userId === 'undefined') {
    //     return res.status(403).json({ message: "You are unauthenticated" });
    // }
    
    try {
        const pricings = await pricingModel.findAll({
            where: {
                userID: req.user.userId,
            },
            attributes: ['weekday', 'status', 'pricePerHour', 'minimumFee'],
        });

        var pricingData = [];

        for (let i = 0; i < 8; i++) {
            let filteredData = pricings.filter(pricing => pricing.weekday === i);

            pricingData.push(filteredData.length > 0 ? filteredData[0] : {
                weekday: i,
                status: null,
                pricePerHour: null, // default value for hourly price
                minimumFee: null, // default value for minimum fee (you might want to define those constants somewhere globally)
            });
        }

        return res.status(200).json(pricingData);
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Error retrieving pricings" });
    }
};

export const updatePricing = async (req, res, next) => {
    if (typeof req.user.userId === 'undefined') {
        return res.status(403).json({ message: "You are unauthenticated" });
    }

    try {
        const pricing = await pricingModel.findOne({
            where: {
                userID: req.user.userId,
                weekday: req.body.weekday,
            }
        });

        if (!pricing) {
            return res.status(404).json({ message: "Error updating pricing" });
        }

        // pricing.weekday = req.body.weekday;
        pricing.status = req.body.status;
        pricing.pricePerHour = req.body.pricePerHour;
        pricing.minimumFee = req.body.minimumFee;

        await pricing.save();

        return res.status(200).json(pricing);
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Error updating pricing" });
    }
};

export const deletePricing = async (req, res, next) => {
    if (typeof req.user.userId === 'undefined') {
        return res.status(403).json({ message: "You are unauthenticated" });
    }

    try {
        const pricing = await pricingModel.findOne({
            where: {
                id: req.body.id,
                userID: req.user.userId,
            }
        });

        if (!pricing) {
            return res.status(404).json({ message: "pricing not found" });
        }

        await pricing.destroy();

        return res.status(200).json({ message: "pricing deleted" });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Error deleting pricing" });
    }
};