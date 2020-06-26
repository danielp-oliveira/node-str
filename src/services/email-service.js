'use strict'

var config = require('../config')
const sendgrid = require('@sendgrid/mail')

sendgrid.setApiKey(config.sendgridKey)

exports.send = async (to, subject, body) => {
  sendgrid
    .send({
      to,
      from: process.env.SENDGRID_FROM,
      subject,
      html: body
    })
    .then(() => {
      console.log('Message sent')
    })
    .catch((error) => {
      console.log(error.response.body)
    })
}
