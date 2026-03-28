const memberService = require('../services/member.service');

exports.getAllMembers = async (req, res) => {
  const members = await memberService.getAllMembers();

  res.status(200).json({
    status: 'success',
    results: members.length,
    data: { members },
  });
};

exports.getMember = async (req, res) => {
  const member = await memberService.getMemberById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: { member },
  });
};

exports.createMember = async (req, res) => {
  const { name } = req.body;
  const member = await memberService.createMember({ name });

  res.status(201).json({
    status: 'success',
    data: { member },
  });
};

exports.deleteMember = async (req, res) => {
  await memberService.deleteMember(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
