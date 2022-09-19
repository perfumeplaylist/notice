/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/rank.js":
/*!*******************************!*\
  !*** ./src/client/js/rank.js ***!
  \*******************************/
/***/ (() => {

eval("const selected = document.querySelector(\"#rank-select\");\nconst noticeContainer = document.querySelector(\".notice_container\");\nconst fakeDocument = document.createDocumentFragment();\n\nfunction paintNotice(notice) {\n  console.log(notice.length);\n\n  for (let i = 0; i < notice.length; i++) {\n    const li = document.createElement(\"li\");\n    const title = document.createElement(\"a\");\n    const des = document.createElement(\"small\");\n    const views = document.createElement(\"small\");\n    const date = document.createElement(\"small\");\n    const hr = document.createElement(\"hr\");\n    title.href = \"\".concat(notice[i]._id);\n    title.innerText = \"\".concat(notice[i].title);\n    des.innerText = \"description : \".concat(notice[i].description);\n    views.innerText = \"views : \".concat(notice[i].meta.views);\n    date.innerText = \"date : \".concat(notice[i].createAt);\n    li.appendChild(title);\n    li.appendChild(des);\n    li.appendChild(views);\n    li.appendChild(date);\n    li.appendChild(hr);\n    fakeDocument.append(li);\n  }\n\n  noticeContainer.append(fakeDocument);\n}\n\nasync function handleSelected() {\n  const value = selected.options[selected.selectedIndex].value;\n  const response = await fetch(\"/api/notice/rank/filter\", {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      value\n    })\n  });\n\n  if (response.status === 301) {\n    const noticeContainer = await response.json();\n    paintNotice(noticeContainer.notice);\n  } else {\n    return;\n  }\n}\n\nfunction init() {\n  selected.addEventListener(\"input\", handleSelected);\n}\n\ninit();\n\n//# sourceURL=webpack://notice/./src/client/js/rank.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/rank.js"]();
/******/ 	
/******/ })()
;