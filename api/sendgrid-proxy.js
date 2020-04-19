export default (req, res) => {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { proxy_token } = req.query
  if (proxy_token && proxy_token === process.env.SENDGRID_PROXY_TOKEN) {
    console.log("proxy token correct")
    const msg = {
      to: 'gklitt@gmail.com',
      from: 'gklitt@gmail.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg).then(
      (success) => {
        res.json(success)
      }, error => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body)
        }
      res.status(500).json(error)
    });
  } else {
    res.status(403).send(`Incorrect proxy token`)
  }
}
