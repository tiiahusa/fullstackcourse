import { NewPatientEntry, Gender } from './types';

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseName = (comment: unknown): string => {
    if (!isString(comment)) {
      throw new Error('Incorrect or missing name');
    }
  
    return comment;
};

const parseGender = (gender: unknown): Gender => {
    if(!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

const parseSsn = (comment: unknown): string => {
    if (!isString(comment)) {
      throw new Error('Incorrect or missing SSN');
    }
  
    return comment;
};

const parseOccupation = (comment: unknown): string => {
    if (!isString(comment)) {
      throw new Error('Incorrect or missing SSN');
    }
  
    return comment;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
        const newEntry: NewPatientEntry = {
          name: parseName(object.name),
          dateOfBirth: parseDate(object.dateOfBirth),
          ssn: parseSsn(object.ssn), 
          gender: parseGender(object.gender),
          occupation: parseOccupation(object.occupation)
        };
    
        return newEntry;
    }
    
    throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;