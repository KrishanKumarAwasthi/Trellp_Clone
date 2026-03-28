const express = require('express');
const { z } = require('zod');
const labelController = require('../controllers/label.controller');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

const createLabelSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Label name cannot be empty'),
    color: z.string().startsWith('#', 'Color must be a valid hex code (start with #)'),
  }),
  params: z.object({}),
  query: z.object({}),
});

router
  .route('/')
  .get(labelController.getAllLabels)
  .post(validateRequest(createLabelSchema), labelController.createLabel);

router
  .route('/:id')
  .get(labelController.getLabel)
  .delete(labelController.deleteLabel);

module.exports = router;
