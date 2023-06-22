import db from "../models/index.js";
const serviceProvider = db.serviceProvider;
const offers = db.offer;
const languages = db.language;
const instruments = db.instrument;
const occations = db.occation;
const events = db.eventtype;
const clothingstyles = db.clothingstyle;
const genres = db.genre;
const votes = db.vote;
const User = db.users;
const musicstyles = db.musicstyle;
const Op = db.Sequelize.Op;

// create a service provide profile
export const createServiceProvider = async (req, res) => {
    try {  
        console.log(req.body)    
     let Newservice_provider = await serviceProvider.create(
        {
            groupType: req.body.groupType,
            voice: req.body.gender_voice,
            numberOfmembers: req.body.numberOfmembers?req.body.numberOfmembers:0,
            startYear: req.body.startYear,
            isTrained: req.body.education === 'Nein' ? false : true ,
            numberOfEvents: req.body.numberOfEvents,
            // userID: req.body.user_id
            userID: '1' //for testing
          })

    const service_provider = await serviceProvider.findByPk(Newservice_provider.id);

    //adding offers for service provider
    if(req.body.offer && req.body.offer.length > 0){
       
     await db.sequelize.transaction(async (t) => {
        let offers_records = await Promise.all(req.body.offer.map((item) => {
            return offers.findByPk(item);           
    }));
        await service_provider.addOffer(offers_records, { transaction: t });
      })
    }

    // adding language for service provider
    if(req.body.lang && req.body.lang.length > 0){
     await db.sequelize.transaction(async (t) => {
        let language_records = await Promise.all(req.body.lang.map((item) => {
            return languages.findByPk(item);           
    }));
    
        await service_provider.addLanguage(language_records, { transaction: t });
      })
    }

    // adding instruments for service provider
    if(req.body.machine && req.body.machine.length > 0){
        await db.sequelize.transaction(async (t) => {
           let instrument_records = await Promise.all(req.body.machine.map((item) => {
               return instruments.findByPk(item);           
       }));
       
           await service_provider.addInstrument(instrument_records, { transaction: t });
         })
       }

    // adding occations for service provider
    if(req.body.occation && req.body.occation.length > 0){
        await db.sequelize.transaction(async (t) => {
           let occation_records = await Promise.all(req.body.occation.map((item) => {
               return occations.findByPk(item);           
       }));
       
           await service_provider.addOccation(occation_records, { transaction: t });
         })
       }

    // adding EventType for service provider
    if(req.body.event && req.body.event.length > 0){
        await db.sequelize.transaction(async (t) => {
           let event_records = await Promise.all(req.body.event.map((item) => {
               return events.findByPk(item);           
       }));
       
           await service_provider.addEventType(event_records, { transaction: t });
         })
       }

    // adding ClothingStyle for service provider
    if(req.body.clothe && req.body.clothe.length > 0){
        await db.sequelize.transaction(async (t) => {
           let cloth_records = await Promise.all(req.body.clothe.map((item) => {
               return clothingstyles.findByPk(item);           
       }));
       
           await service_provider.addClothingStyle(cloth_records, { transaction: t });
         })
       }

    // adding Music Genre and vote for service provider
    if(req.body.music_style && req.body.music_style.length > 0){

        let musicstyle_record = await Promise.all(req.body.music_style.map((item) => {
             musicstyles.create(
                {
                    serviceProviderID: Newservice_provider.id,
                    genreID: item.genre,
                    voteID: item.vote
                })
            }));

            console.log(musicstyle_record)
    }
    
    res.json(Newservice_provider);
 
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

// get all offers
export const getOffers = async (req, res) => {
    try {
        const allOffers = await offers.findAll({
            // attributes: ['id', 'first_name', 'email']
        });
        res.json(allOffers);
    } catch (error) {
        console.log(error);
    }
}

// get all instruments
export const getInstruments = async (req, res) => {
    try {
        const allInstruments = await instruments.findAll({
            // attributes: ['id', 'first_name', 'email']
        });
        res.json(allInstruments);
    } catch (error) {
        console.log(error);
    }
}

// get all languages
export const getLanguages = async (req, res) => {
    try {
        const allLanguages = await languages.findAll({
            // attributes: ['id', 'first_name', 'email']
        });
        res.json(allLanguages);
    } catch (error) {
        console.log(error);
    }
}

// get all occations
export const getOccations = async (req, res) => {
    try {
        const allOccations = await occations.findAll({
            // attributes: ['id', 'first_name', 'email']
        });
        res.json(allOccations);
    } catch (error) {
        console.log(error);
    }
}


// get all events
export const getEvents = async (req, res) => {
    try {
        const allEvents = await events.findAll({
            // attributes: ['id', 'first_name', 'email']
        });
        res.json(allEvents);
    } catch (error) {
        console.log(error);
    }
}

// get all clothingstyles
export const getClothingstyles = async (req, res) => {
    try {
        const allClothingstyles = await clothingstyles.findAll({
            // attributes: ['id', 'first_name', 'email']
        });
        res.json(allClothingstyles);
    } catch (error) {
        console.log(error);
    }
}

// get all genres
export const getGenres = async (req, res) => {
    try {
        const allGenres = await genres.findAll({
            // attributes: ['id', 'first_name', 'email']
        });
        res.json(allGenres);
    } catch (error) {
        console.log(error);
    }
}

// get all votes
export const getVotes = async (req, res) => {
    try {
        const allVotes = await votes.findAll({
            // attributes: ['id', 'first_name', 'email']
        });
        res.json(allVotes);
    } catch (error) {
        console.log(error);
    }
}

// get all votes
export const getMusic = async (req, res) => {
    let response1, response2;
    try {
       
        genres.findAll().then(results1 => {
            response1 = results1;
            return votes.findAll();
          }).then(results2 => {
            response2 = results2;
            const votename = response2.map(resultVote => {
                return resultVote.name
           
        })
        //   Process the merged results and create nested JSON
        const mergedData = response1.map(result => {
            return {
                id: result.id,
                title: result.name,
                desc: result.desc,
                marks:  votename,
                value: 0
            };
        });
          
        // Send the merged response
        res.json(mergedData);
        })
    } catch (error) {
        console.log(error);
    }
}


// get all musicstyles
export const getMusicstyles = async (req, res) => {
    try {
        const allMusicstyles = await musicstyles.findAll({
            // attributes: ['id', 'first_name', 'email']
        });
        res.json(allMusicstyles);
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

