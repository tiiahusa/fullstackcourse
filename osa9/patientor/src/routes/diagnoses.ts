import { Response, Router } from 'express';
import diagnoseService from '../services/diagnoseService';
import { DiagnoseEntry } from '../types';

const router = Router();

router.get('/', (_req, res: Response<DiagnoseEntry[]>) => {
  res.send(diagnoseService.getEntries());
});

/*router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});*/

export default router;