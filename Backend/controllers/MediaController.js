import db from "../models/index.js";
import { uploadFileMiddleware } from "../middleware/upload.js";
import path from 'path';
const __basedir = path.resolve();
const Media = db.media;

export const upload = async (req, res) => {
    try {
        await uploadFileMiddleware(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }

        let media = await Media.create({
            image_name: req.file.originalname,
            image_url: __basedir + "/resources/uploads/" + req.file.originalname,
            userID: req.body.user_id
        })
        if (media) {
            res.status(200).send({
                message: "Uploaded the file successfully: " + req.file.originalname,
            });
        }

    } catch (err) {
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname + err,
        });
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
