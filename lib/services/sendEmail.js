// REFACTOR 
// 1 - Agregar el codigo de Async aca y no en las otras vistas

var config = require('configure');
var fs = require('fs');

exports.challengeEmail  = function(paragraph,subscription, callback) {
  fs.readFile(__dirname +"/mails/newchallenge.html", "utf8", function (err, html) {

    html = html.replace("%{{plataform}}%", paragraph.plataform.element_name);
    html = html.replace("%{{obj1}}%", paragraph.obj1.element_name);
    html = html.replace("%{{obj2}}%", paragraph.obj2.element_name);
    html = html.replace("%{{sub_id}}%",subscription._id);
    console.log(html);
    var toEmail, fromEmail;
    
    toEmail = subscription.email
    fromEmail = "no-reply@hohochallenge.com"

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: toEmail,
      from: fromEmail,
      subject: 'New Challenge - You dare',
      text: 'The challenge of the week is to design a '+ paragraph.plataform.element_name+' that deals with '+  paragraph.obj1.element_name +' and contains'+ paragraph.obj2.element_name,
      html: html
    };
    sgMail.send(msg);
  });

}

exports.subscribeEmail  = function(subscription, callback) {
  fs.readFile(__dirname +"/mails/subscribeEmail.html", "utf8", function (err, html) {

    html = html.replace("%{{sub_id}}%",subscription._id);
    console.log(html);
    var toEmail, fromEmail;
    
    toEmail = subscription.email
    fromEmail = "no-reply@hohochallenge.com"

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: toEmail,
      from: fromEmail,
      subject: 'Thank you !! for subscribing.',
      text: 'Thank you very much for subscribing',
      html: html
    };
    sgMail.send(msg);
  });
};





















