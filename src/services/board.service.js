const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const AppError = require('../utils/AppError');

class BoardService {
  async getAllBoards() {
    return prisma.board.findMany({
      include: {
        lists: {
          include: { cards: true }
        }
      }
    });
  }

  async getBoardById(id) {
    const board = await prisma.board.findUnique({
      where: { id },
      include: {
        lists: {
          include: { 
            cards: {
              orderBy: { position: 'asc' },
              where: { isArchived: false },
              include: {
                labels: { include: { label: true } },
                members: { include: { member: true } },
                checklists: { include: { items: true } },
              }
            } 
          },
          orderBy: { position: 'asc' }
        }
      }
    });
    
    if (!board) throw new AppError('Board not found', 404);
    return board;
  }

  async createBoard(title) {
    return prisma.board.create({
      data: { title }
    });
  }
}

module.exports = new BoardService();
