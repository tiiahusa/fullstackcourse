import diagnoseData from '../../data/diagnoses';
import { DiagnoseEntry } from '../types';

const diagnoses: DiagnoseEntry[] = diagnoseData;

const getEntries = (): DiagnoseEntry[] => {
  return diagnoses;
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