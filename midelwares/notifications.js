const notificationModel = require("../models/notifications");
const customersModel = require("../models/customers");
const friendsModel = require("../models/friends");
const restaurantModel = require("../models/restaurant");
const moment = require("moment");
var admin = require("firebase-admin");

var serviceAccount = {
  type: "service_account",
  project_id: "restaurant-c3447",
  private_key_id: "ebc3ea2d9c36f8ce994b668fc59c036c3bca427c",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCxOmvp/ALqEgvH\nKbd8qCdAWMQJ2SFAFSM+fMG/NnwrOZ3wY4O0DmdtwM/BxORdICc1nDI/+hZAUFZR\nyoKCFiXyHxfvxPRS0aKeo/ABHFE42Yqj+crnNPqCLjmH6IB6s/ZyRw+vddFRIsmn\n9uYFi1c9GT0upilsiP9vse5dEsfZVS6hQRjaAmVfKyyp9AFC95IY6p0tUy0y4UAY\nSXfMCuyp4TzUR+2Yd3XjcY5jnGmt3bcx/N2eBILrYSZGy6Qv75eA5qBQsUf5CfKS\nbQY6WF7t3EJsbDYHJ9AezUzWSUXYkfHL7z9Gc53t/vu6eh98KqJ/I0VLHWmsjOCp\nIut1LJuNAgMBAAECggEAE1R36LFf7/+/4R0fsiz0+wOzfg98nOyxR2N8Dkr3CA/k\ntg9kkgLwLPxWrJ+4+J9FJ4e9w1SXkLQydgFMcrvPr7TMe45Tx6Stw/fFeZmJElZH\n1NKt2sHggMph4/zr5nYybwxpHY4QInVU4UkAlaI5BaT3E1t0MS5QDfKuOOCPg5ik\nS1nqZUSiP2VHaQfMxoQ/IQtD4nWMIM68SjaNqlAA1Ctlmg2bXBMFouhrHe/eNx1t\n2AnZ7Mg+rBgRi6XM9iKfZBLnThVYLV5FSZwSXJdpzFX4D4sufeE4IU+64/ZsDU0N\nGG1/5Ne1bPfr/ZOhzvMRHfJIHq/kzPUHSmjCHmmv0QKBgQDism+n3d4T47tJpSPX\nTYFQOInNLxiWOC4j13f62SvxeJi9rCVtQrSgjZ70Dwv2eQUwzWhFgFSDEO/zMJ4t\nav+CydJh3Sqb1fuhWFNfn+8tFVMm36yWnWOWxv5xAAqGSz+E1yO7P7+7hys82tND\nR1dcread1u6JF/tqU1TV8f9x3wKBgQDIIwcZoKKwLIT9AkNHGatYwFidEzyAsK0y\nkToR56Mhb5eC1FucNbq/670vYFkBETAFRBJyWFhYhGPRZUdfIlsusPro5D72iImQ\n+wS8f2pBU5n/atLjtWqd0ZTVHWWSAZtmmZc3KBiDQT7eDMqNm/BZ+vI61JgwfLjZ\nWIZvyz3YEwKBgFY0+NTjQEJcBaq5y+liJdy1w2FtmXH2p0Ul+RBBab6H1725Kvpj\ntYCgmmPBHRF7cAfg9NgJNxooZLccM+qdl9DKouBoVH2yX+A5UGs6zJ9eTqKnyF/2\nNhruTW/3TglHsD35+jKIyYasnjqkFFavWH97+gjn5QnpPshuLAK35iYNAoGBAMFX\nlXRcis5HM/J4TSZS1gVXTEPyYXCxPaCsS70gWafjdisdm6K9BTyDMLCkE1fEku+D\nY46zaiWZQBT6EokFV7EzqDF0zp68KKm21kyDitKxQQRO3oy8pdLwtSdszsLOaqIj\nnsHaKlQio+k/0i4bh4Zlt7y9xIiS9MCDlNxLK+OhAoGBAJC6CbsL6aKo1CobbA6P\nv7RNKlvMFo/IUWHcNPoQ972GIezPfwyGRoo8Ze/eZObEu02aETkFbxtwk9WGbX/y\niTg1eZQiwX+v7NsefZeO4if9AUyhsF+YhP/zdJs7/l9fFQtdYEDARx1riz8oYPaS\nEnPCPOnLM7FPoF/qKFJ6jqu+\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-fryk8@restaurant-c3447.iam.gserviceaccount.com",
  client_id: "109517434263952060733",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fryk8%40restaurant-c3447.iam.gserviceaccount.com",
};

