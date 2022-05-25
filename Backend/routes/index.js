import express from "express";
import { getUsers, Register, Login, Logout, findUser } from "../controllers/UserController.js";
import { createService, getServices } from "../controllers/ServiceController.js";
import { createCategory, getCategories, getCategoriesbyServiceID } from "../controllers/CategoryController.js";
import { createServiceProvider, getServiceProvider, getProviderProfilebyID } from "../controllers/ServiceProviderController.js";
import { upload, getListFiles, download, getImage } from "../controllers/MediaController.js";

import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

// authentication routes
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

// user routes
router.get('/users', verifyToken, getUsers);
router.get('/user', verifyToken, findUser);

// Service routes 
router.post('/create_service', verifyToken, createService);
router.get('/services', verifyToken, getServices);

// category routes 
router.post('/create_category', verifyToken, createCategory);
router.get('/categories', verifyToken, getCategories);
router.get('/service_categories', verifyToken, getCategoriesbyServiceID);

// Service Provider Profile routes
router.post('/createProviderProfile', verifyToken, createServiceProvider);
router.get('/ProviderProfiles', verifyToken, getServiceProvider);
router.get('/ProviderProfile', verifyToken, getProviderProfilebyID);

// file upload and download
router.post("/upload", verifyToken, upload);
router.get("/files",verifyToken, getListFiles);
router.get("/file",verifyToken, getImage);
router.get("/files/download", verifyToken, download);

export default router;