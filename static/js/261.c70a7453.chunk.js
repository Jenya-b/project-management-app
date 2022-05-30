"use strict";(self.webpackChunkproject_management_app=self.webpackChunkproject_management_app||[]).push([[261],{9911:function(e,n,t){t.d(n,{T:function(){return i}});var r=t(9434),i=function(){return(0,r.I0)()}},9565:function(e,n,t){t.d(n,{C:function(){return r}});var r=t(9434).v9},3131:function(e,n,t){t.d(n,{f:function(){return s}});var r=t(6151),i=t(3168),o=t(867),a=t(184),s=function(e){var n=e.variant,t=e.text,s=e.onClick,c=(0,i.$)().t;return(0,a.jsx)(r.Z,{variant:n,sx:{backgroundColor:o.iZ},onClick:s,children:c(t)})}},9308:function(e,n,t){t.d(n,{U:function(){return c}});var r=t(9157),i=t(1691),o=t(5661),a=t(3168),s=t(184),c=function(e){var n=e.title,t=e.desc,c=(0,a.$)().t;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.Z,{children:c(n)}),(0,s.jsx)(r.Z,{children:(0,s.jsx)(i.Z,{children:c(t)})})]})}},970:function(e,n,t){t.d(n,{Z:function(){return u}});var r=t(9439),i=t(1413),o=t(2791),a=t(5646),s=t(4554),c=t(9658),l=t(184),d=o.forwardRef((function(e,n){return(0,l.jsx)(c.Z,(0,i.Z)({elevation:6,ref:n,variant:"filled"},e))}));function u(e){var n=e.messages,t=o.useState(!1),i=(0,r.Z)(t,2),c=i[0],u=i[1];return o.useEffect((function(){u(!!n.length)}),[n]),(0,l.jsx)(a.Z,{open:c,autoHideDuration:6e3,onClose:function(){u(!1)},children:(0,l.jsx)(s.Z,{children:n.map((function(e){return(0,l.jsx)(d,{severity:"error",sx:{width:"100%",marginBottom:"1em"},children:e},e)}))})})}},4356:function(e,n,t){t.d(n,{h:function(){return U}});var r=t(9439),i=t(2791),o=t(3504),a=t(6871),s=["homePage"],c=["editProfile","logOut"],l=c[0],d=c[1],u="logOutModal",f="newProject",x=t(3686),m=t(2419),p=t(4395),h=t(4554),g=t(4663),j=t(3400),b=t(911),v=t(3903),Z=t(890),w=t(1469),k=t(7133),C=t(3044),S=t(8008),T=t(9911),y=t(321),W=t(3168),R=t(9308),E=t(6387),F=t(9565),M=t(819),P=t(6942),N=t(2677),L=t(1413),A=t(3613),G=t(5709),_=t(867),D=t(5290),O=t(9112),q=t(937),z=t(970),B=t(184),I=function(e){var n=e.isModalActive,t=e.closeConfirmationDialog,r=e.confirmAction,o=(0,T.T)(),s=(0,a.s0)(),c=x.c.homePath,l=(0,W.$)().t,d=(0,D.cI)(),u=d.register,f=d.handleSubmit,m=d.formState.errors,p=(0,F.C)((function(e){return e.projectsReducer})),g=p.newProjectCreated,j=p.newProjectCreating,b=p.newProjectErrors,v=q.J.actions,w=v.resetProjectCreated,k=v.clearNewProjectErrors;return(0,i.useEffect)((function(){g&&(o((0,G.bl)()),s(c),o(w()),r())}),[g,o,s,w,r,c]),(0,i.useEffect)((function(){return function(){o(k())}}),[o,k]),(0,B.jsx)(M.P,{isActive:n,closeWindow:t,confirmAction:f((function(e){var n=e.title,t=e.description;o((0,G.$L)({projectData:{title:n,description:t}}))})),children:j?(0,B.jsx)(O.g,{isLoading:!0}):(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(Z.Z,{variant:"h6",component:"h2",children:l("newProjectTypography")}),(0,B.jsxs)(h.Z,{sx:{display:"flex",flexDirection:"column"},children:[(0,B.jsx)(Z.Z,{sx:{mt:2},variant:"body1",component:"p",children:l("projectName")}),(0,B.jsx)(A.Z,(0,L.Z)((0,L.Z)({placeholder:l("title"),sx:{mb:2,mt:1,width:_.S6}},u("title",{required:"projectTitleFieldRequiredError"})),{},{error:!!m.title,helperText:m.title?l(String(m.title.message)):l("projectTitleFieldHelpText")})),(0,B.jsx)(Z.Z,{sx:{mt:1},variant:"body1",component:"p",children:l("projectDesc")}),(0,B.jsx)(A.Z,(0,L.Z)((0,L.Z)({placeholder:l("description"),multiline:!0,rows:5,sx:{mb:4,mt:1,width:"17.5rem"}},u("description",{required:"projectDescriptionFieldRequiredError"})),{},{error:!!m.description,helperText:m.description?l(String(m.description.message)):l("projectDescriptionFieldHelpText")}))]}),(0,B.jsx)(z.Z,{messages:b})]})})},H=t(2279),U=function(){var e=(0,i.useState)(null),n=(0,r.Z)(e,2),t=n[0],L=n[1],A=(0,i.useState)(null),G=(0,r.Z)(A,2),_=G[0],D=G[1],O=(0,i.useState)("#ffffff"),q=(0,r.Z)(O,2),z=q[0],U=q[1],$=(0,F.C)((function(e){return e.langInterfaceReducer})).language,J=(0,i.useState)("en"===$),X=(0,r.Z)(J,2),Y=X[0],V=X[1],K=(0,i.useState)(""),Q=(0,r.Z)(K,2),ee=Q[0],ne=Q[1],te=(0,T.T)(),re=(0,F.C)((function(e){return e.confirmationDialog})).isModalActive,ie=y.B.actions.setLanguage,oe=E.P.actions.setDialogActivity,ae=(0,W.$)(),se=ae.t,ce=ae.i18n,le=(0,a.s0)(),de=x.c.editProfilePath;(0,i.useEffect)((function(){te(ie(Y?"en":"ru")),ce.changeLanguage(Y?"en":"ru")}),[te,ce,Y,ie]);var ue=(0,H.Z)();(0,i.useEffect)((function(){je()}),[ue]);var fe=function(){L(null)},xe=function(){D(null)},me=function(){te(oe(!1))},pe=function(){if(ee===u)ge();me(),setTimeout((function(){return ne("")}),500)},he=function(e){switch(e){case l:le(de);break;case d:ne(u),te(oe(!0));break;case f:ne(f),te(oe(!0))}xe()},ge=function(){localStorage.removeItem(N.G),localStorage.removeItem(N.B),te((0,P.kS)())},je=function(){var e=Math.floor(256*Math.random()),n=Math.floor(256*Math.random()),t=Math.floor(256*Math.random()),r="rgba(".concat(e,",").concat(n,",").concat(t,", .1)");return U(r),r};return(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(p.Z,{className:"header",position:"sticky",sx:{backgroundColor:"#ffffff",boxShadow:"unset",borderBottom:"solid 2px rgba(0, 0, 0, .1)",height:"5.2rem"},children:(0,B.jsx)(h.Z,{sx:{backgroundColor:ue?z:"#ffffff",display:"flex",alignItems:"center",transition:".3s",height:"5.2rem"},children:(0,B.jsxs)(g.Z,{disableGutters:!0,sx:{mx:4,justifyContent:"space-between",width:"100%"},children:[(0,B.jsxs)(h.Z,{sx:{display:{xs:"flex",md:"none"}},children:[(0,B.jsx)(j.Z,{size:"large","aria-label":"navigation","aria-controls":"menu-appbar","aria-haspopup":"true",onClick:function(e){L(e.currentTarget)},color:"default",children:(0,B.jsx)(S.Z,{})}),(0,B.jsx)(b.Z,{id:"menu-appbar",anchorEl:t,anchorOrigin:{vertical:"bottom",horizontal:"left"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"left"},open:Boolean(t),onClose:fe,sx:{mt:"12px",display:{xs:"block",md:"none"}},children:s.map((function(e){return(0,B.jsx)(o.OL,{to:x.c["".concat(e.slice(0,-2),"th")],children:(0,B.jsx)(v.Z,{onClick:fe,sx:{border:"solid 2px rgba(0, 0, 0, .1)",borderTop:"none",backgroundColor:ue?z:"#ffffff"},children:(0,B.jsx)(Z.Z,{textAlign:"center",children:se(e)})})},e)}))})]}),(0,B.jsx)(h.Z,{sx:{flexGrow:0,display:{xs:"none",md:"flex"},justifyContent:"center"},children:s.map((function(e){return(0,B.jsx)(o.OL,{to:x.c["".concat(e.slice(0,-2),"th")],className:"header__link",onClick:fe,children:se(e)},e)}))}),(0,B.jsxs)(h.Z,{sx:{display:"flex",columnGap:"1.5rem"},children:[(0,B.jsx)(w.Z,{title:se("createNewBoardHelperText"),children:(0,B.jsx)(j.Z,{onClick:function(){return he(f)},size:"large","aria-label":"create new board",children:(0,B.jsx)(m.Z,{})})}),(0,B.jsxs)(k.Z,{id:"language-switcher",children:[(0,B.jsx)("input",{type:"checkbox",className:"language-switcher__checkbox",checked:Y,onChange:function(e){var n=e.currentTarget.checked;V(n)}}),(0,B.jsx)("span",{id:"round-slider"}),(0,B.jsx)("span",{id:"select-ru",children:"RU"}),(0,B.jsx)("span",{id:"select-en",children:"EN"})]}),(0,B.jsx)(j.Z,{onClick:function(e){D(e.currentTarget)},sx:{p:0},children:(0,B.jsx)(C.Z,{src:"/static/images/avatar.jpg",sx:{overflow:"visible","&:before":{content:'"\u276f"',color:"#ffffff",position:"absolute",backgroundColor:"#3026b9",borderRadius:"50%",height:"1em",top:"2.6em",left:"0",mt:"-1em",transform:"rotate(90deg)",width:"1em"}}})}),(0,B.jsx)(b.Z,{sx:{mt:"55px"},id:"menu-appbar",anchorEl:_,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:Boolean(_),onClose:xe,children:c.map((function(e){return(0,B.jsx)(v.Z,{onClick:function(){return he(e)},sx:{border:"solid 2px rgba(0, 0, 0, .1)",borderTop:"none",backgroundColor:ue?z:"#ffffff"},children:(0,B.jsx)(Z.Z,{textAlign:"center",children:se(e)})},e)}))})]})]})})}),ee===f?(0,B.jsx)(I,{isModalActive:re,closeConfirmationDialog:me,confirmAction:pe}):(0,B.jsx)(M.P,{isActive:re,closeWindow:me,confirmAction:pe,children:(0,B.jsx)(R.U,{title:"titleModal",desc:ee})})]})}},819:function(e,n,t){t.d(n,{P:function(){return c}});var r=t(4554),i=t(8446),o=t(3131),a=t(184),s={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,paddingLeft:10,paddingRight:10,paddingTop:4,paddingBottom:4},c=function(e){var n=e.isActive,t=e.closeWindow,c=e.confirmAction,l=e.children;return(0,a.jsx)(i.Z,{open:n,onClose:t,children:(0,a.jsxs)(r.Z,{sx:s,children:[l,(0,a.jsxs)("div",{className:"modal-btn-wrapp",children:[(0,a.jsx)(o.f,{variant:"contained",text:"btnDialogOk",onClick:c}),(0,a.jsx)(o.f,{variant:"contained",text:"btnDialogCancel",onClick:t})]})]})})}},4216:function(e,n,t){t.d(n,{E:function(){return u}});var r=t(2791),i=t(9565),o=t(9911),a=t(6999),s=t(5920),c=t(9112),l=t(2677),d=t(184),u=function(e){var n=e.children,t=(0,i.C)((function(e){return e.usersReducer})).currentUser,u=(0,i.C)((function(e){return e.usersReducer})).users,f=(0,o.T)();return(0,r.useEffect)((function(){var e=u.find((function(e){return e.login===t.login}));e?(localStorage.setItem(l.G,JSON.stringify(e)),f((0,s.lx)(e))):f((0,a.u)())}),[u,t,f]),t.id?n:(0,d.jsx)(c.g,{isLoading:!0})}},8927:function(e,n,t){t.d(n,{Y:function(){return s}});var r=t(6871),i=t(9565),o=t(3686),a=t(184),s=function(e){var n=e.children,t=(0,i.C)((function(e){return e.loginReducer})).token,s=o.c.welcomePath;return t?n:(0,a.jsx)(r.Fg,{to:"/".concat(s),replace:!0})}},867:function(e,n,t){t.d(n,{Et:function(){return i},S6:function(){return a},iZ:function(){return r},pF:function(){return o}});var r="#3026b9",i="#fafcff",o="#f4f5f8",a="17.5rem"},4261:function(e,n,t){t.r(n),t.d(n,{default:function(){return w}});var r=t(1413),i=t(2791),o=t(9565),a=t(9911),s=t(6445),c=t(890),l=t(3613),d=t(6151),u=t(6999),f=t(970),x=t(5920),m=t(5290),p=t(3168),h=t(9112),g=t(4356),j=t(184),b=function(){var e,n,t,b=(0,p.$)().t,v=(0,o.C)((function(e){return e.usersReducer})),Z=v.currentUser,w=v.loading,k=v.errors,C=(0,a.T)(),S=(0,m.cI)({defaultValues:{name:Z.name,login:Z.login}}),T=S.register,y=S.handleSubmit,W=S.formState.errors;return(0,i.useEffect)((function(){return function(){C((0,x.b9)())}}),[C]),w?(0,j.jsx)(h.g,{isLoading:!0}):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(g.h,{}),(0,j.jsx)("div",{className:"main",children:(0,j.jsxs)(s.Z,{children:[(0,j.jsx)(c.Z,{align:"center",sx:{mt:4,mb:2,fontSize:"1.8rem"},variant:"h6",children:b("editProfile")}),(0,j.jsxs)("form",{className:"login-form",onSubmit:y((function(e){var n=e.name,t=e.login,r=e.password;C((0,u.N)({id:Z.id,userData:{name:n,login:t,password:r}}))})),children:[(0,j.jsx)(l.Z,(0,r.Z)((0,r.Z)({label:b("nameFieldLabel"),className:"login-form__field-input",type:"text",sx:{marginTop:"1em"}},T("name",{required:"nameFieldRequiredError"})),{},{error:!!W.name,helperText:W.name?b(String(null===(e=W.name)||void 0===e?void 0:e.message)):b("nameFieldHelpText")})),(0,j.jsx)(l.Z,(0,r.Z)((0,r.Z)({label:b("loginFieldLabel"),className:"login-form__field-input",type:"text",autoComplete:"userlogin",sx:{marginTop:"1em"}},T("login",{required:"loginFieldRequiredError"})),{},{error:!!W.login,helperText:W.login?b(String(null===(n=W.login)||void 0===n?void 0:n.message)):b("loginFieldSignUpHelpText")})),(0,j.jsx)(l.Z,(0,r.Z)((0,r.Z)({label:b("passwordFieldLabel"),className:"login-form__field-input",type:"password",autoComplete:"new-password",sx:{marginTop:"1em"}},T("password",{required:"passwordFieldRequiredError"})),{},{error:!!W.password,helperText:W.password?b(String(null===(t=W.password)||void 0===t?void 0:t.message)):b("passwordFieldSignUpHelpText")})),(0,j.jsx)(d.Z,{type:"submit",sx:{marginTop:"1em"},children:b("update")})]}),(0,j.jsx)(f.Z,{messages:k})]})})]})},v=t(8927),Z=t(4216),w=function(){return(0,j.jsx)(v.Y,{children:(0,j.jsx)(Z.E,{children:(0,j.jsx)(b,{})})})}},6445:function(e,n,t){t.d(n,{Z:function(){return g}});var r=t(4942),i=t(3366),o=t(272),a=t(2791),s=t(8182),c=t(767),l=t(1046),d=t(7630),u=t(5159);function f(e){return(0,u.Z)("MuiContainer",e)}(0,t(208).Z)("MuiContainer",["root","disableGutters","fixed","maxWidthXs","maxWidthSm","maxWidthMd","maxWidthLg","maxWidthXl"]);var x=t(4036),m=t(184),p=["className","component","disableGutters","fixed","maxWidth"],h=(0,d.ZP)("div",{name:"MuiContainer",slot:"Root",overridesResolver:function(e,n){var t=e.ownerState;return[n.root,n["maxWidth".concat((0,x.Z)(String(t.maxWidth)))],t.fixed&&n.fixed,t.disableGutters&&n.disableGutters]}})((function(e){var n=e.theme,t=e.ownerState;return(0,o.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!t.disableGutters&&(0,r.Z)({paddingLeft:n.spacing(2),paddingRight:n.spacing(2)},n.breakpoints.up("sm"),{paddingLeft:n.spacing(3),paddingRight:n.spacing(3)}))}),(function(e){var n=e.theme;return e.ownerState.fixed&&Object.keys(n.breakpoints.values).reduce((function(e,t){var r=n.breakpoints.values[t];return 0!==r&&(e[n.breakpoints.up(t)]={maxWidth:"".concat(r).concat(n.breakpoints.unit)}),e}),{})}),(function(e){var n=e.theme,t=e.ownerState;return(0,o.Z)({},"xs"===t.maxWidth&&(0,r.Z)({},n.breakpoints.up("xs"),{maxWidth:Math.max(n.breakpoints.values.xs,444)}),t.maxWidth&&"xs"!==t.maxWidth&&(0,r.Z)({},n.breakpoints.up(t.maxWidth),{maxWidth:"".concat(n.breakpoints.values[t.maxWidth]).concat(n.breakpoints.unit)}))})),g=a.forwardRef((function(e,n){var t=(0,l.Z)({props:e,name:"MuiContainer"}),r=t.className,a=t.component,d=void 0===a?"div":a,u=t.disableGutters,g=void 0!==u&&u,j=t.fixed,b=void 0!==j&&j,v=t.maxWidth,Z=void 0===v?"lg":v,w=(0,i.Z)(t,p),k=(0,o.Z)({},t,{component:d,disableGutters:g,fixed:b,maxWidth:Z}),C=function(e){var n=e.classes,t=e.fixed,r=e.disableGutters,i=e.maxWidth,o={root:["root",i&&"maxWidth".concat((0,x.Z)(String(i))),t&&"fixed",r&&"disableGutters"]};return(0,c.Z)(o,f,n)}(k);return(0,m.jsx)(h,(0,o.Z)({as:d,ownerState:k,className:(0,s.Z)(C.root,r),ref:n},w))}))}}]);
//# sourceMappingURL=261.c70a7453.chunk.js.map