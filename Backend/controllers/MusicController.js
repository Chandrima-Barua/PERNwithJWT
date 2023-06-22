import db from "../models/index.js";
const Category = db.categories;
const Service = db.services;
const ServiceCategory = db.service_category;

// create a category
export const createMusic = async (req, res) => {
    try {
        let checkservice = await Service.findOne({
            where: { id: req.body.service_id },
        });


        let categories = req.body.categories

        if ((checkservice) && (categories.length > 0)) {
            for (let i = 0; i < categories.length; i++) {
                // console.log(req.body.categories[i].name)
                let checkcategory = await Category.findOne({
                    where: { name: req.body.categories[i].name },
                });
                if (!checkcategory) {
                    let category = await Category.create({
                        name: req.body.categories[i].name,
                        serviceId: req.body.service_id,
                    });
                } else {
                    res.json("Already Exist!");
                }



            }
            let allcategories = await Category.findAll({
                where: { serviceId: req.body.service_id },
            });
            res.json(allcategories);



        }

    } catch (error) {
        console.log(error);
    }
}

// get all categories
export const getMusics = async (req, res) => {
    try {
        const categories = await Category.findAll({
            // attributes: ['id', 'first_name', 'email']
        });
        res.json(categories);
    } catch (error) {
        console.log(error);
    }
}


// get categories by serviceID
export const getCategoriesbyServiceID = async (req, res) => {
    try {
        const categories = await Category.findAll({
            where: { serviceId: req.body.service_id },
            // include: ["services" ],
            // include: [{
            //     model:Service, 
            //     attributes: ['id', 'name'], 
            //     as: "services",

            // }]
        })
        res.json(categories);
    } catch (error) {
        console.log(error);
    }
}



