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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var pollers_1 = require("./modules/pollers");
var get_range_1 = require("./modules/get-range");
var ssh_client_1 = require("./modules/ssh-client");
var NetworkScannerLite = /** @class */ (function () {
    function NetworkScannerLite() {
        this.repeat = 5;
        this.timeout = 3;
    }
    ;
    Object.defineProperty(NetworkScannerLite.prototype, "pollCount", {
        get: function () { return this.repeat; },
        set: function (n) { this.repeat = n; },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(NetworkScannerLite.prototype, "timeoutInterval", {
        get: function () { return this.timeout; },
        set: function (n) { this.timeout = n; },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    NetworkScannerLite.prototype.ping = function (host, repeat) {
        return __awaiter(this, void 0, void 0, function () {
            var ping;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!repeat) {
                            repeat = 1;
                        }
                        ;
                        return [4 /*yield*/, pollers_1.poll(host, repeat, this.timeout)];
                    case 1:
                        ping = _a.sent();
                        return [2 /*return*/, ping];
                }
            });
        });
    };
    ;
    NetworkScannerLite.prototype.clusterPing = function (hosts) {
        return __awaiter(this, void 0, void 0, function () {
            var poll;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pollers_1.clusterPoll(hosts, this.repeat, this.timeout)];
                    case 1:
                        poll = _a.sent();
                        return [2 /*return*/, poll];
                }
            });
        });
    };
    ;
    NetworkScannerLite.prototype.globalPing = function (networks) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pollers_1.globalPoll(networks, this.repeat, this.timeout)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    ;
    NetworkScannerLite.prototype.ipScan = function (range) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(get_range_1.getRange(range).map(function (ipAddress) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, alive, numeric_host, err_1;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, this.ping({ ipAddress: ipAddress })];
                                    case 1:
                                        _a = _b.sent(), alive = _a.alive, numeric_host = _a.numeric_host;
                                        return [2 /*return*/, { alive: alive, numeric_host: numeric_host }];
                                    case 2:
                                        err_1 = _b.sent();
                                        throw err_1;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ;
    NetworkScannerLite.prototype.ssh = function (host, username, command, identity) {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ssh_client_1.sshClient(host, username, command, identity)];
                    case 1:
                        client = _a.sent();
                        return [2 /*return*/, client];
                }
            });
        });
    };
    ;
    return NetworkScannerLite;
}());
;
exports.default = NetworkScannerLite;
