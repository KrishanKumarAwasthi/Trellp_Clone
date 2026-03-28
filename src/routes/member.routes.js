const express = require('express');
const { z } = require('zod');
const memberController = require('../controllers/member.controller');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

const createMemberSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Member name cannot be empty'),
  }),
  params: z.object({}),
  query: z.object({}),
});

router
  .route('/')
  .get(memberController.getAllMembers)
  .post(validateRequest(createMemberSchema), memberController.createMember);

router
  .route('/:id')
  .get(memberController.getMember)
  .delete(memberController.deleteMember);

module.exports = router;
