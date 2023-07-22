/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/audio.ts":
/*!**********************!*\
  !*** ./src/audio.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AudioController: () => (/* binding */ AudioController)\n/* harmony export */ });\nvar FFT_SIZE = 2048;\nvar AudioController = /** @class */ (function () {\n    function AudioController(path) {\n        var _this = this;\n        this._getAudioData = function () {\n            _this.analyser.getByteFrequencyData(_this.dataArray);\n            for (var i = 0; i < _this.bufferLength; i++) {\n                if (_this.dataArray[i] !== 0)\n                    console.log(\"Frequency bin \".concat(i, \": \").concat(_this.dataArray[i]));\n            }\n            setTimeout(function () {\n                _this._getAudioData();\n            }, 1000 / (_this.analyser.context.sampleRate / _this.analyser.fftSize));\n        };\n        var audioContext = new AudioContext();\n        this.analyser = audioContext.createAnalyser();\n        this.analyser.fftSize = FFT_SIZE;\n        this.audioElement = new Audio(path);\n        var source = audioContext.createMediaElementSource(this.audioElement);\n        this.analyser.connect(audioContext.destination);\n        source.connect(this.analyser);\n        this.bufferLength = this.analyser.frequencyBinCount;\n        this.dataArray = new Uint8Array(this.bufferLength);\n        window.addEventListener('click', function () {\n            if (_this.audioElement.paused) {\n                _this.audioElement.play();\n                console.log(\"Playing\");\n            }\n            else {\n                _this.audioElement.pause();\n                console.log(\"Paused\");\n            }\n        });\n        this.audioElement.addEventListener('play', function () {\n            _this._getAudioData();\n        });\n    }\n    return AudioController;\n}());\n\n\n\n//# sourceURL=webpack://my-webpack-project/./src/audio.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./audio */ \"./src/audio.ts\");\n// @ts-ignore\n\n// @ts-ignore\n\nvar Engine = /** @class */ (function () {\n    function Engine() {\n        this._audioController = new _audio__WEBPACK_IMPORTED_MODULE_0__.AudioController(\"./assets/audio/waves.mp3\");\n        this._scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();\n        this._camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.01, 100);\n        this._camera.position.z = 0.9;\n        this._renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer({ antialias: true });\n        this._renderer.setSize(window.innerWidth, window.innerHeight);\n        this._renderer.setAnimationLoop(this._animation.bind(this));\n        this._renderer.setPixelRatio(window.devicePixelRatio);\n        this._renderer.setSize(window.innerWidth, window.innerHeight);\n        document.body.appendChild(this._renderer.domElement);\n        window.addEventListener('resize', this._resize.bind(this));\n    }\n    Engine.prototype._animation = function (time) {\n        this._renderer.render(this._scene, this._camera);\n    };\n    Engine.prototype._resize = function () {\n        this._camera.aspect = window.innerWidth / window.innerHeight;\n        this._camera.updateProjectionMatrix();\n        this._renderer.setSize(window.innerWidth, window.innerHeight);\n    };\n    return Engine;\n}());\nnew Engine();\n\n\n//# sourceURL=webpack://my-webpack-project/./src/index.ts?");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;