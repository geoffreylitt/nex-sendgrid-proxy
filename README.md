A little sendgrid api proxy, to enable requests from Airtable Scripting
Blocks without hitting CORS errors.

The Airtable block communicates with this proxy and includes a secret proxy token.
The proxy forwards requests on to Sendgrid and forwards responses to Airtable.
THe code is super simple, just one little file. It doesn't do much.

The proxy only wraps a single route: the [v3 API mail send route](https://sendgrid.com/docs/API_Reference/Web_API_v3/Mail/index.html). It could be extended to other routes but that's all we needed.

It's designed to deploy on Vercel as a serverless function.

## Deploy your own

These instructions aren't super battle-tested, if anything doesn't work
feel free to open an issue on this Github.

To deploy the proxy to [Vercel](https://vercel.com/):

### Deploy button

Click this button, which will create a copy of this github repo and import it
to Vercel to be deployed.

<a href="https://vercel.com/import/project?template=https://github.com/geoffreylitt/nex-sendgrid-proxy" >
  <img src="https://vercel.com/button" alt="Deploy" />
</a>

Then you'll need to set two environment variables in your Vercel settings:

* `SENDGRID_API_KEY`: your API key on Sendgrid
* `SENDGRID_PROXY_TOKEN`: make up a long secret string. Your Airtable block will use this as a password.

### Manual deployment

If you don't want to use the button, then clone this repo,
install the [Vercel CLI](https://vercel.com/download) and
type `now` on the command line in this repo.
