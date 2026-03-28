const express = require('express');
const { z } = require('zod');
const listController = require('../controllers/list.controller');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

const getListsSchema = z.object({
  query: z.object({
    boardId: z.string().uuid('Invalid Board ID format'),
  }),
  params: z.object({}),
  body: z.object({}),
});

const createListSchema = z.object({
  body: z.object({
    boardId: z.string().uuid('Invalid Board ID format'),
    title: z.string().min(1, 'List title cannot be empty'),
    position: z.number({ required_error: 'Position is required for ordering' }),
  }),
  params: z.object({}),
  query: z.object({}),
});

const updateListSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'List title cannot be empty'),
  }),
  params: z.object({
    id: z.string().uuid('Invalid List ID format'),
  }),
  query: z.object({}),
});

const deleteListSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid List ID format'),
  }),
  body: z.object({}),
  query: z.object({}),
});

const reorderListSchema = z.object({
  body: z.object({
    boardId: z.string().uuid('Invalid Board ID format'),
    sourceIndex: z.number().int().min(0, 'Source index must be >= 0'),
    destinationIndex: z.number().int().min(0, 'Destination index must be >= 0'),
  }),
  params: z.object({}),
  query: z.object({}),
});

router
  .route('/')
  .get(validateRequest(getListsSchema), listController.getLists)
  .post(validateRequest(createListSchema), listController.createList);

// IMPORTANT: Fixed route mappings without variable IDs must come first!
router
  .route('/reorder')
  .put(validateRequest(reorderListSchema), listController.reorderList);

router
  .route('/:id')
  .put(validateRequest(updateListSchema), listController.updateList)
  .delete(validateRequest(deleteListSchema), listController.deleteList);

module.exports = router;