const connection = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://safeline-10a21.firebaseio.com",
});
exports.sendFriendNotification = async (obj, type = "add", callback) => {
  var { customer, user } = obj;
  var custom = await customersModel.findById(customer, "-visitedRestaurant");
  var u = await customersModel.findById(user, "-visitedRestaurant");
  if (custom && u) {
    var title = "";
    if (custom.firstName && custom.lastname)
      title = custom.firstName + " " + custom.lastname + " ";
    else if (custom.firstName) title = custom.firstName + " ";
    else if (custom.lastname) title = custom.lastname + " ";
    else "Someone ";
    title =
      title + type == "accept"
        ? "accepted your fried request!"
        : type == "decline"
        ? "declined your fried request!"
        : "have sent you fried request!";

    const payload = {
      notification: {
        title: "Friend Request",
        body: title,
        sound: "default",
      },
      data: { screen: "friends", _id: String(customer) },
    };
    const friends = await friendsModel.findOne({
      recipient: customer,
      customer: user,
    });
    await notificationModel.create({
      customerData: customer,
      customer: user,
      type: type == "decline" ? "decline-friend-request" : "friend-request",
      friends: friends && friends._id,
    });
    if (u && u.fcm.length > 0)
      connection
        .messaging()
        .sendToDevice(
          u.fcm.map((item) => item.fcm),
          payload
        )
        .then((res) => {
          //   console.log(res);
        })
        .catch((e) => console.log(e));
  }
  callback();
};

exports.sendReservationNotification = async (
  obj,
  type = "create", //cancel for customer,complete for restaurant
  callback
) => {
  var { customers, user, restaurant, reservation } = obj;
  customers = customers.filter((item) => item.customer != String(user).trim());
  var u = await customersModel.findById(user, "-visitedRestaurant");
  restaurant = await restaurantModel.findById(restaurant);
  for (let i = 0; i < customers.length; i++) {
    var title = "";
    if (type == "create") {
      if (u.firstName && u.lastname)
        title = u.firstName + " " + u.lastname + " ";
      else if (u.firstName) title = u.firstName + " ";
      else if (u.lastname) title = u.lastname + " ";
      else "Someone ";
      console.log(moment(reservation.date).format("MMMM Do YYYY"));
      title =
        title +
        "invited you to " +
        restaurant.name +
        " on" +
        moment(reservation.date).format("MMMM Do YYYY");
      const payload = {
        notification: {
          title: "Reservation",
          body: title,
          sound: "default",
        },
        data: { screen: "reservation", _id: String(reservation._id) },
      };
      const element = customers[i] && customers[i].customer;
      var cus = await customersModel.findById(element, "-visitedRestaurant");
      if (cus && cus.fcm && cus.fcm.length > 0)
        connection
          .messaging()
          .sendToDevice(
            cus.fcm.map((item) => item.fcm),
            payload
          )
          .then((res) => {
            //   console.log(res);
          })
          .catch((e) => console.log(e));
      await notificationModel.create({
        customer: element,
        customerData: user,
        type: "create-reservation",
        reservation: reservation._id,
        restaurantData: restaurant._id,
      });
    } else if (type == "completed") {
      title =
        "Share feedback about your visit to " +
        restaurant.name +
        " on" +
        moment(reservation.date).format("MMMM Do YYYY");
      const payload = {
        notification: {
          title: "Reservation",
          body: title,
          sound: "default",
        },
        data: { screen: "review", _id: String(reservation._id) },
      };
      const element = customers[i] && customers[i].customer;
      var cus = await customersModel.findById(element, "-visitedRestaurant");
      if (cus && cus.fcm && cus.fcm.length > 0)
        connection
          .messaging()
          .sendToDevice(
            cus.fcm.map((item) => item.fcm),
            payload
          )
          .then((res) => {
            //   console.log(res);
          })
          .catch((e) => console.log(e));
      await notificationModel.create({
        customer: element,
        customerData: user,
        type: "feedback",
        reservation: reservation._id,
        restaurantData: restaurant._id,
      });
    }
  }

  //sending notification to restaurant if new reservation is created
  if (type == "create" || type == "cancel") {
    await notificationModel.create({
      type: type == "create" ? "create-reservation" : "cancel-reservation",
      restaurant: restaurant._id,
      customerData: user,
      reservation: reservation._id,
    });
    var title = "";
    if (u.firstName && u.lastname) title = u.firstName + " " + u.lastname + " ";
    else if (u.firstName) title = u.firstName + " ";
    else if (u.lastname) title = u.lastname + " ";
    else "Someone ";
    if (type == "create")
      title =
        title +
        "wants to book a table for " +
        reservation.peopleCount +
        " on" +
        moment(reservation.date).format("MMMM Do YYYY");
    else
      title =
        title +
        "cancelled their booking for " +
        reservation.peopleCount +
        " people on" +
        moment(reservation.date).format("MMMM Do YYYY");
    const payload = {
      notification: {
        title: "Reservation",
        body: title,
        sound: "default",
      },
      data: { screen: "reservation", _id: String(reservation._id) },
    };
    if (restaurant.fcm && restaurant.fcm.length > 0)
      connection
        .messaging()
        .sendToDevice(
          restaurant.fcm.map((item) => item.fcm),
          payload
        )
        .then((res) => {
          //   console.log(res);
        })
        .catch((e) => console.log(e));
  }
  callback();
};
