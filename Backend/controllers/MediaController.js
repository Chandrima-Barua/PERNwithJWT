import db from "../models/index.js";
import { uploadFileMiddleware } from "../middleware/upload.js";
import path from 'path';
import multer from "multer";
import fs from 'fs';

const __basedir = path.resolve();
const Media = db.media;
const mediaEvent = db.mediaEvent;
const mediaInstrument = db.mediaInstrument;
const mediaGallery = db.mediaGallery;
const maxSize = 2 * 1024 * 1024;

export const upload = async (req, res) => {
  try {
    const mediagalleryFilesArray = req.body.fieldArrayMedia;
    const profilePictureArray = req.body.profilePicture;
    console.log(mediagalleryFilesArray)
    console.log(profilePictureArray)

    const upload = multer({ dest: 'resources/uploads' ,limits: { fileSize: maxSize }});
    upload.any()(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // Handle multer-specific errors
        console.error(err);
        return res.status(400).json({ error: 'File upload error', message: err.message });
      } else if (err) {
        // Handle other errors
        console.error(err);
        return res.status(500).json({ error: 'File upload failed' });
      }
      var files = req.files;
      console.log(files);

    files.forEach(file => {
        const { fieldname, filename } = file;
        
        if (fieldname.includes('profilePicture') || fieldname.includes('fieldArrayMedia')) {
      
           Media.create({
            filename: file.originalname,
            mimetype: file.mimetype,
            path: __basedir + "/resources/uploads/" + file.originalname,
            userId: 1 //for testing purpose 
          })
            .then(media => {
                // mediaGallery.create({
                //     mediaID: media.id,
                //     mediaEventID: file.mimetype,
                //     path: __basedir + "/resources/uploads/" + file.originalname,
                //     userId: 1 //for testing purpose 
                //   })
                //     .then(media => {
                //       console.log('Uploaded the file successfully:', media.filename);
                //     })
                //     .catch(error => {
                //       console.error('Error uploading files:', error);
                //     });
              console.log('Uploaded the file successfully:', media.filename);
            })
            .catch(error => {
              console.error('Error uploading files:', error);
            });
            
        }
      });
// After all files are uploaded, send the response
res.status(200).send({
    message: 'Files uploaded successfully.',
  });      
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading files.');
  }
};


export const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/resources/uploads/";
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }
        let fileInfos = [];
        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
        });
        res.status(200).send(fileInfos);
    });
};

export const getImage = async (req, res) => {
    try {
        const images = await Media.findAll({
            where: { userID: req.body.user_id },

        })
        res.json(images);
    } catch (error) {
        console.log(error);
    }
}
export const download = (req, res) => {
    const fileName = req.body.name;
    const directoryPath = __basedir + "/resources/uploads/";
    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};

// get all media events
export const getMediaEvents = async (req, res) => {
    try {
        const allMediaEvents = await mediaEvent.findAll({
        });
        res.json(allMediaEvents);
    } catch (error) {
        console.log(error);
    }
}

// get all media instruments
export const getMediaInstruments = async (req, res) => {
    try {
        const allMediaInstruments = await mediaInstrument.findAll({
        });
        res.json(allMediaInstruments);
    } catch (error) {
        console.log(error);
    }
}



 



