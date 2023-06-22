import dbconfig from "../config/Database.js";
import { Sequelize } from "sequelize";

import User from "./UserModel.js";
import ServiceProvider from "./ServiceProviderModel.js";
import Media from "./MediaModel.js";
import EventType from "./EventTypeModel.js";
import ClothingStyle from "./ClothingstyleModel.js";
import Instrument from "./InstrumentModel.js";
import Genre from "./GenreModel.js";
import Vote from "./ VoteModel.js";
import Occation from "./OccationModel.js";
import Offer from "./OfferModel.js";
import Language from "./LanguageModel.js";
import MusicStyle from "./MusicStyleModel.js";
import Event from "./EventModel.js";
import Review from "./ReviewModel.js";
import Booking from "./BookingModel.js";
import CalendarDay from "./CalendarDayModel.js";
import Pricing from "./PricingModel.js";
import MediaEvent from "./MediaEventModel.js";
import MediaInstrument from "./MediaInstrumentModel.js";
import MediaGallery from "./MediaGalleryModel.js";


dbconfig.Sequelize = Sequelize;
dbconfig.sequelize = dbconfig;

dbconfig.users = User(dbconfig, Sequelize);
dbconfig.serviceProvider = ServiceProvider(dbconfig, Sequelize);
dbconfig.media = Media(dbconfig, Sequelize);
dbconfig.eventtype = EventType(dbconfig, Sequelize);
dbconfig.clothingstyle = ClothingStyle(dbconfig, Sequelize);
dbconfig.instrument = Instrument(dbconfig, Sequelize);
dbconfig.genre = Genre(dbconfig, Sequelize);
dbconfig.vote = Vote(dbconfig, Sequelize);
dbconfig.occation = Occation(dbconfig, Sequelize);
dbconfig.offer = Offer(dbconfig, Sequelize);
dbconfig.language = Language(dbconfig, Sequelize);
dbconfig.musicstyle = MusicStyle(dbconfig, Sequelize);
dbconfig.event = Event(dbconfig, Sequelize);
dbconfig.review = Review(dbconfig, Sequelize);
dbconfig.booking = Booking(dbconfig, Sequelize);
dbconfig.calendarday = CalendarDay(dbconfig, Sequelize);
dbconfig.pricing = Pricing(dbconfig, Sequelize);
dbconfig.mediaEvent = MediaEvent(dbconfig, Sequelize);
dbconfig.mediaInstrument = MediaInstrument(dbconfig, Sequelize);
dbconfig.mediaGallery = MediaGallery(dbconfig, Sequelize);


dbconfig.users.hasOne(dbconfig.serviceProvider);
dbconfig.serviceProvider.belongsTo(dbconfig.users);
// Define the UserRole model
// const UserRole = sequelize.define('UserRole', {});

// // Define the many-to-many associations
// User.belongsToMany(Role, { through: UserRole });
// Role.belongsToMany(User, { through: UserRole });

//service provider and offer many to many association
dbconfig.serviceProvider.belongsToMany(dbconfig.offer, { through: 'serviceprovider_offer' });
dbconfig.offer.belongsToMany(dbconfig.serviceProvider, { through: 'serviceprovider_offer' });

//service provider and language many to many association
dbconfig.serviceProvider.belongsToMany(dbconfig.language, { through: 'serviceprovider_language' });
dbconfig.language.belongsToMany(dbconfig.serviceProvider, { through: 'serviceprovider_language' });

//service provider and instruments many to many association
dbconfig.serviceProvider.belongsToMany(dbconfig.instrument, { through: 'serviceprovider_instrument' });
dbconfig.instrument.belongsToMany(dbconfig.serviceProvider, { through: 'serviceprovider_instrument' });

//service provider and occasions many to many association
dbconfig.serviceProvider.belongsToMany(dbconfig.occation, { through: 'serviceprovider_occations' });
dbconfig.occation.belongsToMany(dbconfig.serviceProvider, { through: 'serviceprovider_occations' });

//service provider and EventType many to many association
dbconfig.serviceProvider.belongsToMany(dbconfig.eventtype, { through: 'serviceprovider_eventtype' });
dbconfig.eventtype.belongsToMany(dbconfig.serviceProvider, { through: 'serviceprovider_eventtype' });

//service provider and ClothingStyle many to many association
dbconfig.serviceProvider.belongsToMany(dbconfig.clothingstyle, { through: 'serviceprovider_clothstyle' });
dbconfig.clothingstyle.belongsToMany(dbconfig.serviceProvider, { through: 'serviceprovider_clothstyle' });

//event to service provider association
dbconfig.serviceProvider.hasMany(dbconfig.event);
dbconfig.event.belongsTo(dbconfig.serviceProvider);

//event to review association
dbconfig.event.hasMany(dbconfig.review);
dbconfig.review.belongsTo(dbconfig.event);

// user to media one to many relationship
dbconfig.users.hasMany(dbconfig.media);
dbconfig.media.belongsTo(dbconfig.users);

// Associate Media Event with Media
// dbconfig.mediaEvent.hasMany(dbconfig.media);  // A Event Type can have many Media
// dbconfig.media.belongsTo(dbconfig.mediaEvent); // A Media belongs to a Event Type


// // Media Event to Media one to many relationship
// dbconfig.MediaEvent.hasMany(dbconfig.media, { as: "media_mediaEvents" });
// dbconfig.media.belongsTo(dbconfig.MediaEvent, {
//   foreignKey: "mediaID",
// });

// // Media Instrument to Media one to many relationship
// dbconfig.MediaInstrument.hasMany(dbconfig.media, { as: "media_mediaInstruments" });
// dbconfig.media.belongsTo(dbconfig.MediaInstrument, {
//   foreignKey: "mediaID",
// });

dbconfig.calendarday.belongsTo(dbconfig.users, {
  foreignKey: "userID",
});

dbconfig.pricing.belongsTo(dbconfig.users, {
  foreignKey: "userID",
});

export default dbconfig;
