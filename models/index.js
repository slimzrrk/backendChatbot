
const Sequelize = require('sequelize');
const sequelize = require('../config/db');



const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importer tous les modèles
db.User = require('./User')(sequelize, Sequelize);
db.Accounting = require('./Accounting')(sequelize, Sequelize);
db.Bundle = require('./Bundle')(sequelize, Sequelize);
db.BundleWebinar = require('./BundleWebinar')(sequelize, Sequelize);
db.Card = require('./Card')(sequelize, Sequelize);
db.CardReservation = require('./CardReservation')(sequelize, Sequelize);
db.Manuel = require('./Manuel')(sequelize, Sequelize);
db.Material = require('./Material')(sequelize, Sequelize);
db.Document = require('./Document')(sequelize, Sequelize);
db.Comment = require('./Comment')(sequelize, Sequelize);
db.Discount = require('./Discount')(sequelize, Sequelize);
db.DiscountCategory = require('./DiscountCategory')(sequelize, Sequelize);
db.DiscountCourse = require('./DiscountCourse')(sequelize, Sequelize);
db.DiscountUser = require('./DiscountUser')(sequelize, Sequelize);
db.File = require('./File')(sequelize, Sequelize);
db.Filter = require('./Filter')(sequelize, Sequelize);
db.Follow = require('./Follow')(sequelize, Sequelize);
db.Meeting = require('./Meeting')(sequelize, Sequelize);
db.MeetingFile = require('./MeetingFile')(sequelize, Sequelize);
db.MeetingTime = require('./MeetingTime')(sequelize, Sequelize);
db.Notification = require('./Notification')(sequelize, Sequelize);
db.NotificationStatus = require('./NotificationStatus')(sequelize, Sequelize);
db.OfflinePayment = require('./OfflinePayment')(sequelize, Sequelize);
db.Order = require('./Order')(sequelize, Sequelize);
db.OrderItem = require('./OrderItem')(sequelize, Sequelize);
db.Page = require('./Page')(sequelize, Sequelize);
db.Payment = require('./Payment')(sequelize, Sequelize);
db.Quiz = require('./Quiz')(sequelize, Sequelize);
db.Role = require('./Role')(sequelize, Sequelize);
db.SchoolLevel = require('./SchoolLevel')(sequelize, Sequelize);
db.Subscribe = require('./Subscribe')(sequelize, Sequelize);
db.SubscribeRemind = require('./SubscribeRemind')(sequelize, Sequelize);
db.SubscribeUse = require('./SubscribeUse')(sequelize, Sequelize);
db.Video = require('./Video')(sequelize, Sequelize);
db.Webinar = require('./Webinar')(sequelize, Sequelize);
db.WebinarExtraDescription = require('./WebinarExtraDescription')(sequelize, Sequelize);
db.WebinarFilterOption = require('./WebinarFilterOption')(sequelize, Sequelize);
db.WebinarReview = require('./WebinarReview')(sequelize, Sequelize);
db.ChatbotInteraction = require('./ChatbotInteraction')(sequelize, Sequelize);
db.ChatbotRecommendation = require('./ChatbotRecommendation')(sequelize, Sequelize);
db.ChatbotTrainingData = require('./ChatbotTrainingData')(sequelize, Sequelize);

console.log("🧪 Vérification : db.BundleWebinar =", db.BundleWebinar);

require('./relations')(db);
module.exports = db;