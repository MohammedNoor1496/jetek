(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[12],{1475:function(e,t,a){"use strict";a.r(t);var n=a(43),c=a(689),o=a.n(c),r=a(690),i=a(632),l=a(1),s=a(726),u=a.n(s),j=a(768),d=a(779),p=a(1011),b=a(1515),h=a(1516),O=a(1517),f=a(1518),g=a(1519),m=a(1012),v=a(987),x=a(20),C=Object(p.a)({root:{maxWidth:345},profileimage:{width:200,height:200}});function y(e){var t=e.data,a=t.photo,n=t.firstName,c=t.phone,o=(t._id,t.confirmed),r=t.leftSideOfvehicle,i=t.rightSideOfvehicle,l=t.vehicleLicense,s=t.drivingLicense,u=t.backOfvehicle,j=t.frontOfvehicle,d=C();return Object(x.jsxs)(b.a,{className:d.root,children:[Object(x.jsxs)(h.a,{children:[Object(x.jsx)(g.a,{className:d.profileimage,component:"img",alt:"Contemplative Reptile",height:"140",image:"https://jetek-tr5el.ondigitalocean.app".concat(a),title:"Contemplative Reptile"}),Object(x.jsxs)(f.a,{children:[Object(x.jsx)(v.a,{gutterBottom:!0,variant:"h5",component:"h2",children:n}),Object(x.jsx)(v.a,{variant:"body2",color:"textSecondary",component:"p",children:c})]})]}),Object(x.jsxs)(O.a,{children:[Object(x.jsx)(m.a,{size:"small",color:"primary",onClick:function(){e.statusRemoveHandler(e.data._id)},children:"\u062d\u0630\u0641 \u0627\u0644\u0643\u0627\u0628\u062a\u0646"}),Object(x.jsx)(m.a,{size:"small",color:"primary",onClick:function(){e.viewFilesHandler(r,i,l,s,u,j)},children:"\u0639\u0631\u0636 \u0627\u0644\u0645\u0644\u0641\u0627\u062a"}),Object(x.jsx)(m.a,{size:"small",color:"primary",onClick:function(){e.statusChangeHandler(e.data._id)},children:o?"\u062a\u0639\u0637\u064a\u0644 ":"\u062a\u0641\u0639\u064a\u0644"})]})]})}var k=a(1522),N=a(1523),w=a(1525),I=a(1082);function S(){return Math.round(20*Math.random())-10}function M(){var e=50+S(),t=50+S();return{top:"".concat(e,"%"),left:"".concat(t,"%"),transform:"translate(-".concat(e,"%, -").concat(t,"%)")}}var z=Object(p.a)((function(e){return{root:{display:"flex",flexWrap:"wrap",justifyContent:"space-around",overflow:"hidden",backgroundColor:e.palette.background.paper},gridList:{width:500,height:450},icon:{color:"rgba(255, 255, 255, 0.54)"},paper:{position:"absolute",width:600,height:400,backgroundColor:e.palette.background.paper,border:"2px solid #000",boxShadow:e.shadows[5],padding:e.spacing(2,4,3)},profileimage:{width:150,height:150,margin:8}}}));t.default=function(){var e=z(),t=Object(l.useState)(M),a=Object(i.a)(t,1)[0],c=Object(l.useState)(!1),s=Object(i.a)(c,2),p=s[0],b=s[1],h=Object(l.useState)(""),O=Object(i.a)(h,2),f=O[0],g=O[1],m=Object(l.useState)(""),v=Object(i.a)(m,2),C=v[0],S=v[1],T=Object(l.useState)(""),R=Object(i.a)(T,2),B=R[0],D=R[1],H=Object(l.useState)(""),J=Object(i.a)(H,2),A=J[0],U=J[1],L=Object(l.useState)(""),W=Object(i.a)(L,2),Y=W[0],P=W[1],Z=Object(l.useState)(""),E=Object(i.a)(Z,2),F=E[0],V=E[1],X=function(e,t,a,n,c,o){g(n),S(a),V(t),P(e),U(c),D(o),b(!0)},_=Object(x.jsxs)("div",{style:a,className:e.paper,children:[Object(x.jsx)("h2",{id:"simple-modal-title",children:"\u0627\u0644\u0645\u0644\u0641\u0627\u062a \u0627\u0644\u062e\u0627\u0635\u0629 \u0628\u0627\u0644\u0643\u0627\u0628\u062a\u0646"}),Object(x.jsx)("img",{className:e.profileimage,src:"https://jetek-tr5el.ondigitalocean.app".concat(f)}),Object(x.jsx)("img",{className:e.profileimage,src:"https://jetek-tr5el.ondigitalocean.app".concat(C)}),Object(x.jsx)("img",{className:e.profileimage,src:"https://jetek-tr5el.ondigitalocean.app".concat(B)}),Object(x.jsx)("img",{className:e.profileimage,src:"https://jetek-tr5el.ondigitalocean.app".concat(A)}),Object(x.jsx)("img",{className:e.profileimage,src:"https://jetek-tr5el.ondigitalocean.app".concat(Y)}),Object(x.jsx)("img",{className:e.profileimage,src:"https://jetek-tr5el.ondigitalocean.app".concat(F)})]}),G=Object(l.useState)([]),Q=Object(i.a)(G,2),K=Q[0],q=Q[1],$=Object(l.useState)({isOpen:!1,message:"",type:""}),ee=Object(i.a)($,2),te=ee[0],ae=ee[1],ne=Object(l.useState)({isOpen:!1,title:"",subTitle:""}),ce=Object(i.a)(ne,2),oe=ce[0],re=ce[1],ie=u.a.create({baseURL:"https://jetek-tr5el.ondigitalocean.app/admin",headers:{"auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNWZhNDliMjUzNjI1MjliMDMzMTBhMyIsImlhdCI6MTYxNzI3OTI5NSwiZXhwIjoxNjE3MzY1Njk1fQ.vUJVRdhU3sMKhnCrZIE9W-7fIAumUNQJ-N8vOIpP3XY"}}),le=function(){var e=Object(r.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,ie.get("/getAllCaptins");case 3:return t=e.sent,e.next=6,q(t.data);case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),se=function(e){re({isOpen:!0,title:"   \u0647\u0644 \u0627\u0646\u062a \u0645\u062a\u0627\u0643\u062f \u0645\u0646 \u062d\u0630\u0641 \u0627\u0644\u0643\u0627\u0628\u062a\u0646 \u061f",subTitle:"\u0644\u0627 \u064a\u0645\u0643\u0646\u0643 \u0627\u0644\u062a\u0631\u0627\u062c\u0639 \u0639\u0646 \u0647\u0630\u0629 \u0627\u0644\u0639\u0645\u0644\u064a\u0629 ",onConfirm:function(){ue(e)}})},ue=function(){var e=Object(r.a)(o.a.mark((function e(t){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:re(Object(n.a)(Object(n.a)({},oe),{},{isOpen:!1})),a={id:t},u.a.post("https://jetek-tr5el.ondigitalocean.app/admin/deleteCaptin",a).then((function(e){console.log(e),200==e.status&&(le(),ae({isOpen:!0,message:"\u062a\u0645 \u062d\u0630\u0641 \u0627\u0644\u0643\u0627\u0628\u062a\u0646",type:"error"}))})).catch((function(e){return console.log(e)}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),je=function(){var e=Object(r.a)(o.a.mark((function e(t){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(t),re(Object(n.a)(Object(n.a)({},oe),{},{isOpen:!1})),a={id:t},u.a.post("https://jetek-tr5el.ondigitalocean.app/admin/disableCaptin",a).then((function(e){console.log(e),200==e.status&&(le(),ae({isOpen:!0,message:"\u062a\u0645 \u062a\u0639\u062f\u064a\u0644  \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645",type:"success"}))})).catch((function(e){return console.log(e)}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(l.useEffect)((function(){le()}),[]),Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("div",{className:e.root,children:Object(x.jsxs)(k.a,{cellHeight:180,className:e.gridList,children:[Object(x.jsx)(N.a,{cols:2,style:{height:"auto"},children:Object(x.jsx)(w.a,{component:"div",children:"\u0627\u0644\u0643\u0628\u0627\u062a\u0646"})},"Subheader"),K.map((function(e){return Object(x.jsx)(y,{data:e,statusChangeHandler:je,statusRemoveHandler:se,viewFilesHandler:X})})),console.log(f)+"dl",console.log(C)+"vl",console.log(B)+"fv",console.log(A)+"bv",console.log(Y)+"lv",console.log(F)+"rv"]})}),Object(x.jsx)(j.a,{notify:te,setNotify:ae}),Object(x.jsx)(d.a,{confirmDialog:oe,setConfirmDialog:re}),Object(x.jsx)(I.a,{open:p,onClose:function(){b(!1)},"aria-labelledby":"simple-modal-title","aria-describedby":"simple-modal-description",children:_})]})}},689:function(e,t,a){e.exports=a(378)},690:function(e,t,a){"use strict";function n(e,t,a,n,c,o,r){try{var i=e[o](r),l=i.value}catch(s){return void a(s)}i.done?t(l):Promise.resolve(l).then(n,c)}function c(e){return function(){var t=this,a=arguments;return new Promise((function(c,o){var r=e.apply(t,a);function i(e){n(r,c,o,i,l,"next",e)}function l(e){n(r,c,o,i,l,"throw",e)}i(void 0)}))}}a.d(t,"a",(function(){return c}))},768:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(43),c=(a(1),a(1011)),o=a(1526),r=a(1534),i=a(20),l=Object(c.a)((function(e){return{root:{top:e.spacing(9),left:e.spacing(1)}}}));function s(e){var t=e.notify,a=e.setNotify,c=l(),s=function(e,c){"clickaway"!==c&&a(Object(n.a)(Object(n.a)({},t),{},{isOpen:!1}))};return Object(i.jsx)(o.a,{className:c.root,open:t.isOpen,autoHideDuration:3e3,anchorOrigin:{vertical:"top",horizontal:"right"},onClose:s,children:Object(i.jsx)(r.a,{severity:t.type,onClose:s,children:t.message})})}},779:function(e,t,a){"use strict";a.d(t,"a",(function(){return D}));var n=a(43),c=(a(1),a(1011)),o=a(1507),r=a(1521),i=a(982),l=a(1510),s=a(987),u=a(1511),j=a(158),d=a(1002),p=a(20);var b=a(1003),h=a(1506),O=a(1020),f=a(1007),g=a(1538);var m=a(1004),v=a(1084),x=a(985),C=a(1005);var y=a(1080);var k=a(769),N=a(1533),w=a(778);var I=a(1012),S=Object(c.a)((function(e){return{root:{margin:e.spacing(.5)},label:{textTransform:"none"}}}));var M=Object(c.a)((function(e){return{root:{minWidth:0,margin:e.spacing(.5)},secondary:{backgroundColor:e.palette.secondary.light,"& .MuiButton-label":{color:e.palette.secondary.main}},primary:{backgroundColor:e.palette.primary.light,"& .MuiButton-label":{color:e.palette.primary.main}}}}));var z={Input:function(e){var t=e.name,a=e.label,c=e.value,o=e.error,r=void 0===o?null:o,i=e.onChange,l=Object(j.a)(e,["name","label","value","error","onChange"]);return Object(p.jsx)(d.a,Object(n.a)(Object(n.a)({variant:"outlined",label:a,name:t,value:c,onChange:i},l),r&&{error:!0,helperText:r}))},RadioGroup:function(e){var t=e.name,a=e.label,n=e.value,c=e.onChange,o=e.items;return Object(p.jsxs)(b.a,{children:[Object(p.jsx)(h.a,{children:a}),Object(p.jsx)(O.a,{row:!0,name:t,value:n,onChange:c,children:o.map((function(e){return Object(p.jsx)(f.a,{value:e.id,control:Object(p.jsx)(g.a,{}),label:e.title},e.id)}))})]})},Select:function(e){var t=e.name,a=e.label,c=e.value,o=e.error,r=void 0===o?null:o,i=e.onChange,l=e.options;return Object(p.jsxs)(b.a,Object(n.a)(Object(n.a)({variant:"outlined"},r&&{error:!0}),{},{children:[Object(p.jsx)(m.a,{children:a}),Object(p.jsxs)(v.a,{label:a,name:t,value:c,onChange:i,children:[Object(p.jsx)(x.a,{value:"",children:"None"}),l.map((function(e){return Object(p.jsx)(x.a,{value:e.id,children:e.title},e.id)}))]}),r&&Object(p.jsx)(C.a,{children:r})]}))},Checkbox:function(e){var t=e.name,a=e.label,n=e.value,c=e.onChange;return Object(p.jsx)(b.a,{children:Object(p.jsx)(f.a,{control:Object(p.jsx)(y.a,{name:t,color:"primary",checked:n,onChange:function(e){return c(function(e,t){return{target:{name:e,value:t}}}(t,e.target.checked))}}),label:a})})},DatePicker:function(e){var t=e.name,a=e.label,n=e.value,c=e.onChange;return Object(p.jsx)(k.a,{utils:w.default,children:Object(p.jsx)(N.a,{disableToolbar:!0,variant:"inline",inputVariant:"outlined",label:a,format:"MMM/dd/yyyy",name:t,value:n,onChange:function(e){return c(function(e,t){return{target:{name:e,value:t}}}(t,e))}})})},Button:function(e){var t=e.text,a=e.size,c=e.color,o=e.variant,r=e.onClick,i=Object(j.a)(e,["text","size","color","variant","onClick"]),l=S();return Object(p.jsx)(I.a,Object(n.a)(Object(n.a)({variant:o||"contained",size:a||"large",color:c||"primary",onClick:r},i),{},{classes:{root:l.root,label:l.label},children:t}))},ActionButton:function(e){var t=e.color,a=e.children,n=e.onClick,c=M();return Object(p.jsx)(I.a,{className:"".concat(c.root," ").concat(c[t]),onClick:n,children:a})}},T=a(882),R=a.n(T),B=Object(c.a)((function(e){return{dialog:{padding:e.spacing(2),position:"absolute",top:e.spacing(5)},dialogTitle:{textAlign:"center"},dialogContent:{textAlign:"center"},dialogAction:{justifyContent:"center"},titleIcon:{backgroundColor:e.palette.secondary.light,color:e.palette.secondary.main,"&:hover":{backgroundColor:e.palette.secondary.light,cursor:"default"},"& .MuiSvgIcon-root":{fontSize:"8rem"}}}}));function D(e){var t=e.confirmDialog,a=e.setConfirmDialog,c=B();return Object(p.jsxs)(o.a,{open:t.isOpen,classes:{paper:c.dialog},children:[Object(p.jsx)(r.a,{className:c.dialogTitle,children:Object(p.jsx)(i.a,{disableRipple:!0,className:c.titleIcon,children:Object(p.jsx)(R.a,{})})}),Object(p.jsxs)(l.a,{className:c.dialogContent,children:[Object(p.jsx)(s.a,{variant:"h6",children:t.title}),Object(p.jsx)(s.a,{variant:"subtitle2",children:t.subTitle})]}),Object(p.jsxs)(u.a,{className:c.dialogAction,children:[Object(p.jsx)(z.Button,{text:"No",color:"default",onClick:function(){return a(Object(n.a)(Object(n.a)({},t),{},{isOpen:!1}))}}),Object(p.jsx)(z.Button,{text:"Yes",color:"secondary",onClick:t.onConfirm})]})]})}}}]);
//# sourceMappingURL=12.23ffc993.chunk.js.map