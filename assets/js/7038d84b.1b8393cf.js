"use strict";(self.webpackChunkmonk_website=self.webpackChunkmonk_website||[]).push([[447],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=l(n),m=o,g=d["".concat(c,".").concat(m)]||d[m]||p[m]||a;return n?r.createElement(g,i(i({ref:t},u),{},{components:n})):r.createElement(g,i({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var l=2;l<a;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},44097:(e,t,n)=>{n.r(t),n.d(t,{frontMatter:()=>s,contentTitle:()=>c,metadata:()=>l,toc:()=>u,default:()=>d});var r=n(87462),o=n(63366),a=(n(67294),n(3905)),i=["components"],s={id:"authenticating",title:"\ud83d\udd13 Authenticate",slug:"/js/guides/authenticating"},c=void 0,l={unversionedId:"js/guides/authenticating",id:"js/guides/authenticating",isDocsHomePage:!1,title:"\ud83d\udd13 Authenticate",description:"Several streams are available to allow your users to authenticate.",source:"@site/docs/js/guides/authenticating.md",sourceDirName:"js/guides",slug:"/js/guides/authenticating",permalink:"/monkjs/docs/js/guides/authenticating",tags:[],version:"current",frontMatter:{id:"authenticating",title:"\ud83d\udd13 Authenticate",slug:"/js/guides/authenticating"},sidebar:"docsSidebar",previous:{title:"\ud83d\udcf7 Taking pictures",permalink:"/monkjs/docs/js/guides/picturing"},next:{title:"\ud83e\uddff corejs",permalink:"/monkjs/docs/js/api/corejs"}},u=[{value:"First steps",id:"first-steps",children:[]},{value:"<code>baseQuery</code> option",id:"basequery-option",children:[]},{value:"<code>auth</code> reducer",id:"auth-reducer",children:[]}],p={toc:u};function d(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Several streams are available to allow your users to authenticate.\nWe will assume that you already have a valid access token\nand we will direct you to the section dedicated to authentication for more info."),(0,a.kt)("h2",{id:"first-steps"},"First steps"),(0,a.kt)("p",null,"Install ",(0,a.kt)("inlineCode",{parentName:"p"},"@monkvision/corejs")," from ",(0,a.kt)("inlineCode",{parentName:"p"},"npm")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-npm"},"npm install @monkvision/corejs --save\n")),(0,a.kt)("p",null,"Install ",(0,a.kt)("inlineCode",{parentName:"p"},"@monkvision/corejs")," from ",(0,a.kt)("inlineCode",{parentName:"p"},"yarn")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yarn"},"yarn add @monkvision/corejs\n")),(0,a.kt)("p",null,"Then we start by instantiating the core with an object of type ",(0,a.kt)("inlineCode",{parentName:"p"},"BaseQuery"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"import MonkCore, { getBaseQuery } from '@monkvision/corejs';\nimport dotenv from 'dotenv'\n\n// Use the env config tool that fit your own project\n// For example:\n// import Constants from 'expo-constants';\n// const config = Constants.manifest.extra;\n\nconst config = dotenv.config()\n\nif (config.error) {\n  throw config.error\n}\n\nconst monkCore = new MonkCore(getBaseQuery({\n  baseUrl: `https://${config.MONK_DOMAIN}/`,\n}));\n\nexport default monkCore;\n")),(0,a.kt)("h2",{id:"basequery-option"},(0,a.kt)("inlineCode",{parentName:"h2"},"baseQuery")," option"),(0,a.kt)("p",null,"The easiest way is to directly specify a custom header when instantiating the core."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"const monkCore = new MonkCore(getBaseQuery({\n  baseUrl: `https://${config.MONK_DOMAIN}/`,\n  customHeaders: [['authorization', `Bearer ${yourToken}`]]\n}));\n")),(0,a.kt)("h2",{id:"auth-reducer"},(0,a.kt)("inlineCode",{parentName:"h2"},"auth")," reducer"),(0,a.kt)("p",null,"You can also instantiate the core at runtime and setup a listener\nvia ",(0,a.kt)("a",{parentName:"p",href:"https://redux-toolkit.js.org/rtk-query/api/created-api/redux-integration"},"Redux Toolkit"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"import { configureStore } from '@reduxjs/toolkit';\nimport { setupListeners } from '@reduxjs/toolkit/query';\nimport monkCore from 'config/monkCore';\n\n// Your own auth slice reducer\nimport auth from './slices/auth';\n\nconst middlewares = [monkCore.inspection.middleware];\n\n\nconst store = configureStore({\n  middleware: (getMiddleware) => getMiddleware().concat(middlewares),\n  reducer: {\n    auth,\n    [monkCore.inspection.reducerPath]: monkCore.inspection.reducer,\n  },\n});\n\nsetupListeners(store.dispatch);\n\nexport default store;\n")),(0,a.kt)("p",null,"The core will listen directly to your store\nand will use the ",(0,a.kt)("inlineCode",{parentName:"p"},"accessToken")," present in the ",(0,a.kt)("inlineCode",{parentName:"p"},"auth")," reducer.\nIn this case, it is important to respect the names ",(0,a.kt)("inlineCode",{parentName:"p"},"auth.accessToken"),"\nsince the core prepares its headers in the following way."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"prepareHeaders: (headers, { getState }) => {\n      const token = getState().auth.accessToken;\n      // ...\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Soon: via the ",(0,a.kt)("inlineCode",{parentName:"strong"},"<MonkProvider />"))))}d.isMDXComponent=!0}}]);