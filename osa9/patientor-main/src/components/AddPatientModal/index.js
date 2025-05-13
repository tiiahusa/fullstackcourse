"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var material_1 = require("@mui/material");
var AddPatientForm_1 = __importDefault(require("./AddPatientForm"));
var AddPatientModal = function (_a) {
    var modalOpen = _a.modalOpen, onClose = _a.onClose, onSubmit = _a.onSubmit, error = _a.error;
    return (<material_1.Dialog fullWidth={true} open={modalOpen} onClose={function () { return onClose(); }}>
    <material_1.DialogTitle>Add a new patient</material_1.DialogTitle>
    <material_1.Divider />
    <material_1.DialogContent>
      {error && <material_1.Alert severity="error">{error}</material_1.Alert>}
      <AddPatientForm_1.default onSubmit={onSubmit} onCancel={onClose}/>
    </material_1.DialogContent>
  </material_1.Dialog>);
};
exports.default = AddPatientModal;
