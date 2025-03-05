import express from 'express';
import { bmiCalc } from './bmiCalculator';
import { calculator } from './calculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi?', (_req, res) => {
    const height = _req.query.height;
    const weight = _req.query.weight;

    if (typeof height === 'string' && typeof weight === 'string') {
        const heightNum = parseInt(height);
        const weightNum = parseInt(weight);

        if (!isNaN(heightNum) && !isNaN(weightNum)) {
            res.send(bmiCalc(heightNum, weightNum));
        } else {
            res.status(400).send('malformatted parameters');
        }
    } else {
        res.status(400).send('malformatted parameters');
  }});

  app.post('/calculate', (req, res) => {
    const { value1, value2, op } = req.body;
  
    const result = calculator(value1, value2, op);
    res.send({ result });
  });

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});