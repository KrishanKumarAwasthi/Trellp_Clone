const express = require('express');
const { z } = require('zod');
const checklistController = require('../controllers/checklist.controller');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

const createChecklistSchema = z.object({
  body: z.object({
    cardId: z.string().uuid('Invalid Card ID format'),
  }),
  params: z.object({}),
  query: z.object({}),
});

const addItemSchema = z.object({
  body: z.object({
    content: z.string().min(1, 'Item content cannot be empty'),
  }),
  params: z.object({
    id: z.string().uuid('Invalid Checklist ID format'),
  }),
  query: z.object({}),
});

const updateItemSchema = z.object({
  body: z.object({
    completed: z.boolean(),
  }),
  params: z.object({
    itemId: z.string().uuid('Invalid Item ID format'),
  }),
  query: z.object({}),
});

const deleteItemSchema = z.object({
  params: z.object({
    itemId: z.string().uuid('Invalid Item ID format'),
  }),
  body: z.object({}),
  query: z.object({}),
});

router
  .route('/')
  .post(validateRequest(createChecklistSchema), checklistController.createChecklist);

router
  .route('/:id/items')
  .post(validateRequest(addItemSchema), checklistController.addItem);

router
  .route('/items/:itemId')
  .put(validateRequest(updateItemSchema), checklistController.updateItemStatus)
  .delete(validateRequest(deleteItemSchema), checklistController.deleteItem);

module.exports = router;
