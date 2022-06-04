// Import modules
import { join } from 'path';
import express from 'express';

import uploads from './uploads.js';
import fs from 'fs';

var app;




export default {
    // Initialize config
    init: () => {
        app = express();


        // Set middleware
        app.set('port', process.env.PORT || 3000);
        app.use(express.static(join(process.cwd(), 'public')));




        setRoutes();
        app.listen(app.get('port'), () => {
            console.log('Listening on port', app.get('port'));
        });
    }
}






/**
 * Set routes
 */
const setRoutes = () => {
    app.post('/upload', (req, res) => {
        uploads.upload(req, res);
    })



    app.get('/get-imgs', (req, res) => {
        let thumbsRoute = join(process.cwd(), 'data');

        // Read names of all files in directory
        let files = fs.readdirSync(thumbsRoute);
        files.shift(); // Remove .thumbnails folder
        res.send(files);
    })



    app.get('/thumbnail/:name', (req, res) => {
        res.sendFile(join(process.cwd(), 'data', '.thumbnails', '.grid', req.params.name));
    })

    app.get('/img/:name', (req, res) => {
        res.sendFile(join(process.cwd(), 'data', '.thumbnails', '.fullscreen', req.params.name));
    })


    app.get('*', (req, res) => {
        res.sendFile(join(process.cwd(), 'public', 'index.html'));
    });
}