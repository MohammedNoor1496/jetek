(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[28],{1203:function(e,t,n){"use strict";n.r(t);var r=n(689),a=n.n(r),o=n(690),c=n(633),i=n(1),s=n(624),u=n(626),l=n(1013),d=n(1004),p=n(622),h=n(1014),j=n(725),f=n.n(j),b=n(726),m=n.n(b),x=n(20);t.default=function(){var e=Object(i.useState)(""),t=Object(c.a)(e,2),n=t[0],r=t[1],j=Object(i.useState)([]),b=Object(c.a)(j,2),g=b[0],v=b[1],O=f.a.create({baseURL:"https://jetek-devolopment.herokuapp.com/admin",headers:{"auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNWZhNDliMjUzNjI1MjliMDMzMTBhMyIsImlhdCI6MTYxNzI3OTI5NSwiZXhwIjoxNjE3MzY1Njk1fQ.vUJVRdhU3sMKhnCrZIE9W-7fIAumUNQJ-N8vOIpP3XY"}}),k=Object(p.a)({root:{background:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",borderRadius:3,border:0,color:"white",height:48,padding:"0 30px",boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)",marginTop:20},label:{textTransform:"capitalize"}})(h.a),w=(Object(l.a)((function(e){return{root:{"& > *":{margin:e.spacing(1),width:"25ch"}},paper:{position:"absolute",width:400,backgroundColor:e.palette.background.paper,border:"2px solid #000",boxShadow:e.shadows[5],padding:e.spacing(2,4,3)}}})),function(){var e=Object(o.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n={id:t};try{f.a.post("https://jetek-devolopment.herokuapp.com/admin/deleteSpCatogare",n).then((function(e){return e})).then((function(e){return console.log(e)}))}catch(r){console.log(r)}case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),I=function(){var e=Object(o.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O.get("/getAllSpCatogaries");case 3:return t=e.sent,console.log(t.data),e.next=7,v(t.data);case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();return Object(i.useEffect)((function(){I()}),[1e3]),Object(x.jsx)(x.Fragment,{children:Object(x.jsxs)(s.j,{children:[Object(x.jsxs)(s.n,{children:["\u0646\u0642\u0627\u0637 \u0627\u0644\u0628\u064a\u0639",Object(x.jsx)(u.a,{name:"-Button"})]}),Object(x.jsxs)(s.k,{children:[Object(x.jsx)(d.a,{required:!0,id:"outlined-basic",label:"\u0627\u0644\u0627\u0633\u0645 ",type:"",variant:"outlined",style:{width:"100%"},onChange:function(e){return r(e.target.value)},helperText:"\u0645\u062a\u062c\u0631 , \u0645\u0642\u0647\u0649"}),Object(x.jsx)("br",{}),Object(x.jsx)(k,{onClick:function(){!function(){var e={name:n};try{f.a.post("https://jetek-devolopment.herokuapp.com/admin/addspCatogare",e).then((function(e){return e})).then((function(e){return console.log(e.status)}))}catch(t){console.log(t)}}()},variant:"contained",className:"insert",color:"primary",children:"\u0625\u0636\u0627\u0641\u0629"}),Object(x.jsx)(m.a,{title:"\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u064a\u0646",data:g,columns:[{title:"\u0627\u0644\u0627\u0633\u0645 ",field:"name"}],options:{rowStyle:{backgroundColor:"#EEE"},exportButton:!0},actions:[{icon:"BuildIcon",tooltip:"\u062a\u0639\u0637\u064a\u0644 \u0627\u0644\u062d\u0633\u0627\u0628 "},{icon:"delete",tooltip:"\u062d\u0630\u0641 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645",onClick:function(e,t){return w(t._id)}}]})]})]})})}},626:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n(43),a=n(158),o=n(1),c=n.n(o),i=n(624),s=n(20),u=function(e){var t=e.name,n=e.text,o=Object(a.a)(e,["name","text"]),c=t?"https://coreui.io/react/docs/components/".concat(t):e.href;return Object(s.jsx)("div",{className:"card-header-actions",children:Object(s.jsx)(i.Z,Object(r.a)(Object(r.a)({},o),{},{href:c,rel:"noreferrer noopener",target:"_blank",className:"card-header-action",children:Object(s.jsx)("small",{className:"text-muted",children:n||"docs"})}))})},l=c.a.memo(u)},689:function(e,t,n){e.exports=n(378)},690:function(e,t,n){"use strict";function r(e,t,n,r,a,o,c){try{var i=e[o](c),s=i.value}catch(u){return void n(u)}i.done?t(s):Promise.resolve(s).then(r,a)}function a(e){return function(){var t=this,n=arguments;return new Promise((function(a,o){var c=e.apply(t,n);function i(e){r(c,a,o,i,s,"next",e)}function s(e){r(c,a,o,i,s,"throw",e)}i(void 0)}))}}n.d(t,"a",(function(){return a}))}}]);
//# sourceMappingURL=28.176e12d6.chunk.js.map