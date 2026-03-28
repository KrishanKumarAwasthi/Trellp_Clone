const boardService = require('../services/board.service');

exports.getAllBoards = async (req, res) => {
  const boards = await boardService.getAllBoards();
  
  res.status(200).json({
    status: 'success',
    results: boards.length,
    data: { boards }
  });
};

exports.getBoard = async (req, res) => {
  const board = await boardService.getBoardById(req.params.id);
  
  res.status(200).json({
    status: 'success',
    data: { board }
  });
};

exports.createBoard = async (req, res) => {
  // Relying on Zod validation middleware to guarantee title exists
  const board = await boardService.createBoard(req.body.title);
  
  res.status(201).json({
    status: 'success',
    data: { board }
  });
};
