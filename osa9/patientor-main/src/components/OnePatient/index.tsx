import { useState, useEffect } from "react";
import { Box, Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { useParams } from 'react-router-dom';

import { Patient } from "../../types";

import patientService from "../../services/patients";

const OnePatient = () => {

    const [patient, setPatient] = useState<Patient>();
    const id = useParams().id;
        
    useEffect(() => {
        const fetchPatient = async () => {
        try {
            if (id) {
            const fetchedPatient = await patientService.getOne(id);
            setPatient(fetchedPatient);
            console.log(fetchedPatient);
            }
        } catch (e) {
            console.error("vituiksi meni ", e);
        }
        };

        fetchPatient();
    }, [id]);

  return (
    <div className="App">
      {patient ? (
        <>
          <Box>
            <Typography align="center" variant="h5">
              {patient.name}{'    '}
                {patient.gender === 'male' && <MaleIcon />}
                {patient.gender === 'female' && <FemaleIcon />}
                {patient.gender != 'female' && patient.gender != 'male' && <TransgenderIcon />}
            </Typography>
          </Box>
          <div>
            <p>ssh: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <br></br>
            <h3>entries</h3>
            {patient.entries.map(entry => (
              <div key={entry.id}>
                <p>{entry.date} <i>{entry.description}</i></p>
                {entry.diagnosisCodes?.map( code => (
                  <ul>
                    <li>{code}</li>
                  </ul>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <Typography align="center">Loading...</Typography>
      )}

    </div>
  );
};

export default OnePatient;
