const express = require('express');
const { z } = require('zod');
const boardController = require('../controllers/board.controller');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

// Define Zod Schema for validation
// Only title is allowed , only non-empty string allowed
const createBoardSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Board title cannot be empty')
  }),
  // These must be null
  params: z.object({}),
  query: z.object({})
});
const UpdateBord = z.object({
  body: z.object({
      title : z.string().min(1,'User should give some name')

  }),
  params: z.object({}),
  query :z.object({})
});

router
  .route('/')
  // If get req
  .get(boardController.getAllBoards)
  // if post req
  .post(validateRequest(createBoardSchema), boardController.createBoard);

router
  .route('/:id')
  .get(boardController.getBoard)
  .post( validateRequest(UpdateBoard),boardController.UpdateName);

module.exports = router;
