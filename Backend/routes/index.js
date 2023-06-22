import express from "express";
import * as userController from "../controllers/UserController.js";
import * as ServiceProviderController from "../controllers/ServiceProviderController.js";
import * as MediaController from "../controllers/MediaController.js";
import * as EventTypeController  from "../controllers/EventTypeController.js";
import * as ClothingstyleControler from "../controllers/ClothingstyleControler.js";
import * as CalendarDayController from "../controllers/CalendarDayController.js";
import * as PricingController from "../controllers/PricingController.js";

import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

// authentication routes
router.post('/register', userController.Register);
router.post('/login', userController.Login);
router.get('/token', refreshToken);
router.delete('/logout', userController.Logout);

//authentication
// router.use(verifyToken);

// user routes
router.get('/users',  userController.getUsers);
router.get('/user',  userController.findUser);

// Service Provider Profile routes 
router.post('/createProviderProfile', ServiceProviderController.createServiceProvider);
router.get('/serviceProviders', ServiceProviderController.getServiceProvider);
router.get('/serviceProvider',ServiceProviderController.getProviderProfilebyID);
router.get('/serviceProvider/offers', ServiceProviderController.getOffers);
router.get('/serviceProvider/instruments', ServiceProviderController.getInstruments);
router.get('/serviceProvider/languages', ServiceProviderController.getLanguages);
router.get('/serviceProvider/occations', ServiceProviderController.getOccations);
router.get('/serviceProvider/events', ServiceProviderController.getEvents);
router.get('/serviceProvider/clothingstyles', ServiceProviderController.getClothingstyles);
router.get('/serviceProvider/genres', ServiceProviderController.getGenres);
router.get('/serviceProvider/votes', ServiceProviderController.getVotes);
router.get('/serviceProvider/musicstyles', ServiceProviderController.getMusicstyles);
router.get('/serviceProvider/music',  ServiceProviderController.getMusic);

// Event Type routes
router.post('/createEventType',  EventTypeController.createEventType);
router.get('/EventTypes',  EventTypeController.getEventTypes);
router.put('/updateEventType', EventTypeController.updateEventType);
router.delete('/deleteEventType',  EventTypeController.deleteEventType);

// Calendar day routes
router.post('/createCalendarDay', CalendarDayController.createCalendarDay);
router.get('/getCalendarDays', CalendarDayController.getCalendarDays);
router.put('/updateCalendarDay', CalendarDayController.updateCalendarDay);
router.delete('/deleteCalendarDay', CalendarDayController.deleteCalendarDay);

// Pricing routes
router.post('/createPricing', PricingController.createPricing);
router.get('/getPricings', PricingController.getPricings);
router.put('/updatePricing', PricingController.updatePricing);
router.delete('/deletePricing', PricingController.deletePricing);

// file upload and download
router.post("/upload",   MediaController.upload);
router.get("/files",  MediaController.getListFiles);
router.get("/file",  MediaController.getImage);
router.get("/files/download",  MediaController.download);

//service provider media upload routes
router.get("/serviceProvider/mediaEvents", MediaController.getMediaEvents);
router.get("/serviceProvider/mediaInstruments", MediaController.getMediaInstruments);


// router.post("/createClothing", ClothingstyleControler.createClothingstyle);

export default router;