var nodemailer = require("nodemailer");
const { userModel } = require("../models");
var { portalLink } = require("../services/config");
const twilioClient = require("twilio")(
  "ACeade0e2abe0b09d85116bcb9baccd940",
  "aea727a26d055d558e832c09084bbfb6"
);
var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "pikfudapp@gmail.com",
    pass: "zdgjbhsbbifodsms",
  },
});

exports.newTaskEmail = (Task) => {
  var email = "";
  var { area, type, assignedManagers, taskClass, assignedVendors, adminId } =
    Task;
  var emails = [];
  if (area) {
    emails = area.emails;
  }
  email = email + adminId.email;
  if (assignedManagers) {
    for (let i = 0; i < assignedManagers.length; i++) {
      const element = assignedManagers[i];
      email = email + `,${element.email}`;
    }
  }
  for (let i = 0; i < emails.length; i++) {
    const element = emails[i];
    email = email + `,${element}`;
  }
  if (assignedVendors) email = email + `,${assignedVendors.email}`;
  var html = "<div>\n";
  if (type.shortName) html += `<p>Task Type: ${type.shortName}</p>\n`;
  if (area.shortName) html += `<p>Area: ${area.shortName}</p>\n`;
  if (taskClass.shortName) html += `<p>Class: ${taskClass.shortName}</p>\n`;
  if (Task.suit) html += `<p>Room: ${Task.suit}</p>\n`;
  if (Task.submittedBy) html += `<p>Created By: ${Task.submittedBy}</p>\n`;
  if (Task.phone) html += `<p>Telephone: ${Task.phone}</p>\n`;
  if (Task.details) html += `<p>Comments: ${Task.details}</p>\n`;
  html += `<p>Login to your account here</p>
<p>${portalLink}</p>
<br />
<p>Regards,</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RentdigiCare Administration</p>
</div>`;
  var mailOptions = {
    to: email,
    html: html,
    subject: "New Task",
  };
  smtpTransport.sendMail(mailOptions, function (error, response) {});
};
exports.newAccountEmail = (user) => {
  var html = "<div>\n";
  html += "<p>Drear " + user.name + "</p>\n";
  html +=
    "<p>Wellcome to RentdigiCare. A User Account has been created or modified for you.</p>\n";
  html += "<p>Here is the details of your account.</p>\n";
  html += "<p>Username:" + user.username + "</p>\n";
  html += "<p>Password:" + user.password + "</p>\n";
  html += "<p>You can go to RentdigiCare and login.</p>\n";
  html += "<p>" + portalLink + "</p>\n";
  html += "<p>Thank you.</p>\n";
  html += "</div>";

  var mailOptions = {
    to: user.email,
    html: html,
    subject: "New Task",
  };
  smtpTransport.sendMail(mailOptions, function (error, response) {});
};

exports.sendMessageAdminAboutNewRequest = async (userName, time) => {
  var admins = await userModel.find({ type: "admin" });
  for (let i = 0; i < admins.length; i++) {
    const admin = admins[i];
    twilioClient.messages
      .create({
        to: admin.phoneCode + admin.phone,
        messagingServiceSid: "MG1ec6833198359a57862d1c6de0ba46c9",
        body:
          "Dear Admin!\n You have received a new booking request from " +
          userName +
          " at " +
          moment(time).format("DD-MM-YYYY hh:mm") +
          "!",
      })
      .then((message) => console.log(`Message SID ${message.sid}`))
      .catch((e) => console.log(e));
  }
};

exports.sendUpdateBookingMessageToPhoneNumber = (status, phone, username) => {
  twilioClient.messages
    .create({
      to: phone,
      messagingServiceSid: "MG1ec6833198359a57862d1c6de0ba46c9",
      body:
        "Dear " +
        username +
        "\n " +
        "Your booking has been " +
        status +
        " ,Please check your app for details." +
        "\n Thank you!",
    })
    .then((message) => console.log(`Message SID ${message.sid}`))
    .catch((e) => console.log(e));
};

exports.bookingDriverAssignMessage = (phone, username) => {
  twilioClient.messages
    .create({
      to: phone,
      messagingServiceSid: "MG1ec6833198359a57862d1c6de0ba46c9",
      body:
        "Dear " +
        username +
        "\n " +
        "Your booking request is in process and Driver has been reserved for your trip. Please check your app for details.\n Thank you!",
    })
    .then((message) => console.log(`Message SID ${message.sid}`))
    .catch((e) => console.log(e));
};

exports.bookingVehicleAssingMessage = (phone, username, vehicle) => {
  twilioClient.messages
    .create({
      to: phone,
      messagingServiceSid: "MG1ec6833198359a57862d1c6de0ba46c9",
      body:
        "Dear " +
        username +
        "\n " +
        "Your booking request is in process and vehicle (" +
        vehicle?.plateNo +
        ") has been reserved for your trip. Please check your app for details.\n Thank you!",
    })
    .then((message) => console.log(`Message SID ${message.sid}`))
    .catch((e) => console.log(e));
};
