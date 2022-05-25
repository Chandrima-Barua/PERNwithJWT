import db from "../models/index.js";
const serviceProvider = db.serviceProvider;
const User = db.users;
const Op = db.Sequelize.Op;

// create a service provide profile
export const createServiceProvider = async (req, res) => {
    try {

        // checking if user exists
        let user_check = await User.findOne({
            // where: { email: req.body.email },
            where: {
                [Op.or]: [
                    { id: req.body.id || null },
                    { email: req.body.email || null }
                ]

            },
            attributes: ['id', 'first_name', 'email']
        });
        //   console.log(user_check['id'])

        // checking if service provider exists
        if (user_check) {
            let provider_check = await serviceProvider.findOne({
                where: { userId: user_check['id'] },

            });
            // console.log(provider_check)

            if (!provider_check) {
                let service_provider = await serviceProvider.create({
                    people: req.body.people,
                    experience: req.body.experience,
                    stage_name: req.body.stage_name,
                    gender: req.body.gender,
                    userID: user_check['id']
                });
                res.json(service_provider);
            } else {
                res.json(" User is already a service provider!")
            }
        } else {
            res.json(" User isn't registered!")
        }

    } catch (error) {
        console.log(error);
    }
}


// get all services providers
export const getServiceProvider = async (req, res) => {
    try {
        const servicesProviders = await serviceProvider.findAll({
            // attributes: ['id', 'first_name', 'email']
        });
        res.json(servicesProviders);
    } catch (error) {
        console.log(error);
    }
}

// get service provider by id
export const getProviderProfilebyID = async (req, res) => {
    try {
        const servicesProvider = await serviceProvider.findOne({
            where: { userID: req.body.provider_id } ,
        });
        res.json(servicesProvider);
    } catch (error) {
        console.log(error);
    }
}

