const checklistService = require('../services/checklist.service');

exports.createChecklist = async (req, res) => {
  const { cardId } = req.body;
  const checklist = await checklistService.createChecklist(cardId);

  res.status(201).json({
    status: 'success',
    data: { checklist },
  });
};

exports.addItem = async (req, res) => {
  const { id: checklistId } = req.params;
  const { content } = req.body;
  const item = await checklistService.addChecklistItem(checklistId, content);

  res.status(201).json({
    status: 'success',
    data: { item },
  });
};

exports.updateItemStatus = async (req, res) => {
  const { itemId } = req.params;
  const { completed } = req.body;
  const item = await checklistService.updateItemStatus(itemId, completed);

  res.status(200).json({
    status: 'success',
    data: { item },
  });
};

exports.deleteItem = async (req, res) => {
  const { itemId } = req.params;
  await checklistService.deleteItem(itemId);

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
