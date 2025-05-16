import patientData from '../../data/patients';
import { PatientEntry, NonSensitivePatientEntry } from '../types';

const patients: PatientEntry[] = patientData;

const getEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name, 
    dateOfBirth,
    gender,
    occupation
  }));
};


export default {
  getEntries
};