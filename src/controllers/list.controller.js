const listService = require('../services/list.service');

exports.getLists = async (req, res) => {
  // Extract boardId from query strings
  const lists = await listService.getListsByBoardId(req.query.boardId);

  res.status(200).json({
    status: 'success',
    results: lists.length,
    data: { lists },
  });
};

exports.createList = async (req, res) => {
  const { boardId, title, position } = req.body;
  const list = await listService.createList(boardId, title, position);

  res.status(201).json({
    status: 'success',
    data: { list },
  });
};

exports.updateList = async (req, res) => {
  const list = await listService.updateListTitle(req.params.id, req.body.title);

  res.status(200).json({
    status: 'success',
    data: { list },
  });
};

exports.deleteList = async (req, res) => {
  await listService.deleteList(req.params.id);

  res.status(200).json({
    status: 'success',
    data: null,
  });
};

exports.reorderList = async (req, res) => {
  const { boardId, sourceIndex, destinationIndex } = req.body;
  const list = await listService.reorderList(boardId, sourceIndex, destinationIndex);

  res.status(200).json({
    status: 'success',
    data: { list },
  });
};
