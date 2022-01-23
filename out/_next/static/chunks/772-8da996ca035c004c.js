"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[772],{29396:function(e,n,t){t.d(n,{Z:function(){return k}});var r,i=t(28520),o=t.n(i),a=t(85893),s=t(67294),c=t(13408),l=t(33020),d=t(94274),u=t(26713),h=t(42101),f=(t(18159),t(91819)),p=t(9669),m=t.n(p),x=t(27049),j=function(e){return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("div",{style:{marginBottom:10,fontWeight:"500"},children:[(0,a.jsxs)("span",{children:[" ",e.checkin.date," ",e.checkin.time," "]}),(0,a.jsx)("br",{}),(0,a.jsx)("span",{style:{marginTop:5,fontWeight:200},children:e.checkin.current_address}),(0,a.jsx)(x.Z,{})]})})};function y(e,n,t,r,i,o,a){try{var s=e[o](a),c=s.value}catch(l){return void t(l)}s.done?n(c):Promise.resolve(c).then(r,i)}function g(e){return function(){var n=this,t=arguments;return new Promise((function(r,i){var o=e.apply(n,t);function a(e){y(o,r,i,a,s,"next",e)}function s(e){y(o,r,i,a,s,"throw",e)}a(void 0)}))}}function b(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function v(e){return function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var k=function(e){(0,l.dd)();var n=(0,s.useState)({height:"100vh",width:"100wh",longitude:106.6894306,latitude:-6.229728,zoom:10}),t=n[0],i=n[1],p=(0,s.useState)(!1),x=p[0],y=p[1],k=(0,s.useState)("right"),w=k[0],S=(k[1],(0,s.useState)("")),Z=S[0],O=S[1],A=(0,s.useState)(""),C=A[0],T=A[1],E=(0,s.useState)(""),P=E[0],_=E[1],I=(0,s.useState)([]),M=I[0],R=I[1],D=g(o().mark((function e(n){var t;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m().get("/api/checkin");case 2:t=e.sent,R(v(t.data.entriesData));case 4:case"end":return e.stop()}}),e)}))),W=s.useMemo((function(){return e.employees.map((function(e){return(0,a.jsx)(c.Jx,{longitude:parseFloat(e.longitude),latitude:parseFloat(e.latitude),onClick:function(){D(e.code),O(e.name),T(e.code),_(e.current_address),y(!0)},children:(0,a.jsx)("img",{src:"https://img.icons8.com/color/48/000000/marker.png"})})}))}),[e.employees]),z=s.useMemo((function(){return M.map((function(e){return(0,a.jsx)(j,{checkin:e})}))}),[M]),F=g(o().mark((function e(){var n,t;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=[],(t=new f.default("p","px","a4")).text("Riwayat Checkin ".concat(Z," "),10,20),t.autoTable({html:"#my-table"}),M.map((function(e){var t=[e.date,e.time,e.current_address];n.push(t)})),t.autoTable((b(r={margin:{top:20},headStyles:{fillColor:"#3498db",textColor:[255,255,255],fontSize:10,padding:0},columnStyles:{0:{cellWidth:50},1:{cellWidth:70,halign:"left"},2:{cellWidth:300,halign:"left"}},thema:"grid"},"margin",{left:10,right:10}),b(r,"head",[["Tanggal","Waktu","Lokasi checkin"]]),b(r,"body",n),r)),window.open(t.output("bloburl"),"_blank");case 7:case"end":return e.stop()}}),e)})));return(0,s.useEffect)((function(){D()}),[]),(0,a.jsxs)(c.ZP,function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){b(e,n,t[n])}))}return e}({},t,{mapboxApiAccessToken:"pk.eyJ1IjoidHJhY2tpbmcxMjEyIiwiYSI6ImNreWdyaGJ5aTBnbW8zMnFuejc2YnFxbG8ifQ.DhHZV81yuKczvH29K9qkDw",mapStyle:"mapbox://styles/ernebuta/ck6l5q6me1dmn1ip74713pndm",onViewportChange:i,children:[W,(0,a.jsx)(d.Z,{title:"Detail employee",placement:w,width:500,onClose:function(){y(!1)},visible:x,extra:(0,a.jsx)(u.Z,{}),children:(0,a.jsxs)("div",{className:"employee-detailcontent",children:[(0,a.jsx)("div",{class:"d-block p-2 bg-primary text-white",style:{inline:!0},children:(0,a.jsxs)("div",{children:[(0,a.jsx)("span",{style:{fontWeight:550,fontSize:15},children:Z}),(0,a.jsx)("br",{}),(0,a.jsx)("span",{children:C})]})}),(0,a.jsx)("div",{className:"rounded",style:{marginTop:30,background:"#dfe6e9"},children:(0,a.jsxs)("div",{style:{padding:10},children:[(0,a.jsx)("span",{style:{fontWeight:550,fontSize:15},children:"Lokasi Saat Ini"}),(0,a.jsx)("br",{}),(0,a.jsx)("span",{children:P})]})}),(0,a.jsx)("div",{style:{marginBottom:5,textAlign:"right",marginTop:40},children:(0,a.jsx)(u.Z,{children:(0,a.jsx)(h.Z,{onClick:F,children:"Report .pdf"})})}),(0,a.jsx)("div",{children:(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{children:(0,a.jsx)("span",{style:{fontWeight:550,fontSize:15},children:"Riwayat Checkin"})}),(0,a.jsxs)("div",{style:{marginTop:20},children:[z,M.map((function(e){e.time,e.current_address}))]})]})})]})})]}))}},33020:function(e,n,t){t.d(n,{Ib:function(){return d},dd:function(){return u}});var r=t(85893),i=t(67294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){o(e,n,t[n])}))}return e}function s(e){return function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var c=(0,i.createContext)(),l=(0,i.createContext)(),d=function(e){var n=e.children,t=(0,i.useReducer)(h,{markers:[]}),o=t[0],a=t[1];return(0,r.jsx)(c.Provider,{value:o,children:(0,r.jsx)(l.Provider,{value:a,children:n})})},u=function(){var e=(0,i.useContext)(l);if(void 0===e)throw new Error("useDispatchMap must be used within a MapProvider");return e},h=function(e,n){switch(n.type){case"ADD_MARKER":return a({},e,{markers:s(e.markers).concat([n.payload.marker])});case"REMOVE_MARKER":return a({},e,{markers:s(e.markers.filter((function(e){return e[0]!==n.payload.marker[0]&&e[1]!==n.payload.marker[1]})))})}return e}},84362:function(e,n,t){t.d(n,{Z:function(){return Z}});var r=t(85893),i=t(97183),o=i.Z.Footer,a=function(){return(0,r.jsx)(o,{style:{textAlign:"center"},children:"Sistem Monitoring Teknisi Lapangan"})},s=t(68157),c=t(71230),l=t(15746),d=t(74622),u=t(13013),h=t(86871),f=t(92443),p=t(11163),m=(0,r.jsx)(s.Z,{children:(0,r.jsx)(s.Z.Item,{style:{paddingRight:30,borderTop:"1px solid rgba(0,0,0,.06)"},icon:(0,r.jsx)(f.Z,{style:{color:"#ff4d4f"}}),children:(0,r.jsx)("a",{rel:"noopener noreferrer",onClick:function(){sessionStorage.clear(),p.default.push("/auth")},children:"Logout"})})}),x=i.Z.Header,j=function(){return(0,r.jsx)(x,{style:{position:"fixed",zIndex:1,width:"100%",backgroundColor:"#fff",padding:"0 24px"},children:(0,r.jsxs)(c.Z,{justify:"space-between",align:"middle",children:[(0,r.jsx)(l.Z,{span:8,children:(0,r.jsx)("div",{className:"logo",children:(0,r.jsxs)(d.Z.Title,{level:4,style:{marginBottom:0},children:[(0,r.jsx)("span",{style:{color:"#3498db"},children:"Monitoring"})," Teknisi lapangan"]})})}),(0,r.jsx)(l.Z,{span:8,style:{textAlign:"right"},children:(0,r.jsx)(u.Z,{overlay:m,placement:"topRight",children:(0,r.jsx)(h.C,{style:{color:"#f56a00",backgroundColor:"#fde3cf",cursor:"pointer"},children:"U"})})})]})})},y=t(67294),g=t(47235),b=t(41664),v=i.Z.Sider,k=s.Z.SubMenu,w=["dashboard"],S=function(){var e=(0,y.useState)(["dashboard"]),n=e[0],t=e[1],i=(0,p.useRouter)();return(0,y.useEffect)((function(){"true"!=sessionStorage.getItem("isLogin")&&i.push("/auth")})),(0,r.jsx)(v,{style:{overflow:"auto",height:"100vh",position:"fixed",left:0},children:(0,r.jsx)(s.Z,{theme:"dark",mode:"inline",defaultSelectedKeys:["dashboard_dashboard"],style:{paddingTop:"calc(63px + 10px)"},openKeys:n,onOpenChange:function(e){var r=e.find((function(e){return-1===n.indexOf(e)}));-1===w.indexOf(r)?t(e):t(r?[r]:[])},children:(0,r.jsxs)(k,{icon:(0,r.jsx)(g.Z,{}),title:"Dashboard",children:[(0,r.jsx)(s.Z.Item,{children:(0,r.jsx)(b.default,{href:"/dashboard",children:(0,r.jsx)("a",{children:"Dashboard"})})},"dashboard_dashboard"),(0,r.jsx)(s.Z.Item,{title:"employee",children:(0,r.jsx)(b.default,{href:"/employee",children:(0,r.jsx)("a",{children:"Employee"})})},"employee_employee")]},"dashboard")})})},Z=function(e){var n=e.children;return(0,r.jsxs)(i.Z,{children:[(0,r.jsx)(j,{}),(0,r.jsxs)(i.Z,{style:{marginLeft:200},children:[(0,r.jsx)(S,{}),(0,r.jsxs)(i.Z,{children:[n,(0,r.jsx)(a,{})]})]})]})}}}]);