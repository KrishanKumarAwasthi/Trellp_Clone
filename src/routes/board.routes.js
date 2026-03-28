const express = require('express');
const { z } = require('zod');
const boardController = require('../controllers/board.controller');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

// Define Zod Schema for validation
const createBoardSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Board title cannot be empty')
  }),
  params: z.object({}),
  query: z.object({})
});

router
  .route('/')
  .get(boardController.getAllBoards)
  .post(validateRequest(createBoardSchema), boardController.createBoard);

router
  .route('/:id')
  .get(boardController.getBoard);

module.exports = router;
