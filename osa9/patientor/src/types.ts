import { newPatientSchema } from "./utils";
import z from 'zod';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = z.infer<typeof newPatientSchema>; 

export interface PatientEntry extends NewPatientEntry {
  id: string;
  entries: Entry[];
}