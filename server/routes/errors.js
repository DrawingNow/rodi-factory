const express = require('express');
const router = express.Router();

// mockup
const errorByDevice = [
  { ...{ data: [1, 5, 3, 4, 2], label: 'error 1' }, stack: 'total' },
  { ...{ data: [5, 12, 7, 9, 2], label: 'error 2' }, stack: 'total' },
  { ...{ data: [11, 0, 4, 5, 1], label: 'error 3' }, stack: 'total' },
];

const errorByYear = [{ data: [66, 73, 30, 30, 22, 50, 67] }];

const errorByType = [
  {
    label: 'type 1',
    value: 72.72,
  },
  {
    label: 'type 2',
    value: 16.38,
  },
  {
    label: 'type 3',
    value: 3.83,
  },
  {
    label: 'type 4',
    value: 2.42,
  },
  {
    label: 'type 5',
    value: 4.65,
  },
];

router.get('/by-device', (req, res) => {
  res.json(errorByDevice);
});

router.get('/by-year', (req, res) => {
  res.json(errorByYear);
});

router.get('/by-type', (req, res) => {
  res.json(errorByType);
});

module.exports = router;
