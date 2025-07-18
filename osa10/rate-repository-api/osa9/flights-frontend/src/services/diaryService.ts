import axios from 'axios';
import type { Diary, NewDiary, ValidationError } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiarys = () => {
  return axios
    .get<Diary[]>(baseUrl)
    .then(response => response.data)
}

export const createDiary = async (object: NewDiary) => {
    try {
        const response = await axios.post<Diary>(baseUrl, object)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('Tultiin tänne');
            if (error.response) {
                const errorData = error.response.data;

            // Backend-error
            if (typeof errorData === 'string') {
                throw new Error(errorData);
            }

            // ValidationError
            if (typeof errorData === 'object' && 'message' in errorData) {
                const validationError = errorData as ValidationError;
                throw new Error(validationError.message);
            }
            } else {
                throw new Error('Tunnistamaton virhe '+ error.message);
            }
        }
    }
}
