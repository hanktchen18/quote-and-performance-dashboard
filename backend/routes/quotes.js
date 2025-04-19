import express from 'express';
import { getQuotes, createQuote } from '../controllers/quoteController.js';

const router = express.Router();

router.get('/', getQuotes);

router.post('/', createQuote);

export default router; 