(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[33],{1475:function(e,t,n){"use strict";n.r(t);var r=n(689),a=n.n(r),o=n(690),c=n(633),s=n(1),i=n(624),u=n(638),d=n(43),l=n(744),h=n(733),b=n(20),j=Object(h.getStyle)("success")||"#4dbd74",f=Object(h.getStyle)("info")||"#20a8d8",p=Object(h.getStyle)("danger")||"#f86c6b",m=function(e){var t=function(e,t){return Math.floor(Math.random()*(t-e+1)+e)},n=function(){for(var e=[],n=[],r=[],a=0;a<=27;a++)e.push(t(50,200)),n.push(t(80,100)),r.push(65);return[{label:"My First dataset",backgroundColor:Object(h.hexToRgba)(f,10),borderColor:f,pointHoverBackgroundColor:f,borderWidth:2,data:e},{label:"My Second dataset",backgroundColor:"transparent",borderColor:j,pointHoverBackgroundColor:j,borderWidth:2,data:n},{label:"My Third dataset",backgroundColor:"transparent",borderColor:p,pointHoverBackgroundColor:p,borderWidth:1,borderDash:[8,5],data:r}]}(),r={maintainAspectRatio:!1,legend:{display:!1},scales:{xAxes:[{gridLines:{drawOnChartArea:!1}}],yAxes:[{ticks:{beginAtZero:!0,maxTicksLimit:5,stepSize:Math.ceil(50),max:250},gridLines:{display:!0}}]},elements:{point:{radius:0,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}}};return Object(b.jsx)(l.b,Object(d.a)(Object(d.a)({},e),{},{datasets:n,options:r,labels:["Mo","Tu","We","Th","Fr","Sa","Su","Mo","Tu","We","Th","Fr","Sa","Su","Mo","Tu","We","Th","Fr","Sa","Su","Mo","Tu","We","Th","Fr","Sa","Su"]}))},O=n(725),x=n.n(O),g=Object(s.lazy)((function(){return n.e(32).then(n.bind(null,1029))}));t.default=function(){var e=Object(s.useState)(0),t=Object(c.a)(e,2),n=t[0],r=t[1],d=Object(s.useState)(0),l=Object(c.a)(d,2),h=l[0],j=l[1],f=Object(s.useState)(0),p=Object(c.a)(f,2),O=p[0],C=p[1],v=x.a.create({baseURL:"https://jetek-devolopment.herokuapp.com//admin",headers:{"auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNWZhNDliMjUzNjI1MjliMDMzMTBhMyIsImlhdCI6MTYxNzI3OTI5NSwiZXhwIjoxNjE3MzY1Njk1fQ.vUJVRdhU3sMKhnCrZIE9W-7fIAumUNQJ-N8vOIpP3XY"}});return Object(s.useEffect)(Object(o.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.get("/getUsersCount").then((function(e){r(e.data.UsersCount)})).catch((function(e){console.log(e)}));case 2:return e.next=4,v.get("/getCaptinsCount").then((function(e){j(e.data.CaptinsCount)})).catch((function(e){console.log(e)}));case 4:return e.next=6,v.get("/getOrdersCount").then((function(e){C(e.data.OrderCount)})).catch((function(e){console.log(e)}));case 6:case"end":return e.stop()}}),e)}))),[]),Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(g,{usersCount:n,CaptinsCount:h,OrderCount:O}),Object(b.jsx)(i.j,{children:Object(b.jsxs)(i.k,{children:[Object(b.jsxs)(i.sb,{children:[Object(b.jsxs)(i.u,{sm:"5",children:[Object(b.jsx)("h4",{id:"traffic",className:"card-title mb-0",children:"Statistics"}),Object(b.jsx)("div",{className:"small text-muted",children:"APRIL 2021"})]}),Object(b.jsxs)(i.u,{sm:"7",className:"d-none d-md-block",children:[Object(b.jsx)(i.f,{color:"primary",className:"float-right",children:Object(b.jsx)(u.a,{name:"cil-cloud-download"})}),Object(b.jsx)(i.g,{className:"float-right mr-3",children:["Day","Month","Year"].map((function(e){return Object(b.jsx)(i.f,{color:"outline-secondary",className:"mx-0",active:"Month"===e,children:e},e)}))})]})]}),Object(b.jsx)(m,{style:{height:"300px",marginTop:"40px"}})]})})]})}},689:function(e,t,n){e.exports=n(378)},690:function(e,t,n){"use strict";function r(e,t,n,r,a,o,c){try{var s=e[o](c),i=s.value}catch(u){return void n(u)}s.done?t(i):Promise.resolve(i).then(r,a)}function a(e){return function(){var t=this,n=arguments;return new Promise((function(a,o){var c=e.apply(t,n);function s(e){r(c,a,o,s,i,"next",e)}function i(e){r(c,a,o,s,i,"throw",e)}s(void 0)}))}}n.d(t,"a",(function(){return a}))}}]);
//# sourceMappingURL=33.42c9f1b3.chunk.js.map