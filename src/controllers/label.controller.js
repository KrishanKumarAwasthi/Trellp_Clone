const labelService = require('../services/label.service');

exports.getAllLabels = async (req, res) => {
  const labels = await labelService.getAllLabels();

  res.status(200).json({
    status: 'success',
    results: labels.length,
    data: { labels },
  });
};

exports.createLabel = async (req, res) => {
  const { name, color } = req.body;
  const label = await labelService.createLabel({ name, color });

  res.status(201).json({
    status: 'success',
    data: { label },
  });
};

exports.getLabel = async (req, res) => {
  const label = await labelService.getLabelById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: { label },
  });
};

exports.deleteLabel = async (req, res) => {
  await labelService.deleteLabel(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
