import { Response, Router } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatientEntry } from '../types';
import toNewPatientEntry from '../utils';

const router = Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getEntries());
});

router.post('/', (_req, res) => {
  try{
    const newPatientEntry = toNewPatientEntry(_req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;