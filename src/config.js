global.SALT_KEY = process.env.SALT_KEY
global.EMAIL_TMPL = '<strong>{0}</strong>'

module.exports = {
  connectionString: process.env.CONNECTION_STRING,
  sendgridKey: 'TBD',
  containerConnectionString: 'TBD'
}
