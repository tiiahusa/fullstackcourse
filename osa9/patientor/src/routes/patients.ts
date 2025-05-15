import { Response, Router } from 'express';
import patientService from '../services/patientService';
import { PatientEntry } from '../types';

const router = Router();

router.get('/', (_req, res: Response<PatientEntry[]>) => {
  res.send(patientService.getEntries());
});

/*router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});*/

export default router;