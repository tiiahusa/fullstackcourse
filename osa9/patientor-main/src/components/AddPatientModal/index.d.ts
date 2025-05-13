import { PatientFormValues } from "../../types";
interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: PatientFormValues) => void;
    error?: string;
}
declare const AddPatientModal: ({ modalOpen, onClose, onSubmit, error }: Props) => import("react").JSX.Element;
export default AddPatientModal;
