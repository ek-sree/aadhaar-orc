import express from 'express';
import Controller from '../controller/aadhaarController.js';
import upload from '../utils/multer.js';

const controller = new Controller()

const router = express.Router();

router.post('/postAadhar',upload.fields([{name:'frontImage'}, {name:"backImage"}]) ,controller.postAadhaar)

export default router;