"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var material_1 = require("@mui/material");
var axios_1 = __importDefault(require("axios"));
var AddPatientModal_1 = __importDefault(require("../AddPatientModal"));
var HealthRatingBar_1 = __importDefault(require("../HealthRatingBar"));
var patients_1 = __importDefault(require("../../services/patients"));
var PatientListPage = function (_a) {
    var patients = _a.patients, setPatients = _a.setPatients;
    var _b = (0, react_1.useState)(false), modalOpen = _b[0], setModalOpen = _b[1];
    var _c = (0, react_1.useState)(), error = _c[0], setError = _c[1];
    var openModal = function () { return setModalOpen(true); };
    var closeModal = function () {
        setModalOpen(false);
        setError(undefined);
    };
    var submitNewPatient = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var patient, e_1, message;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, patients_1.default.create(values)];
                case 1:
                    patient = _c.sent();
                    setPatients(patients.concat(patient));
                    setModalOpen(false);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _c.sent();
                    if (axios_1.default.isAxiosError(e_1)) {
                        if (((_a = e_1 === null || e_1 === void 0 ? void 0 : e_1.response) === null || _a === void 0 ? void 0 : _a.data) && typeof ((_b = e_1 === null || e_1 === void 0 ? void 0 : e_1.response) === null || _b === void 0 ? void 0 : _b.data) === "string") {
                            message = e_1.response.data.replace('Something went wrong. Error: ', '');
                            console.error(message);
                            setError(message);
                        }
                        else {
                            setError("Unrecognized axios error");
                        }
                    }
                    else {
                        console.error("Unknown error", e_1);
                        setError("Unknown error");
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="App">
      <material_1.Box>
        <material_1.Typography align="center" variant="h6">
          Patient list
        </material_1.Typography>
      </material_1.Box>
      <material_1.Table style={{ marginBottom: "1em" }}>
        <material_1.TableHead>
          <material_1.TableRow>
            <material_1.TableCell>Name</material_1.TableCell>
            <material_1.TableCell>Gender</material_1.TableCell>
            <material_1.TableCell>Occupation</material_1.TableCell>
            <material_1.TableCell>Health Rating</material_1.TableCell>
          </material_1.TableRow>
        </material_1.TableHead>
        <material_1.TableBody>
          {Object.values(patients).map(function (patient) { return (<material_1.TableRow key={patient.id}>
              <material_1.TableCell>{patient.name}</material_1.TableCell>
              <material_1.TableCell>{patient.gender}</material_1.TableCell>
              <material_1.TableCell>{patient.occupation}</material_1.TableCell>
              <material_1.TableCell>
                <HealthRatingBar_1.default showText={false} rating={1}/>
              </material_1.TableCell>
            </material_1.TableRow>); })}
        </material_1.TableBody>
      </material_1.Table>
      <AddPatientModal_1.default modalOpen={modalOpen} onSubmit={submitNewPatient} error={error} onClose={closeModal}/>
      <material_1.Button variant="contained" onClick={function () { return openModal(); }}>
        Add New Patient
      </material_1.Button>
    </div>);
};
exports.default = PatientListPage;
