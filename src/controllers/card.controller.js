const cardService = require('../services/card.service');

exports.getCards = async (req, res) => {
  const cards = await cardService.getCardsByListId(req.query.listId);

  res.status(200).json({
    status: 'success',
    results: cards.length,
    data: { cards },
  });
};

exports.searchCards = async (req, res) => {
  const { query, labelId, memberId, dueDate } = req.query;
  const cards = await cardService.searchCards({ query, labelId, memberId, dueDate });

  res.status(200).json({
    status: 'success',
    results: cards.length,
    data: { cards },
  });
};

exports.createCard = async (req, res) => {
  const card = await cardService.createCard(req.body);

  res.status(201).json({
    status: 'success',
    data: { card },
  });
};

exports.updateCard = async (req, res) => {
  const card = await cardService.updateCard(req.params.id, req.body);

  res.status(200).json({
    status: 'success',
    data: { card },
  });
};

exports.deleteCard = async (req, res) => {
  await cardService.deleteCard(req.params.id);

  res.status(200).json({
    status: 'success',
    data: null,
  });
};

exports.archiveCard = async (req, res) => {
  const card = await cardService.archiveCard(req.params.id);

  res.status(200).json({
    status: 'success',
    data: { card },
  });
};

exports.reorderCard = async (req, res) => {
  const { listId, sourceIndex, destinationIndex } = req.body;
  const card = await cardService.reorderCard(listId, sourceIndex, destinationIndex);

  res.status(200).json({
    status: 'success',
    data: { card },
  });
};

exports.moveCard = async (req, res) => {
  const { cardId, sourceListId, destinationListId, destinationIndex } = req.body;
  const card = await cardService.moveCard(cardId, sourceListId, destinationListId, destinationIndex);

  res.status(200).json({
    status: 'success',
    data: { card },
  });
};

exports.addLabel = async (req, res) => {
  const { id: cardId } = req.params;
  const { labelId } = req.body;
  const assignment = await cardService.addLabel(cardId, labelId);

  res.status(201).json({
    status: 'success',
    data: { assignment },
  });
};

exports.removeLabel = async (req, res) => {
  const { id: cardId, labelId } = req.params;
  await cardService.removeLabel(cardId, labelId);

  res.status(200).json({
    status: 'success',
    message: 'Label removed successfully',
  });
};

exports.assignMember = async (req, res) => {
  const { id: cardId } = req.params;
  const { memberId } = req.body;
  const assignment = await cardService.assignMember(cardId, memberId);

  res.status(201).json({
    status: 'success',
    data: { assignment },
  });
};

exports.removeMember = async (req, res) => {
  const { id: cardId, memberId } = req.params;
  await cardService.removeMember(cardId, memberId);

  res.status(200).json({
    status: 'success',
    message: 'Member removed successfully',
  });
};
