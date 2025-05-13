import { PatientFormValues } from "../../types";
interface Props {
    onCancel: () => void;
    onSubmit: (values: PatientFormValues) => void;
}
declare const AddPatientForm: ({ onCancel, onSubmit }: Props) => import("react").JSX.Element;
export default AddPatientForm;
