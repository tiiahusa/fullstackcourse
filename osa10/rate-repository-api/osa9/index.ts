/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { bmiCalc } from './bmiCalculator';
//import { calculator, Operation } from './calculator';
import { exCalc } from './exerciseCalculator';
const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;

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

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;
    if(Array.isArray(daily_exercises) && typeof target === 'number'){
        if(!daily_exercises.length || !target ) {
            res.status(400).send({ error: 'parameters missing'});
        } else if (isNaN(Number(target)) || !Array.isArray(daily_exercises) ) {
            res.status(400).send({ error: 'malformatted parameters'});
          } else {
          const result = exCalc(daily_exercises, Number(target));
          res.send({ result });
        }
    } else res.status(400).send({error: 'malformatted parameters'});

  });

/*app.post('/calculate', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { value1, value2, op } = req.body;
  
    if(!value1 || isNaN(Number(value1)) || !value2 || isNaN(Number(value2))) {
        return res.status(400).send({ error: '...'});
    }
    const operation = op as Operation;
    const result = calculator(Number(value1), Number(value2), operation);
    return res.send({ result });
  });*/

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});