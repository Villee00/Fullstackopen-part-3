(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var r=t(0),c=t(1),a=t(14),o=t.n(a),u=t(4),i=function(e){var n=e.filterdPerson,t=e.onChangeHandle;return Object(r.jsxs)("div",{children:["filter shown with ",Object(r.jsx)("input",{value:n,onChange:t})]})},s=function(e){var n=e.addPerson,t=e.newName,c=e.handleChangeName,a=e.newNumber,o=e.handleChangeNumber;return Object(r.jsxs)("form",{onSubmit:n,children:[Object(r.jsxs)("div",{children:["name: ",Object(r.jsx)("input",{value:t,onChange:c})]}),Object(r.jsxs)("div",{children:["number: ",Object(r.jsx)("input",{value:a,onChange:o})]}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"submit",children:"add"})})]})},d=t(3),l=t.n(d),j="http://localhost:3001/api/persons/",h=function(){return l.a.get(j).then((function(e){return e.data}))},f=function(e){return l.a.post(j,e).then((function(e){return e.data}))},b=function(e){return l.a.delete(j+e).then((function(e){return e.data}))},m=function(e,n){return l.a.put(j+e,n).then((function(e){return e.data}))},O=function(e){var n=e.deletePerson,t=e.person;return Object(r.jsxs)("div",{children:[Object(r.jsxs)("p",{children:[t.name," ",t.number]}),Object(r.jsx)("button",{onClick:function(){return n(t)},children:"delete"})]})},p=function(e){var n=e.deletePerson,t=e.filterdPerson,c=e.persons.filter((function(e){return e.name.toLowerCase().startsWith(t.toLowerCase())}));return Object(r.jsx)("div",{children:c.map((function(e){return Object(r.jsx)(O,{person:e,deletePerson:n},e.name)}))})},v=function(e){var n=e.message;return null===n?null:Object(r.jsx)("div",{style:{color:"white",backgroundColor:"darkgrey",padding:"10px"},children:n})},x=function(){var e=Object(c.useState)([]),n=Object(u.a)(e,2),t=n[0],a=n[1],o=Object(c.useState)(""),d=Object(u.a)(o,2),l=d[0],j=d[1],O=Object(c.useState)(""),x=Object(u.a)(O,2),g=x[0],w=x[1],C=Object(c.useState)(""),P=Object(u.a)(C,2),N=P[0],k=P[1],y=Object(c.useState)(""),S=Object(u.a)(y,2),D=S[0],T=S[1];return Object(c.useEffect)((function(){h().then((function(e){a(e)}))}),[]),Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Phonebook"}),Object(r.jsx)(v,{message:D}),Object(r.jsx)(i,{filterdPerson:N,onChangeHandle:function(e){k(e.target.value)}}),Object(r.jsx)("h2",{children:"Add a new"}),Object(r.jsx)(s,{addPerson:function(e){e.preventDefault();var n={name:l,number:g};if(t.some((function(e){return e.name===l}))){var r=t.find((function(e){return e.name===l}));window.confirm("".concat(l," is already added to phonebook, replace the old number with the new one?"))&&(m(r.id,n).then((function(e){a(t.map((function(n){return n!==r?n:e}))),j(""),w("")})),T("Replaced ".concat(l)),setTimeout((function(){T(null)}),2e3))}else f(n).then((function(e){a(t.concat(e)),j(""),w("")})),T("Added ".concat(l)),setTimeout((function(){T(null)}),2e3)},newName:l,handleChangeName:function(e){j(e.target.value)},newNumber:g,handleChangeNumber:function(e){w(e.target.value)}}),Object(r.jsx)("h2",{children:"Numbers"}),Object(r.jsx)(p,{deletePerson:function(e){window.confirm("Delete ".concat(e.name,"?"))&&(b(e.id).then((function(){var n=t.filter((function(n){return n.id!==e.id}));a(n),T("Deleted ".concat(e.name))})).catch((function(n){T("Information of ".concat(e.name," has already been removed from the server"))})),setTimeout((function(){T(null)}),2e3))},filterdPerson:N,persons:t})]})};t(38);o.a.render(Object(r.jsx)(x,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.b65a486c.chunk.js.map