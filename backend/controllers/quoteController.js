import * as dataService from '../utils/inMemoryData.js';

// Get all quotes (with optional filtering)
export const getQuotes = (req, res) => {
  const filters = {};
  
  if (req.query.state) {
    filters.state = req.query.state;
  }
  
  if (req.query.roofType) {
    filters.roofType = req.query.roofType;
  }
  
  const quotes = dataService.getAllQuotes(filters);
  res.json({
    data: quotes
  });
};

// Create new quote
export const createQuote = (req, res) => {
  try {
    const quoteData = req.body;
    const newQuote = dataService.createQuote(quoteData);
    res.status(201).json(newQuote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 