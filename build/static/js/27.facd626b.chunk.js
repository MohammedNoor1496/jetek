(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[27],{1124:function(t,e,n){"use strict";n.r(e);var r=n(689),a=n.n(r),o=n(690),c=n(633),i=n(1),s=n(624),u=n(626),l=n(1013),d=n(1004),h=n(622),p=n(1014),f=n(725),b=n.n(f),j=n(726),x=n.n(j),m=n(20);e.default=function(){var t=Object(i.useState)(""),e=Object(c.a)(t,2),n=e[0],r=e[1],f=Object(i.useState)([]),j=Object(c.a)(f,2),g=j[0],O=j[1],v=b.a.create({baseURL:"http://localhost:3000/admin",headers:{"auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNWZhNDliMjUzNjI1MjliMDMzMTBhMyIsImlhdCI6MTYxNzI3OTI5NSwiZXhwIjoxNjE3MzY1Njk1fQ.vUJVRdhU3sMKhnCrZIE9W-7fIAumUNQJ-N8vOIpP3XY"}}),w=Object(h.a)({root:{background:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",borderRadius:3,border:0,color:"white",height:48,padding:"0 30px",boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)",marginTop:20},label:{textTransform:"capitalize"}})(p.a),I=(Object(l.a)((function(t){return{root:{"& > *":{margin:t.spacing(1),width:"25ch"}},paper:{position:"absolute",width:400,backgroundColor:t.palette.background.paper,border:"2px solid #000",boxShadow:t.shadows[5],padding:t.spacing(2,4,3)}}})),function(){var t=Object(o.a)(a.a.mark((function t(e){var n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n={id:e};try{b.a.post("http://localhost:3000/admin/deletePCatogare",n).then((function(t){return t})).then((function(t){return console.log(t)}))}catch(r){console.log(r)}case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),k=function(){var t=Object(o.a)(a.a.mark((function t(){var e;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,v.get("/getAllPCatogaries");case 3:return e=t.sent,console.log(e.data),t.next=7,O(e.data);case 7:t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(){return t.apply(this,arguments)}}();return Object(i.useEffect)((function(){k()}),[1e3]),Object(m.jsx)(m.Fragment,{children:Object(m.jsxs)(s.j,{children:[Object(m.jsxs)(s.n,{children:["\u0646\u0642\u0627\u0637 \u0627\u0644\u0628\u064a\u0639",Object(m.jsx)(u.a,{name:"-Button"})]}),Object(m.jsxs)(s.k,{children:[Object(m.jsx)(d.a,{required:!0,id:"outlined-basic",label:"\u0627\u0644\u0627\u0633\u0645 ",type:"",variant:"outlined",style:{width:"100%"},onChange:function(t){return r(t.target.value)},helperText:"\u0645\u062a\u062c\u0631 , \u0645\u0642\u0647\u0649"}),Object(m.jsx)("br",{}),Object(m.jsx)(w,{onClick:function(){!function(){var t={name:n};try{b.a.post("http://localhost:3000/admin/addPCatogare",t).then((function(t){return t})).then((function(t){return console.log(t.status)}))}catch(e){console.log(e)}}()},variant:"contained",className:"insert",color:"primary",children:"\u0625\u0636\u0627\u0641\u0629"}),Object(m.jsx)(x.a,{title:"\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u064a\u0646",data:g,columns:[{title:"\u0627\u0644\u0627\u0633\u0645 ",field:"name"}],options:{rowStyle:{backgroundColor:"#EEE"},exportButton:!0},actions:[{icon:"BuildIcon",tooltip:"\u062a\u0639\u0637\u064a\u0644 \u0627\u0644\u062d\u0633\u0627\u0628 "},{icon:"delete",tooltip:"\u062d\u0630\u0641 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645",onClick:function(t,e){return I(e._id)}}]})]})]})})}},626:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var r=n(43),a=n(158),o=n(1),c=n.n(o),i=n(624),s=n(20),u=function(t){var e=t.name,n=t.text,o=Object(a.a)(t,["name","text"]),c=e?"https://coreui.io/react/docs/components/".concat(e):t.href;return Object(s.jsx)("div",{className:"card-header-actions",children:Object(s.jsx)(i.Z,Object(r.a)(Object(r.a)({},o),{},{href:c,rel:"noreferrer noopener",target:"_blank",className:"card-header-action",children:Object(s.jsx)("small",{className:"text-muted",children:n||"docs"})}))})},l=c.a.memo(u)},689:function(t,e,n){t.exports=n(378)},690:function(t,e,n){"use strict";function r(t,e,n,r,a,o,c){try{var i=t[o](c),s=i.value}catch(u){return void n(u)}i.done?e(s):Promise.resolve(s).then(r,a)}function a(t){return function(){var e=this,n=arguments;return new Promise((function(a,o){var c=t.apply(e,n);function i(t){r(c,a,o,i,s,"next",t)}function s(t){r(c,a,o,i,s,"throw",t)}i(void 0)}))}}n.d(e,"a",(function(){return a}))}}]);
//# sourceMappingURL=27.facd626b.chunk.js.map