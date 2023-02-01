import express from 'express';
import {
    searchByQueryType
} from '../controllers/filter.js'
const router = express.Router()


router.route('/search').post(searchByQueryType);

export default router  
