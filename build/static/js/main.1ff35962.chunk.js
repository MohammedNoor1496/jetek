(this.webpackJsonpusers=this.webpackJsonpusers||[]).push([[0],{62:function(e,t,a){e.exports=a(98)},67:function(e,t,a){},68:function(e,t,a){},98:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(52),l=a.n(c),o=(a(67),a(68),a(69),a(6)),s=a.n(o),m=a(9),u=a(5),i=a(10),p=a.n(i),d=a(8),f="https://jetek-tr5el.ondigitalocean.app/cpAdmin",b="https://jetek-tr5el.ondigitalocean.app",E=function(){var e=Object(n.useState)([]),t=Object(u.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)("608b599dce9aa300229f9b87"),o=Object(u.a)(l,2),i=o[0];o[1];Object(n.useEffect)((function(){E()}),[]);var E=function(){var e=Object(m.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.post("".concat(f,"/getCpProducts"),{sell_point_id:i});case 2:t=e.sent,c(t.data.reverse());case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),v=function(){var e=Object(m.a)(s.a.mark((function e(t){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("deleted id "+t),a={pId:t,sell_point_id:i},e.next=4,p.a.post("".concat(f,"/deleteProdutc"),a);case 4:E();case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"py-4"},r.a.createElement("h1",null,"Home Page"),r.a.createElement("table",{className:"table border shadow"},r.a.createElement("thead",{className:"thead-dark"},r.a.createElement("tr",null,r.a.createElement("th",{scope:"col"},"#"),r.a.createElement("th",{scope:"col"},"\u0625\u0633\u0645 \u0627\u0644\u0645\u0646\u062a\u062c "),r.a.createElement("th",{scope:"col"},"\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0646\u062a\u062c "),r.a.createElement("th",{scope:"col"},"\u0627\u0644\u0633\u0639\u0631 "),r.a.createElement("th",null,"\u0625\u062c\u0631\u0627\u0621"))),r.a.createElement("tbody",null,a.map((function(e,t){return r.a.createElement("tr",{key:e._id},r.a.createElement("th",{scope:"row"},t+1),r.a.createElement("td",null,e.name),r.a.createElement("td",null,r.a.createElement("img",{style:{width:250,height:250},src:"".concat(b).concat(e.photo)})),r.a.createElement("td",null,e.price),r.a.createElement("td",null,r.a.createElement(d.c,{className:"btn btn-primary mr-2",to:"/users/".concat(e._id)},"\u0639\u0631\u0636"),r.a.createElement(d.c,{className:"btn btn-outline-primary mr-2",to:"/users/edit/".concat(e._id)},"\u062a\u0639\u062f\u064a\u0644"),r.a.createElement("button",{className:"btn btn-danger",onClick:function(){return v(e._id)}},"\u062d\u0630\u0641")))}))))))},v=a(102),h=a(103),g=a(54),j=a(105),O=a(106),N=(a(36),a(7)),y=function(){var e=Object(N.f)(),t=Object(n.useState)([]),a=Object(u.a)(t,2),c=a[0],l=(a[1],Object(n.useState)("608b599dce9aa300229f9b87")),o=Object(u.a)(l,2),i=o[0],d=(o[1],Object(n.useState)()),E=Object(u.a)(d,2),y=E[0],x=E[1],w=Object(n.useState)(""),S=Object(u.a)(w,2),k=(S[0],S[1],Object(n.useState)(c.lat)),C=Object(u.a)(k,2),I=(C[0],C[1],Object(n.useState)(c.lng)),_=Object(u.a)(I,2),P=(_[0],_[1],Object(n.useState)(c.phone)),D=Object(u.a)(P,2),T=D[0],q=D[1],F=Object(n.useState)(c.email),G=Object(u.a)(F,2),H=G[0],L=G[1],Y=Object(n.useState)(c.cpName),A=Object(u.a)(Y,2),J=A[0],W=A[1],B=function(){var e=Object(m.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t={spId:i},p.a.post("".concat(f,"/getSPIfo"),t).then((function(e){W(e.data.cpName),q(e.data.phone),L(e.data.email),x(e.data.cpImage)})).catch((function(e){return console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),R=function(){var t=Object(m.a)(s.a.mark((function t(a){var n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),n={name:J,email:H,phone:T,sell_point_id:i},t.next=4,p.a.post("".concat(f,"/updatePointOfSellData"),n,{headers:{"Content-Type":"application/json"}});case 4:e.push("/about");case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),U=function(){var t=Object(m.a)(s.a.mark((function t(a){var n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),(n=new FormData).append("sell_point_id",i),n.append("pImage",y),t.next=6,p.a.post("".concat(f,"/updatePointOfSellImage"),n,{headers:{"Content-Type":"multipart/form-data"}});case 6:e.push("/about");case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(n.useEffect)((function(){B()}),[1e3]),r.a.createElement(v.a,null,r.a.createElement(h.a,null,r.a.createElement(g.a,null,r.a.createElement("img",{style:{width:200,height:200,borderRadius:10,marginTop:10},src:"".concat(b).concat(y),alt:"profils pic"}),r.a.createElement(j.a,{className:"form",onSubmit:U},r.a.createElement(j.a.Group,{controlId:"formCategory4"},r.a.createElement(j.a.Label,null,"\u0635\u0648\u0631\u0629 \u0646\u0642\u0637\u0629 \u0627\u0644\u0628\u064a\u0639 "),r.a.createElement(j.a.Control,{required:!0,type:"file",name:"profileImage",onChange:function(e){return function(e){var t=e.target.files[0];x(t)}(e)}})),r.a.createElement(O.a,{variant:"primary",type:"submit"},"\u062a\u063a\u064a\u064a\u0631 \u0627\u0644\u0635\u0648\u0631\u0629"))),r.a.createElement(g.a,null,r.a.createElement("h1",null,"User Profile"),r.a.createElement(j.a,{className:"form",onSubmit:R},r.a.createElement(j.a.Group,{controlId:"formCategory1"},r.a.createElement(j.a.Label,null,"\u0625\u0633\u0645 \u0627\u0644\u0645\u062d\u0644 "),r.a.createElement(j.a.Control,{type:"text",onChange:function(e){return W(e.target.value)},required:!0,value:J||""})),r.a.createElement(j.a.Group,{controlId:"formCategory2"},r.a.createElement(j.a.Label,null,"\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0627\u0644\u0643\u062a\u0631\u0648\u0646\u064a "),r.a.createElement(j.a.Control,{type:"email",onChange:function(e){return L(e.target.value)},required:!0,value:H||""})),r.a.createElement(j.a.Group,{controlId:"formCategory2"},r.a.createElement(j.a.Label,null," \u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641 "),r.a.createElement(j.a.Control,{type:"number",required:!0,onChange:function(e){return q(e.target.value)},value:T||""})),r.a.createElement(O.a,{variant:"primary",type:"submit"},"\u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a")))))},x=function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"py-4"},r.a.createElement("h1",null,"Contact Page"),r.a.createElement("form",null,r.a.createElement("div",{class:"form-group"},r.a.createElement("label",{for:"exampleInputEmail1"},"Email address"),r.a.createElement("input",{type:"email",class:"form-control",id:"exampleInputEmail1","aria-describedby":"emailHelp"}),r.a.createElement("small",{id:"emailHelp",class:"form-text text-muted"},"We'll never share your email with anyone else.")),r.a.createElement("div",{class:"form-group"},r.a.createElement("label",{for:"exampleInputPassword1"},"Password"),r.a.createElement("input",{type:"password",class:"form-control",id:"exampleInputPassword1"})),r.a.createElement("div",{class:"form-group form-check"},r.a.createElement("input",{type:"checkbox",class:"form-check-input",id:"exampleCheck1"}),r.a.createElement("label",{class:"form-check-label",for:"exampleCheck1"},"Check me out")),r.a.createElement("button",{type:"submit",class:"btn btn-primary"},"Submit"))))},w=(a(33),a(104)),S=function(){var e=Object(n.useState)(!0),t=Object(u.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(),o=Object(u.a)(l,2),i=(o[0],o[1]),b=Object(n.useState)("608b599dce9aa300229f9b87"),E=Object(u.a)(b,2),v=E[0],h=(E[1],function(){var e=Object(m.a)(s.a.mark((function e(t,a){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.post("".concat(f,"/chageState"),{status:t,spId:a});case 2:e.sent;case 3:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}());return r.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark bg-primary"},r.a.createElement("div",{className:"container"},r.a.createElement(d.c,{className:"navbar-brand",to:"/"},"\u0646\u0642\u0637\u0629 \u0628\u064a\u0639 \u062c\u064a\u062a\u0643"),r.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},r.a.createElement("span",{className:"navbar-toggler-icon"})),r.a.createElement("div",{className:"collapse navbar-collapse"},r.a.createElement("ul",{className:"navbar-nav mr-auto"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(d.d,{className:"nav-link",exact:!0,to:"/"},"\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(d.d,{className:"nav-link",exact:!0,to:"/about"},"\u0627\u0644\u0635\u0641\u062d\u0629 \u0627\u0644\u0634\u062e\u0635\u064a\u0629")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(d.d,{className:"nav-link",exact:!0,to:"/contact"},"\u0627\u0644\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u0627\u062f\u0627\u0631\u0629")),r.a.createElement("li",{className:"nav-item"},r.a.createElement("div",{className:"nav-link"},r.a.createElement(w.a,{onChange:function(){c(!a),console.log(a),i(a),h(a,v)}}),a?r.a.createElement("span",null,"offline"):r.a.createElement("span",null,"online"))))),r.a.createElement(d.c,{className:"btn btn-outline-light",to:"/users/add"},"\u0625\u0636\u0627\u0641\u0629 \u0645\u0646\u062a\u062c ")))},k=function(){return r.a.createElement("div",{className:"not-found"},r.a.createElement("h1",{className:"display-1"},"Page Not Found"))},C=function(){var e=Object(N.f)(),t=Object(n.useState)(""),a=Object(u.a)(t,2),c=a[0],l=a[1],o=Object(n.useState)(),i=Object(u.a)(o,2),d=i[0],b=i[1],E=Object(n.useState)("608b599dce9aa300229f9b87"),v=Object(u.a)(E,2),h=v[0],g=(v[1],Object(n.useState)()),j=Object(u.a)(g,2),O=j[0],y=j[1],x=function(){var t=Object(m.a)(s.a.mark((function t(a){var n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(n=new FormData).append("name",c),n.append("price",d),n.append("sell_point_id",h),n.append("pImage",O),a.preventDefault(),t.next=8,p.a.post("".concat(f,"/createProduct"),n,{headers:{"Content-Type":"multipart/form-data"}});case 8:e.push("/");case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"w-75 mx-auto shadow p-5"},r.a.createElement("h2",{className:"text-center mb-4"},"\u0625\u0636\u0627\u0641\u0629 \u0645\u0646\u062a\u062c"),r.a.createElement("form",{onSubmit:function(e){return x(e)},encType:"multipart/form-data",method:"post"},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",className:"form-control form-control-lg",placeholder:"\u0625\u0633\u0645 \u0627\u0644\u0645\u0646\u062a\u062c",name:"name",value:c,onChange:function(e){return l(e.target.value)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",className:"form-control form-control-lg",placeholder:"\u0633\u0639\u0631 \u0627\u0644\u0645\u0646\u062a\u062c",name:"price",value:d,onChange:function(e){return b(e.target.value)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"\u0635\u0648\u0631\u0629 \u0644\u0644\u0645\u0646\u062a\u062c"),r.a.createElement("input",{type:"file",className:"form-control form-control-lg",placeholder:"\u0623\u062e\u062a\u0631 \u0635\u0648\u0631\u0629 \u0644\u0644\u0645\u0646\u062a\u062c",name:"pImage",onChange:function(e){return function(e){var t=e.target.files[0];y(t)}(e)}})),r.a.createElement("button",{className:"btn btn-primary btn-block"},"\u062d\u0641\u0638 \u0627\u0644\u0645\u0646\u062a\u062c"))))},I=function(){var e=Object(N.f)(),t=Object(N.g)().id,a=Object(n.useState)("608b599dce9aa300229f9b87"),c=Object(u.a)(a,2),l=c[0],o=(c[1],Object(n.useState)("")),i=Object(u.a)(o,2),d=i[0],E=i[1],v=Object(n.useState)(),h=Object(u.a)(v,2),g=h[0],j=h[1],O=Object(n.useState)(),y=Object(u.a)(O,2),x=y[0],w=y[1];Object(n.useEffect)((function(){k()}),[]);var S=function(){var a=Object(m.a)(s.a.mark((function a(n){var r;return s.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n.preventDefault(),(r=new FormData).append("productId",t),r.append("name",d),r.append("price",g),r.append("sell_point_id",l),r.append("pImage",x),a.next=9,p.a.post("".concat(f,"/editProduct"),r);case 9:e.push("/");case 10:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}(),k=function(){var e=Object(m.a)(s.a.mark((function e(){var a,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={pId:t,sell_point_id:l},e.next=3,p.a.post("".concat(f,"/getProductInfo"),a);case 3:n=e.sent,w(n.data.photo),E(n.data.name),j(n.data.price);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"w-75 mx-auto shadow p-5"},r.a.createElement("h2",{className:"text-center mb-4"},"\u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0645\u0646\u062a\u062c"),r.a.createElement("form",{onSubmit:function(e){return S(e)}},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",className:"form-control form-control-lg",placeholder:"Enter Your Name",name:"name",value:d||"",onChange:function(e){return E(e.target.value)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("td",null,r.a.createElement("img",{style:{width:250,height:250},src:"".concat(b).concat(x)}))),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"file",className:"form-control form-control-lg",placeholder:"Enter Your Website Name",name:"pImage",onChange:function(e){return function(e){var t=e.target.files[0];w(t)}(e)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",className:"form-control form-control-lg",placeholder:"Enter Your price Number",name:"price",value:g||"",onChange:function(e){return j(e.target.value)}})),r.a.createElement("button",{className:"btn btn-warning btn-block"},"\u062d\u0641\u0638"))))},_=function(){var e=Object(n.useState)("608b599dce9aa300229f9b87"),t=Object(u.a)(e,2),a=t[0],c=(t[1],Object(n.useState)({name:"",username:"",email:"",phone:"",webiste:""})),l=Object(u.a)(c,2),o=l[0],i=l[1],E=Object(N.g)().id;console.log(E),Object(n.useEffect)((function(){v()}),[]);var v=function(){var e=Object(m.a)(s.a.mark((function e(){var t,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(E),t={pId:E,sell_point_id:a},e.next=4,p.a.post("".concat(f,"/getProductInfo"),t);case 4:n=e.sent,i(n.data),console.log(n.data);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"container py-4"},r.a.createElement(d.c,{className:"btn btn-primary",to:"/"},"back to Home"),r.a.createElement("h1",{className:"display-4"},"\u0625\u0633\u0645 \u0627\u0644\u0645\u0646\u062a\u062c: ",o.name),r.a.createElement("hr",null),r.a.createElement("ul",{className:"list-group w-50"},r.a.createElement("li",{className:"list-group-item"},"\u0625\u0633\u0645 \u0627\u0644\u0645\u0646\u062a\u062c: ",o.name),r.a.createElement("li",{className:"list-group-item"},"\u0627\u0644\u0633\u0639\u0631: ",o.price),r.a.createElement("td",null,r.a.createElement("img",{style:{width:250,height:250},src:"".concat(b).concat(o.photo)}))))};var P=function(e){return r.a.createElement(d.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(S,null),r.a.createElement(N.c,null,r.a.createElement(N.a,{exact:!0,path:"/",component:E}),r.a.createElement(N.a,{exact:!0,path:"/about",component:y}),r.a.createElement(N.a,{exact:!0,path:"/contact",component:x}),r.a.createElement(N.a,{exact:!0,path:"/users/add",component:C}),r.a.createElement(N.a,{exact:!0,path:"/users/edit/:id",component:I}),r.a.createElement(N.a,{exact:!0,path:"/users/:id",component:_}),r.a.createElement(N.a,{component:k}))))};l.a.render(r.a.createElement(d.b,null,r.a.createElement(P,null)),document.getElementById("root"))}},[[62,1,2]]]);
//# sourceMappingURL=main.1ff35962.chunk.js.map