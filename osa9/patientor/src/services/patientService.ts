import patientData from '../../data/patients';
import { PatientEntry } from '../types';

const patients: PatientEntry[] = patientData;

const getEntries = (): PatientEntry[] => {
  return patients;
};

/*const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addDiagnose = () => {
  return null;
};*/

export default {
  getEntries
};