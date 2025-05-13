import { Patient } from "../../types";
interface Props {
    patients: Patient[];
    setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}
declare const PatientListPage: ({ patients, setPatients }: Props) => import("react").JSX.Element;
export default PatientListPage;
