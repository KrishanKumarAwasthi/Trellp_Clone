const express = require('express');
const { z } = require('zod');
const cardController = require('../controllers/card.controller');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

const getCardsSchema = z.object({
  query: z.object({
    listId: z.string().uuid('Invalid List ID format'),
  }),
  params: z.object({}),
  body: z.object({}),
});

const searchCardsSchema = z.object({
  query: z.object({
    query: z.string().optional(),
    labelId: z.string().uuid('Invalid label ID filter').optional(),
    memberId: z.string().uuid('Invalid member ID filter').optional(),
    dueDate: z.string().datetime({ message: 'Must be ISO 8601 date format' }).optional()
  }),
  params: z.object({}),
  body: z.object({}),
});

const createCardSchema = z.object({
  body: z.object({
    listId: z.string().uuid('Invalid List ID format'),
    title: z.string().min(1, 'Card title cannot be empty'),
    description: z.string().optional(),
    dueDate: z.string().datetime().optional(), // optionally handle dueDate setup
    position: z.number({ required_error: 'Position is required for ordering' }),
  }),
  params: z.object({}),
  query: z.object({}),
});

const updateCardSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional().nullable(),
    listId: z.string().uuid().optional(),
    position: z.number().optional(),
  }),
  params: z.object({
    id: z.string().uuid('Invalid Card ID format'),
  }),
  query: z.object({}),
});

const deleteCardSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid Card ID format'),
  }),
  body: z.object({}),
  query: z.object({}),
});

const reorderCardSchema = z.object({
  body: z.object({
    listId: z.string().uuid('Invalid List ID format'),
    sourceIndex: z.number().int().min(0, 'Source index must be >= 0'),
    destinationIndex: z.number().int().min(0, 'Destination index must be >= 0'),
  }),
  params: z.object({}),
  query: z.object({}),
});

const moveCardSchema = z.object({
  body: z.object({
    cardId: z.string().uuid('Invalid Card ID format'),
    sourceListId: z.string().uuid('Invalid Source List ID format'),
    destinationListId: z.string().uuid('Invalid Destination List ID format'),
    destinationIndex: z.number().int().min(0, 'Destination index must be >= 0'),
  }),
  params: z.object({}),
  query: z.object({}),
});

router
  .route('/')
  .get(validateRequest(getCardsSchema), cardController.getCards)
  .post(validateRequest(createCardSchema), cardController.createCard);

const addLabelSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({ labelId: z.string().uuid('Invalid Label ID') }),
  query: z.object({}),
});

const removeLabelSchema = z.object({
  params: z.object({ 
    id: z.string().uuid(),
    labelId: z.string().uuid()
  }),
  body: z.object({}),
  query: z.object({}),
});

const addMemberSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({ memberId: z.string().uuid('Invalid Member ID') }),
  query: z.object({}),
});

const removeMemberSchema = z.object({
  params: z.object({ 
    id: z.string().uuid(),
    memberId: z.string().uuid()
  }),
  body: z.object({}),
  query: z.object({}),
});

// Routing specific paths before parametric paths!
router
  .route('/search')
  .get(validateRequest(searchCardsSchema), cardController.searchCards);

router
  .route('/reorder')
  .put(validateRequest(reorderCardSchema), cardController.reorderCard);

router
  .route('/move')
  .put(validateRequest(moveCardSchema), cardController.moveCard);

router
  .route('/:id')
  .put(validateRequest(updateCardSchema), cardController.updateCard)
  .delete(validateRequest(deleteCardSchema), cardController.deleteCard);

router
  .route('/:id/labels')
  .post(validateRequest(addLabelSchema), cardController.addLabel);

router
  .route('/:id/labels/:labelId')
  .delete(validateRequest(removeLabelSchema), cardController.removeLabel);

router
  .route('/:id/members')
  .post(validateRequest(addMemberSchema), cardController.assignMember);

router
  .route('/:id/members/:memberId')
  .delete(validateRequest(removeMemberSchema), cardController.removeMember);

module.exports = router;
