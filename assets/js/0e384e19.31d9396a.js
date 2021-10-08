(self.webpackChunkmonk_website=self.webpackChunkmonk_website||[]).push([[671],{59881:(e,n,t)=>{"use strict";t.r(n),t.d(n,{frontMatter:()=>p,contentTitle:()=>l,metadata:()=>m,toc:()=>c,default:()=>u});var o=t(87462),a=t(63366),r=(t(67294),t(3905)),i=t(93456),s=["components"],p={id:"intro",title:"Overview",slug:"/"},l=void 0,m={unversionedId:"intro",id:"intro",isDocsHomePage:!1,title:"Overview",description:"Monk's SDKs are divided in three:",source:"@site/docs/intro.md",sourceDirName:".",slug:"/",permalink:"/monkjs/docs/",tags:[],version:"current",frontMatter:{id:"intro",title:"Overview",slug:"/"},sidebar:"docsSidebar",next:{title:"Installation",permalink:"/monkjs/docs/installation"}},c=[{value:"\ud83e\uddff Core",id:"-core",children:[]},{value:"\ud83e\uddf1 Components",id:"-components",children:[]},{value:"\ud83d\ude80 Views",id:"-views",children:[]},{value:"What&#39;s next?",id:"whats-next",children:[]}],d={toc:c};function u(e){var n=e.components,t=(0,a.Z)(e,s);return(0,r.kt)("wrapper",(0,o.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Monk's SDKs are divided in three:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"A ",(0,r.kt)("strong",{parentName:"li"},"core")," module providing a redux kit to get and manipulate data \ud83e\uddff"),(0,r.kt)("li",{parentName:"ol"},"A ",(0,r.kt)("strong",{parentName:"li"},"components")," module exporting basic native features \ud83e\uddf1"),(0,r.kt)("li",{parentName:"ol"},"A ",(0,r.kt)("strong",{parentName:"li"},"views")," module using core and components together \ud83d\ude80")),(0,r.kt)("p",null,"They act like the following diagram:"),(0,r.kt)(i.Mermaid,{chart:"sequenceDiagram\n\nparticipant App\nparticipant Views\nparticipant Core\n\npar Runtime\nApp->>Core: Create an instance of MonkCore\nNote over App,Views: const monkCore = new MonkCore({ baseUrl });\nApp->>Views: Render a CameraView loading native Camera\nNote over App,Views: import { CameraView } from '@monkvision/react-native-views';\nend\n\nloop Component Lifecycle\nViews--\x3e>Core: Use hooks to get or set data\nCore--\x3e>Views: Update view with new data\nNote over Core,Views: Execute callbacks from Components\nend\n\nViews->>App: Display elements and drive use until<br>he gets the full inspection\nNote over Views,App: const handleCloseCamera =<br>useCallback((pictures) => { ... }, []);\nNote over Views,App: <CameraView onCloseCamera={handleCloseCamera} />",mdxType:"Mermaid"}),(0,r.kt)("h2",{id:"-core"},"\ud83e\uddff Core"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"The core is a basic module. It's a proxy between your code and Monk's servers.")),(0,r.kt)(i.Mermaid,{chart:"sequenceDiagram\n\nparticipant Core\nparticipant Servers\n\nloop\n  Core->>Servers: Execute queries\n  Servers->>Core: Update client store via HTTP response\n  Servers--\x3e>Core: Invalidate cache with WS stream\nend",mdxType:"Mermaid"}),(0,r.kt)("p",null,"Once instantiated, the core ",(0,r.kt)("strong",{parentName:"p"},"provides the APIs")," essential to the use of artificial intelligence, but also ",(0,r.kt)("strong",{parentName:"p"},"hooks")," and other ",(0,r.kt)("strong",{parentName:"p"},"middlewares")," specific to front-end development."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"/* config/monkCore.js */\n\nimport MonkCore from '@monkvision/corejs/src';\nimport Constants from 'expo-constants';\n\nconst monkCore = new MonkCore({\n  baseUrl: `https://${Constants.manifest.extra.MONK_DOMAIN}/`,\n});\n\nexport default monkCore;\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"/* App.jsx */\n\nimport monkCore from 'config/monkCore';\nimport isEmpty from 'lodash.isempty';\n\n// Your own components...\nimport Loading from 'components/Loading';\nimport Empty from 'components/Empty';\nimport Inspection from 'components/Inspection';\n\nconst { useGetInspectionsQuery } = monkCore.inspection;\n\nfunction App() {\n  const { data, isLoading } = useGetInspectionsQuery();\n\n  if (isLoading) {\n    return <Loading />;\n  }\n\n  if (isEmpty(data)) {\n    return <Empty />;\n  }\n\n  return data.map((props) => <Inspection {...props) />;\n}\n")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Currently written in ",(0,r.kt)("em",{parentName:"p"},"JavaScript"),", we are working to provide a core for every popular language that can be requested to execute a query (",(0,r.kt)("em",{parentName:"p"},"EcmaScript, TypeScript, Dart, Python..."),").\nIt accepts a ",(0,r.kt)("inlineCode",{parentName:"p"},"CLIENT_ID")," and domain name ",(0,r.kt)("inlineCode",{parentName:"p"},"MONK_DOMAIN")," as parameters. It follows the ",(0,r.kt)("em",{parentName:"p"},"Redux")," pattern and can be combined with your own store and your own middleware.")),(0,r.kt)("h2",{id:"-components"},"\ud83e\uddf1 Components"),(0,r.kt)("p",null,"The React Native component library allows you to build a set of views or modules brick by brick."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"For example, the ",(0,r.kt)("inlineCode",{parentName:"p"},"CameraView")," is composed of the ",(0,r.kt)("inlineCode",{parentName:"p"},"Camera")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"Gallery")," component at the same time, ",(0,r.kt)("inlineCode",{parentName:"p"},"Camera")," accepting as parameters your own capture buttons.")),(0,r.kt)("p",null,"This library is useful if you want to use lower level features or customize your components as you wish, unlike the ",(0,r.kt)("inlineCode",{parentName:"p"},"react-native-views")," library which embeds much more than micro-components."),(0,r.kt)("h2",{id:"-views"},"\ud83d\ude80 Views"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"react-native-views")," library embeds the features of the previous two. It mixes the server calls with the components in order to provide a very high level development kit."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Each view globally accepts a panel of callbacks like ",(0,r.kt)("inlineCode",{parentName:"p"},"onCloseCamera")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"onTakingPicture"),". They are however heavier, using ",(0,r.kt)("inlineCode",{parentName:"p"},"react-native-paper")," as the default UI library, which can weigh down your bundle.")),(0,r.kt)("p",null,"The views are all compatible with Android, iOS and Web, unless specified otherwise."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"/* MyNavigationScreen.jsx */\n\nimport React, { useCallback } from 'react';\nimport { useNavigation } from '@react-navigation/native';\nimport { CameraView } from '@monkvision/react-native-views';\n\nexport default function MyNavigationScreen() {\n  const navigation = useNavigation();\n\n  const handleCloseCamera = useCallback((/* pictures */) => {\n    // console.log(pictures);\n    navigation.navigate('HomePage');\n  }, [navigation]);\n\n  return (\n    <CameraView onCloseCamera={handleCloseCamera} />\n  );\n}\n")),(0,r.kt)("h2",{id:"whats-next"},"What's next?"),(0,r.kt)("p",null,"Now that you understand each basic principle, you can install the necessary modules for your own tech stack.\nAny request or feedback is welcome. For that, please create an issue on the repository ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/monkvision/monkjs/issues/new"},"monkvision/monkjs"),"."))}u.isMDXComponent=!0},11748:(e,n,t)=>{var o={"./locale":89234,"./locale.js":89234};function a(e){var n=r(e);return t(n)}function r(e){if(!t.o(o,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return o[e]}a.keys=function(){return Object.keys(o)},a.resolve=r,e.exports=a,a.id=11748}}]);