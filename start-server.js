import express from 'express';
import { handler } from './build-node/handler.js';
import proxy from 'express-http-proxy';

const app = express();

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
    res.end('ok');
});

let proxyFunc = proxy(`${process.env.BACK_END_URL}`, {
    limit: '50mb',
    proxyReqPathResolver: function (req) {
        var newUrl = `${process.env.BACK_END_URL}${req.baseUrl}`;
        return newUrl;
    }
});

app.use("/api/*", proxyFunc);
app.use("/graphql*", proxyFunc);

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

// app.use(bodyParser.urlencoded({ limit: '50mb' }));
app.listen(3000, () => {
    console.log('listening on port 3000');
});