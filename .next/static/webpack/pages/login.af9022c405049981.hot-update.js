"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/login",{

/***/ "./pages/login.js":
/*!************************!*\
  !*** ./pages/login.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Login; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _barrel_optimize_names_Box_Button_Card_CardContent_Container_Grid_TextField_Typography_mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=Box,Button,Card,CardContent,Container,Grid,TextField,Typography!=!@mui/material */ \"__barrel_optimize__?names=Box,Button,Card,CardContent,Container,Grid,TextField,Typography!=!./node_modules/@mui/material/index.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _assets_login_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/login.png */ \"./assets/login.png\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction Login() {\n    _s();\n    const [email, setEmail] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [password, setPassword] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const handleSubmit = async (e)=>{\n        e.preventDefault();\n        const res = await fetch(\"http://localhost:5001/api/auth/login\", {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                email,\n                password\n            })\n        });\n        if (res.ok) {\n            const data = await res.json();\n            localStorage.setItem(\"token\", data.token);\n            router.push(\"/\");\n        } else {\n            console.error(\"Error logging in\");\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Card_CardContent_Container_Grid_TextField_Typography_mui_material__WEBPACK_IMPORTED_MODULE_5__.Container, {\n        maxWidth: \"lg\",\n        sx: {\n            display: \"flex\",\n            alignItems: \"center\",\n            justifyContent: \"center\",\n            height: \"100vh\"\n        },\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Card_CardContent_Container_Grid_TextField_Typography_mui_material__WEBPACK_IMPORTED_MODULE_5__.Card, {\n            sx: {\n                display: \"flex\",\n                width: \"100%\",\n                maxWidth: 1000,\n                p: 8,\n                borderRadius: 20\n            },\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Card_CardContent_Container_Grid_TextField_Typography_mui_material__WEBPACK_IMPORTED_MODULE_5__.Grid, {\n                container: true,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Card_CardContent_Container_Grid_TextField_Typography_mui_material__WEBPACK_IMPORTED_MODULE_5__.Grid, {\n                        item: true,\n                        xs: 12,\n                        md: 6,\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Card_CardContent_Container_Grid_TextField_Typography_mui_material__WEBPACK_IMPORTED_MODULE_5__.Box, {\n                            sx: {\n                                position: \"relative\",\n                                width: \"100%\",\n                                height: \"100%\",\n                                minHeight: 400\n                            },\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_3___default()), {\n                                src: _assets_login_png__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n                                alt: \"Login\",\n                                layout: \"fill\",\n                                objectFit: \"cover\",\n                                quality: 100\n                            }, void 0, false, {\n                                fileName: \"/Users/salomon/Documents/Projects/todo-list-app/pages/login.js\",\n                                lineNumber: 60,\n                                columnNumber: 15\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/Users/salomon/Documents/Projects/todo-list-app/pages/login.js\",\n                            lineNumber: 52,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/salomon/Documents/Projects/todo-list-app/pages/login.js\",\n                        lineNumber: 51,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Card_CardContent_Container_Grid_TextField_Typography_mui_material__WEBPACK_IMPORTED_MODULE_5__.Grid, {\n                        item: true,\n                        xs: 12,\n                        md: 6,\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Card_CardContent_Container_Grid_TextField_Typography_mui_material__WEBPACK_IMPORTED_MODULE_5__.CardContent, {\n                            sx: {\n                                display: \"flex\",\n                                flexDirection: \"column\",\n                                alignItems: \"center\",\n                                justifyContent: \"center\",\n                                height: \"100%\",\n                                padding: 4\n                            },\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Card_CardContent_Container_Grid_TextField_Typography_mui_material__WEBPACK_IMPORTED_MODULE_5__.Typography, {\n                                    component: \"h1\",\n                                    variant: \"h4\",\n                                    mb: 3,\n                                    children: \"Login\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/salomon/Documents/Projects/todo-list-app/pages/login.js\",\n                                    lineNumber: 80,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                                    onSubmit: handleSubmit,\n                                    style: {\n                                        width: \"100%\"\n                                    },\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Card_CardContent_Container_Grid_TextField_Typography_mui_material__WEBPACK_IMPORTED_MODULE_5__.TextField, {\n                                            variant: \"outlined\",\n                                            margin: \"normal\",\n                                            required: true,\n                                            fullWidth: true,\n                                            label: \"Email\",\n                                            type: \"email\",\n                                            value: email,\n                                            onChange: (e)=>setEmail(e.target.value),\n                                            autoComplete: \"email\",\n                                            autoFocus: true\n                                        }, void 0, false, {\n                                            fileName: \"/Users/salomon/Documents/Projects/todo-list-app/pages/login.js\",\n                                            lineNumber: 84,\n                                            columnNumber: 17\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Card_CardContent_Container_Grid_TextField_Typography_mui_material__WEBPACK_IMPORTED_MODULE_5__.TextField, {\n                                            variant: \"outlined\",\n                                            margin: \"normal\",\n                                            required: true,\n                                            fullWidth: true,\n                                            label: \"Password\",\n                                            type: \"password\",\n                                            value: password,\n                                            onChange: (e)=>setPassword(e.target.value),\n                                            autoComplete: \"current-password\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/salomon/Documents/Projects/todo-list-app/pages/login.js\",\n                                            lineNumber: 96,\n                                            columnNumber: 17\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_Card_CardContent_Container_Grid_TextField_Typography_mui_material__WEBPACK_IMPORTED_MODULE_5__.Button, {\n                                            type: \"submit\",\n                                            fullWidth: true,\n                                            variant: \"contained\",\n                                            color: \"primary\",\n                                            sx: {\n                                                mt: 2,\n                                                mb: 2,\n                                                textTransform: \"none\",\n                                                borderRadius: 10\n                                            },\n                                            children: \"Login\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/salomon/Documents/Projects/todo-list-app/pages/login.js\",\n                                            lineNumber: 107,\n                                            columnNumber: 17\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/Users/salomon/Documents/Projects/todo-list-app/pages/login.js\",\n                                    lineNumber: 83,\n                                    columnNumber: 15\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/salomon/Documents/Projects/todo-list-app/pages/login.js\",\n                            lineNumber: 70,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/salomon/Documents/Projects/todo-list-app/pages/login.js\",\n                        lineNumber: 69,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/salomon/Documents/Projects/todo-list-app/pages/login.js\",\n                lineNumber: 50,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/salomon/Documents/Projects/todo-list-app/pages/login.js\",\n            lineNumber: 49,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/salomon/Documents/Projects/todo-list-app/pages/login.js\",\n        lineNumber: 40,\n        columnNumber: 5\n    }, this);\n}\n_s(Login, \"Rc5QvcEU7xRaqjB2jUCdBs6Apgc=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = Login;\nvar _c;\n$RefreshReg$(_c, \"Login\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q1JlLE9BQU07NENBQ05yQyxJQUFJO2dEQUFFc0MsSUFBSTtnREFBR2YsSUFBSTtnREFBR2dCLGVBQWU7Z0RBQVFoQyxjQUFjOzRDQUFFO3NEQUM1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVWpCO0dBM0d3QmpDOztRQUdQWCxrREFBU0E7OztLQUhGVyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9sb2dpbi5qcz84MWIwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCB7XG4gIENvbnRhaW5lcixcbiAgVGV4dEZpZWxkLFxuICBCdXR0b24sXG4gIFR5cG9ncmFwaHksXG4gIEJveCxcbiAgR3JpZCxcbiAgQ2FyZCxcbiAgQ2FyZENvbnRlbnQsXG59IGZyb20gXCJAbXVpL21hdGVyaWFsXCI7XG5pbXBvcnQgSW1hZ2UgZnJvbSBcIm5leHQvaW1hZ2VcIjtcbmltcG9ydCBsb2dpbkltYWdlIGZyb20gXCIuLi9hc3NldHMvbG9naW4ucG5nXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExvZ2luKCkge1xuICBjb25zdCBbZW1haWwsIHNldEVtYWlsXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbcGFzc3dvcmQsIHNldFBhc3N3b3JkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMS9hcGkvYXV0aC9sb2dpblwiLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGVtYWlsLCBwYXNzd29yZCB9KSxcbiAgICB9KTtcbiAgICBpZiAocmVzLm9rKSB7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9rZW5cIiwgZGF0YS50b2tlbik7XG4gICAgICByb3V0ZXIucHVzaChcIi9cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBsb2dnaW5nIGluXCIpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxDb250YWluZXJcbiAgICAgIG1heFdpZHRoPVwibGdcIlxuICAgICAgc3g9e3tcbiAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxuICAgICAgICBoZWlnaHQ6IFwiMTAwdmhcIixcbiAgICAgIH19XG4gICAgPlxuICAgICAgPENhcmQgc3g9e3sgZGlzcGxheTogXCJmbGV4XCIsIHdpZHRoOiBcIjEwMCVcIiwgbWF4V2lkdGg6IDEwMDAsIHA6IDgsIGJvcmRlclJhZGl1czogMjB9fT5cbiAgICAgICAgPEdyaWQgY29udGFpbmVyPlxuICAgICAgICAgIDxHcmlkIGl0ZW0geHM9ezEyfSBtZD17Nn0+XG4gICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgIHN4PXt7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6IDQwMCwgLy8gRW5zdXJlIHRoZSBpbWFnZSBoYXMgYSBtaW5pbXVtIGhlaWdodFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8SW1hZ2VcbiAgICAgICAgICAgICAgICBzcmM9e2xvZ2luSW1hZ2V9IC8vIEltYWdlIHJlbGF0ZWQgdG8gYSB0by1kbyBsaXN0IGFwcFxuICAgICAgICAgICAgICAgIGFsdD1cIkxvZ2luXCJcbiAgICAgICAgICAgICAgICBsYXlvdXQ9XCJmaWxsXCJcbiAgICAgICAgICAgICAgICBvYmplY3RGaXQ9XCJjb3ZlclwiXG4gICAgICAgICAgICAgICAgcXVhbGl0eT17MTAwfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgPC9HcmlkPlxuICAgICAgICAgIDxHcmlkIGl0ZW0geHM9ezEyfSBtZD17Nn0+XG4gICAgICAgICAgICA8Q2FyZENvbnRlbnRcbiAgICAgICAgICAgICAgc3g9e3tcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiA0LCAvLyBJbmNyZWFzZSBwYWRkaW5nIGZvciBhIGxhcmdlciBjYXJkIGZlZWxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFR5cG9ncmFwaHkgY29tcG9uZW50PVwiaDFcIiB2YXJpYW50PVwiaDRcIiBtYj17M30+XG4gICAgICAgICAgICAgICAgTG9naW5cbiAgICAgICAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0fSBzdHlsZT17eyB3aWR0aDogXCIxMDAlXCIgfX0+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmVkXCJcbiAgICAgICAgICAgICAgICAgIG1hcmdpbj1cIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoXG4gICAgICAgICAgICAgICAgICBsYWJlbD1cIkVtYWlsXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17ZW1haWx9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEVtYWlsKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1c1xuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmVkXCJcbiAgICAgICAgICAgICAgICAgIG1hcmdpbj1cIm5vcm1hbFwiXG4gICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoXG4gICAgICAgICAgICAgICAgICBsYWJlbD1cIlBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17cGFzc3dvcmR9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFBhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT1cImN1cnJlbnQtcGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgICBmdWxsV2lkdGhcbiAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJjb250YWluZWRcIlxuICAgICAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgIHN4PXt7IG10OiAyLCBtYjogMiwgdGV4dFRyYW5zZm9ybTogXCJub25lXCIsIGJvcmRlclJhZGl1czogMTB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIExvZ2luXG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgIDwvQ2FyZENvbnRlbnQ+XG4gICAgICAgICAgPC9HcmlkPlxuICAgICAgICA8L0dyaWQ+XG4gICAgICA8L0NhcmQ+XG4gICAgPC9Db250YWluZXI+XG4gICk7XG59XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VSb3V0ZXIiLCJDb250YWluZXIiLCJUZXh0RmllbGQiLCJCdXR0b24iLCJUeXBvZ3JhcGh5IiwiQm94IiwiR3JpZCIsIkNhcmQiLCJDYXJkQ29udGVudCIsIkltYWdlIiwibG9naW5JbWFnZSIsIkxvZ2luIiwiZW1haWwiLCJzZXRFbWFpbCIsInBhc3N3b3JkIiwic2V0UGFzc3dvcmQiLCJyb3V0ZXIiLCJoYW5kbGVTdWJtaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJyZXMiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsIm9rIiwiZGF0YSIsImpzb24iLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwidG9rZW4iLCJwdXNoIiwiY29uc29sZSIsImVycm9yIiwibWF4V2lkdGgiLCJzeCIsImRpc3BsYXkiLCJhbGlnbkl0ZW1zIiwianVzdGlmeUNvbnRlbnQiLCJoZWlnaHQiLCJ3aWR0aCIsInAiLCJib3JkZXJSYWRpdXMiLCJjb250YWluZXIiLCJpdGVtIiwieHMiLCJtZCIsInBvc2l0aW9uIiwibWluSGVpZ2h0Iiwic3JjIiwiYWx0IiwibGF5b3V0Iiwib2JqZWN0Rml0IiwicXVhbGl0eSIsImZsZXhEaXJlY3Rpb24iLCJwYWRkaW5nIiwiY29tcG9uZW50IiwidmFyaWFudCIsIm1iIiwiZm9ybSIsIm9uU3VibWl0Iiwic3R5bGUiLCJtYXJnaW4iLCJyZXF1aXJlZCIsImZ1bGxXaWR0aCIsImxhYmVsIiwidHlwZSIsInZhbHVlIiwib25DaGFuZ2UiLCJ0YXJnZXQiLCJhdXRvQ29tcGxldGUiLCJhdXRvRm9jdXMiLCJjb2xvciIsIm10IiwidGV4dFRyYW5zZm9ybSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/login.js\n"));

/***/ })

});