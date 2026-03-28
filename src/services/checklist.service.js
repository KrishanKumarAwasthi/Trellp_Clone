const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const AppError = require('../utils/AppError');

class ChecklistService {
  async createChecklist(cardId) {
    const card = await prisma.card.findUnique({ where: { id: cardId } });
    if (!card) throw new AppError('Card not found', 404);

    return prisma.checklist.create({
      data: { cardId },
    });
  }

  async addChecklistItem(checklistId, content) {
    const checklist = await prisma.checklist.findUnique({ where: { id: checklistId } });
    if (!checklist) throw new AppError('Checklist not found', 404);

    return prisma.checklistItem.create({
      data: {
        checklistId,
        content,
      },
    });
  }

  async updateItemStatus(itemId, completed) {
    const item = await prisma.checklistItem.findUnique({ where: { id: itemId } });
    if (!item) throw new AppError('Checklist item not found', 404);

    return prisma.checklistItem.update({
      where: { id: itemId },
      data: { completed },
    });
  }

  async deleteItem(itemId) {
    const item = await prisma.checklistItem.findUnique({ where: { id: itemId } });
    if (!item) throw new AppError('Checklist item not found', 404);

    await prisma.checklistItem.delete({ where: { id: itemId } });
  }
}

module.exports = new ChecklistService();
