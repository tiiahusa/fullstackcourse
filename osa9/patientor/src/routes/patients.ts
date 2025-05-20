import { Response, Router, Request, NextFunction } from 'express';
import patientService from '../services/patientService';
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';
import { newPatientSchema } from '../utils';
import z from 'zod';

const router = Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getEntries());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    newPatientSchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
  const entry = patientService.addPatient(req.body);
  res.json(entry);
});

router.use(errorMiddleware);

export default router;