import express, { query } from 'express';
import { handler } from './build-node/handler.js';
import proxy from 'express-http-proxy';

const app = express();

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
    res.end('ok');
});

let proxyFunc = proxy(`${process.env.PUBLIC_PB_ENDPOINT}`, {
    limit: '50mb',
    proxyReqPathResolver: function (req) {
        let endpoint = process.env.PUBLIC_PB_ENDPOINT;
        if (endpoint.endsWith('/')) {
            endpoint = endpoint.substring(0, endpoint.length - 1);
        }
        let queryStr = '';
        Object.keys(req.query).forEach(element => {
            queryStr += `${element}=${encodeURIComponent(req.query[element])}&`
        })

        const url = `${endpoint}${req.baseUrl}?${queryStr.substring(0, queryStr.length - 1)}`;
        return url;
    }
});

app.use('/api/*', proxyFunc);

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

// app.use(bodyParser.urlencoded({ limit: '50mb' }));
app.listen(3000, () => {
    console.log('listening on port 3000');
});