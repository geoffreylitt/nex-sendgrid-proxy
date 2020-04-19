const got = require('got');

export default (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  let sendgridData;

  if (req.query && req.query["test_data"] === "true") {
    sendgridData = {
        "personalizations": [
            {
            "to": [
                {
                  "email": "gklitt@gmail.com"
                }
            ],
            "subject": "Hello, World Test!"
            }
        ],
        "from": {
            "name": "Neighbor Express",
            "email": "noreply@neighborexpress.org"
        },
        "reply_to": {
            "name": "Neighbor Express",
            "email": "neighborexpress@gmail.com"
        },
        "content": [
            {
            "type": "text/plain",
            "value": "Hello, World!"
            }
        ]
    }
  } else if (req.body) {
    sendgridData = JSON.parse(req.body)
  } else {
    res.status(500).send("body payload required")
    return;
  }

  const { proxy_token } = req.query
  if (proxy_token && proxy_token === process.env.SENDGRID_PROXY_TOKEN) {

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
          return;
        } else {
          res.status(500).send(`error, status ${response.statusCode}`)
          return;
        }
      },
      (error) => {
        res.status(500).send("sendgrid error")
        return;
      }
    )
  } else {
    res.status(403).send(`Incorrect proxy token`)
    return;
  }
}
