const got = require('got');

export default (req, res) => {
  if (req.body) {
    const { sendgridData } = req.body
  }

  const { proxy_token } = req.query
  if (proxy_token && proxy_token === process.env.SENDGRID_PROXY_TOKEN) {
    // const sendgridData = {
    //     "personalizations": [
    //         {
    //         "to": [
    //             {
    //               "email": "gklitt@gmail.com"
    //             }
    //         ],
    //         "subject": "Hello, World Test!"
    //         }
    //     ],
    //     "from": {
    //         "name": "Neighbor Express",
    //         "email": "noreply@neighborexpress.org"
    //     },
    //     "reply_to": {
    //         "name": "Neighbor Express",
    //         "email": "neighborexpress@gmail.com"
    //     },
    //     "content": [
    //         {
    //         "type": "text/plain",
    //         "value": "Hello, World!"
    //         }
    //     ]
    // }

    got.post(
      "https://api.sendgrid.com/v3/mail/send",
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`
        },
        json: sendgridData,
      }
    ).then(
      (response) => {
        console.log("response", response.body);
        if (response.statusCode === 202) {
          res.status(202).send("sent")
        } else {
          res.status(500).send(`error, status ${response.statusCode}`)
        }
      },
      (error) => {
        res.status(500).send("sendgrid error")
      }
    )
  } else {
    res.status(403).send(`Incorrect proxy token`)
  }
}
