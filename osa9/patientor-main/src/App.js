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
var axios_1 = __importDefault(require("axios"));
var react_router_dom_1 = require("react-router-dom");
var material_1 = require("@mui/material");
var constants_1 = require("./constants");
var patients_1 = __importDefault(require("./services/patients"));
var PatientListPage_1 = __importDefault(require("./components/PatientListPage"));
var App = function () {
    var _a = (0, react_1.useState)([]), patients = _a[0], setPatients = _a[1];
    (0, react_1.useEffect)(function () {
        void axios_1.default.get("".concat(constants_1.apiBaseUrl, "/ping"));
        var fetchPatientList = function () { return __awaiter(void 0, void 0, void 0, function () {
            var patients;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, patients_1.default.getAll()];
                    case 1:
                        patients = _a.sent();
                        setPatients(patients);
                        return [2 /*return*/];
                }
            });
        }); };
        void fetchPatientList();
    }, []);
    return (<div className="App">
      <react_router_dom_1.BrowserRouter>
        <material_1.Container>
          <material_1.Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </material_1.Typography>
          <material_1.Button component={react_router_dom_1.Link} to="/" variant="contained" color="primary">
            Home
          </material_1.Button>
          <material_1.Divider hidden/>
          <react_router_dom_1.Routes>
            <react_router_dom_1.Route path="/" element={<PatientListPage_1.default patients={patients} setPatients={setPatients}/>}/>
          </react_router_dom_1.Routes>
        </material_1.Container>
      </react_router_dom_1.BrowserRouter>
    </div>);
};
exports.default = App;
