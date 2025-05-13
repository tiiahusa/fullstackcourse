"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var material_1 = require("@mui/material");
var types_1 = require("../../types");
var genderOptions = Object.values(types_1.Gender).map(function (v) { return ({
    value: v, label: v.toString()
}); });
var AddPatientForm = function (_a) {
    var onCancel = _a.onCancel, onSubmit = _a.onSubmit;
    var _b = (0, react_1.useState)(''), name = _b[0], setName = _b[1];
    var _c = (0, react_1.useState)(''), occupation = _c[0], setOccupation = _c[1];
    var _d = (0, react_1.useState)(''), ssn = _d[0], setSsn = _d[1];
    var _e = (0, react_1.useState)(''), dateOfBirth = _e[0], setDateOfBirth = _e[1];
    var _f = (0, react_1.useState)(types_1.Gender.Other), gender = _f[0], setGender = _f[1];
    var onGenderChange = function (event) {
        event.preventDefault();
        if (typeof event.target.value === "string") {
            var value_1 = event.target.value;
            var gender_1 = Object.values(types_1.Gender).find(function (g) { return g.toString() === value_1; });
            if (gender_1) {
                setGender(gender_1);
            }
        }
    };
    var addPatient = function (event) {
        event.preventDefault();
        onSubmit({
            name: name,
            occupation: occupation,
            ssn: ssn,
            dateOfBirth: dateOfBirth,
            gender: gender
        });
    };
    return (<div>
      <form onSubmit={addPatient}>
        <material_1.TextField label="Name" fullWidth value={name} onChange={function (_a) {
        var target = _a.target;
        return setName(target.value);
    }}/>
        <material_1.TextField label="Social security number" fullWidth value={ssn} onChange={function (_a) {
        var target = _a.target;
        return setSsn(target.value);
    }}/>
        <material_1.TextField label="Date of birth" placeholder="YYYY-MM-DD" fullWidth value={dateOfBirth} onChange={function (_a) {
        var target = _a.target;
        return setDateOfBirth(target.value);
    }}/>
        <material_1.TextField label="Occupation" fullWidth value={occupation} onChange={function (_a) {
        var target = _a.target;
        return setOccupation(target.value);
    }}/>

        <material_1.InputLabel style={{ marginTop: 20 }}>Gender</material_1.InputLabel>
        <material_1.Select label="Gender" fullWidth value={gender} onChange={onGenderChange}>
        {genderOptions.map(function (option) {
            return <material_1.MenuItem key={option.label} value={option.value}>
            {option.label}</material_1.MenuItem>;
        })}
        </material_1.Select>

        <material_1.Grid>
          <material_1.Grid item>
            <material_1.Button color="secondary" variant="contained" style={{ float: "left" }} type="button" onClick={onCancel}>
              Cancel
            </material_1.Button>
          </material_1.Grid>
          <material_1.Grid item>
            <material_1.Button style={{
            float: "right",
        }} type="submit" variant="contained">
              Add
            </material_1.Button>
          </material_1.Grid>
        </material_1.Grid>
      </form>
    </div>);
};
exports.default = AddPatientForm;
