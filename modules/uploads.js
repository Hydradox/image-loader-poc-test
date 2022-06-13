// Import modules
import { join, sep } from 'path';
import imgParser from './image-parser.js';
import { renameSync } from 'fs';


// Import NPM modules
import { IncomingForm } from "formidable";




export default {
    upload: (req, res) => {
        const form = new IncomingForm({
            keepExtensions: true,
            maxFileSize: 500 * 1024 * 1024, // 500 MB
            multiples: true,
            uploadDir: join(process.cwd(), 'data')
        });




        form.parse(req, (error, fields, files) => {

            // Iterate through all photos
            for(let i = 0; i < files['photos-input'].length; i++) {
                let path = files['photos-input'][i].filepath;
                let newName = path.split(sep).pop();
                let ext = '.' + newName.split('.').pop().toLowerCase();

                // Pop last elements from path and add new name
                newName = newName.substring(0, newName.lastIndexOf('.')) + ext;
                path = path.substring(0, path.lastIndexOf(sep)) + sep + newName;

                renameSync(files['photos-input'][i].filepath, join(process.cwd(), 'data', newName));

                // Log
                console.log('\nPath:', path);
                console.log('Uploaded file:', newName + '\n');
                
                imgParser.createThumbnails(path, newName);
            }
        });
    }
}