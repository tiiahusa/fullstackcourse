import { z } from 'zod'; //Tyyppiparseri
import { NewDiaryEntry, Weather, Visibility } from './types';

/*
Nämä sai poistaa z:n käyttöönoton vuoksi

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isWeather = (param: string): param is Weather => {
    return Object.values(Weather).map(v => v.toString()).includes(param);
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseWeather = (weather: unknown): Weather => {
    if (!isString(weather) || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather: ' + weather);
    }
    return weather;
};*/

export const newEntrySchema = z.object({
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  date: z.string().date(),
  comment: z.string().optional()
});


export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  return newEntrySchema.parse(object);
};
