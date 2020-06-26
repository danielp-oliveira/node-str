global.SALT_KEY = process.env.SALT_KEY
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong>, seja bem vindo à Node Store!'

module.exports = {
  connectionString: process.env.CONNECTION_STRING,
  sendgridKey: process.env.SENDGRID_API_KEY,
  containerConnectionString: 'TBD'
}
