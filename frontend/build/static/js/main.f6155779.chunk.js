(this["webpackJsonpmedo-dodo"]=this["webpackJsonpmedo-dodo"]||[]).push([[0],{26:function(e,t,s){},27:function(e,t,s){},28:function(e,t,s){},29:function(e,t,s){},48:function(e,t,s){},49:function(e,t,s){},50:function(e,t,s){},51:function(e,t,s){},52:function(e,t,s){},53:function(e,t,s){},54:function(e,t,s){},55:function(e,t,s){"use strict";s.r(t);var n=s(0),a=s(1),i=s.n(a),c=s(19),r=s.n(c),o=(s(26),s(2)),l=s(3),u=s(5),h=s(4),d=(s(27),s(28),s(29),function(e){Object(u.a)(s,e);var t=Object(h.a)(s);function s(e){var n;return Object(o.a)(this,s),(n=t.call(this,e)).state={showArrowButtons:!1,headerMessages:["Week "+n.props.showingWeek,"Categories","Add new task","Modify task"],headerMessage:"Header message"},console.log(n.props.page),n}return Object(l.a)(s,[{key:"defineHeaderMessage",value:function(){"weekly"===this.props.page?this.setState({showArrowButtons:!0,headerMessage:"Week "+this.props.showingWeek}):"categories"===this.props.page?this.setState({showArrowButtons:!1,headerMessage:this.state.headerMessages[1]}):"addTask"===this.props.page?this.setState({showArrowButtons:!1,headerMessage:this.state.headerMessages[2]}):this.setState({showArrowButtons:!1,headerMessage:"Custom header message"})}},{key:"componentDidMount",value:function(){this.defineHeaderMessage()}},{key:"componentDidUpdate",value:function(e,t){e.showingWeek!==this.props.showingWeek&&(console.log("something happened"+JSON.stringify(e)),this.defineHeaderMessage(),console.log("header changed to "+this.state.headerMessage))}},{key:"render",value:function(){return Object(n.jsxs)("div",{className:"box",children:[this.showButtonsAndMessage(),Object(n.jsxs)("p",{children:["Showing buttons: ",this.state.showArrowButtons.toString()]}),Object(n.jsxs)("p",{children:["Current week number is: ",this.props.weekNumber]})]})}},{key:"getFormattedDate",value:function(e){return this.getDayOfTheWeek(e.getDay())+" "+e.getDate()+" / "+(e.getMonth()+1)+" / "+e.getFullYear()}},{key:"getDayOfTheWeek",value:function(e){switch(e){case 0:return"Sunday";case 1:return"Monday";case 2:return"Tuesday";case 3:return"Wednesday";case 4:return"Thursday";case 5:return"Friday";case 6:return"Saturday";default:return"Current day"}}},{key:"showButtonsAndMessage",value:function(){return this.state.showArrowButtons?Object(n.jsxs)("div",{className:"container",children:[Object(n.jsx)("div",{className:"leftButton",children:Object(n.jsxs)("button",{onClick:this.props.onClickLast,children:["Last",Object(n.jsx)("br",{}),"Week"]})}),Object(n.jsxs)("div",{className:"headerMessage",children:[Object(n.jsxs)("h1",{children:["Week ",this.props.showingWeek]}),Object(n.jsx)("br",{}),"Today is: ",this.getFormattedDate(this.props.date)]}),Object(n.jsx)("div",{className:"rightButton",children:Object(n.jsxs)("button",{onClick:this.props.onClickNext,children:["Next",Object(n.jsx)("br",{}),"Week"]})})]}):this.getHeader()}},{key:"getHeader",value:function(){return Object(n.jsxs)("div",{className:"headerMessage",children:[Object(n.jsx)("h1",{children:this.state.headerMessage}),Object(n.jsx)("br",{}),"Today is: ",this.getFormattedDate(this.props.date)]})}}]),s}(i.a.Component)),j=s(7),b=s.n(j),p=s(10),g=s.n(p),O=s(20),m=s(8),v=function(e){Object(u.a)(s,e);var t=Object(h.a)(s);function s(){var e;Object(o.a)(this,s);for(var n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).state={tagColor:"",title:""},e}return Object(l.a)(s,[{key:"componentDidMount",value:function(){this.setState({tagColor:this.props.level,title:this.props.title})}},{key:"render",value:function(){return Object(n.jsx)("div",{className:"priority-tag",children:Object(n.jsx)("div",{className:this.state.title,children:Object(n.jsx)("div",{className:this.state.tagColor,children:this.state.title})})},this.state.title)}}]),s}(i.a.Component),k=function(e){var t=e.split(/[^0-9]/);return"".concat(t[2],".").concat(t[1],".").concat(t[0]," at ").concat(t[3],".").concat(t[4])},f=function(e){var t=e.id,s=e.levelTitle,i=Object(a.useState)(""),c=Object(m.a)(i,2),r=c[0],o=c[1],l=Object(a.useState)(""),u=Object(m.a)(l,2),h=u[0],d=u[1],j=Object(a.useState)(0),p=Object(m.a)(j,2),f=(p[0],p[1]);Object(a.useEffect)((function(){(function(){var e=Object(O.a)(g.a.mark((function e(){var s,n,a;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.get("https://dodo-fly-or-fly-not.herokuapp.com/tasks/".concat(t));case 2:s=e.sent,n=s.data,a=k(n[0].due_date),o(n[0].title),d(a);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[t,s]);return Object(n.jsx)("div",{className:"task-card",children:Object(n.jsxs)("div",{className:"ui segment",children:[Object(n.jsxs)("div",{className:"ui checkbox",children:[Object(n.jsx)("input",{className:"box",type:"checkbox",onClick:function(){f(1),console.log("Task ".concat(r," is done!"))}}),Object(n.jsx)("label",{children:r})]}),Object(n.jsx)("div",{className:"date",children:h}),Object(n.jsx)("div",{className:"priority",children:Object(n.jsx)(v,{level:"ui yellow button",title:s})})]})})},x=(s(48),function(e){Object(u.a)(s,e);var t=Object(h.a)(s);function s(e){var a;return Object(o.a)(this,s),(a=t.call(this,e)).readTasks=function(){b.a.get(a.state.backendAddress).then((function(e){a.setState({tasks:e.data}),a.createCards()}),(function(e){alert("Problem with getting data! "+e)}))},a.createCards=function(){var e=a.state.tasks.map((function(e){return Object(n.jsx)(f,{id:e.id,levelTitle:"medium"},e.id)}));a.setState({taskCards:e})},a.state={backendAddress:"https://dodo-fly-or-fly-not.herokuapp.com/tasks/",tasks:[],taskCards:[]},a}return Object(l.a)(s,[{key:"componentDidMount",value:function(){this.readTasks()}},{key:"componentDidUpdate",value:function(e,t){e.showingWeek!==this.props.showingWeek&&(console.log("showing different week now"),this.readTasks(),this.createCards())}},{key:"render",value:function(){this.state.tasks.map((function(e){return Object(n.jsxs)("li",{children:[e.id," ",e.title," ",e.due_date]},e.id)}));return Object(n.jsxs)("div",{className:"tasklist",children:[Object(n.jsx)("h1",{children:"Here we have tasks dued:"}),Object(n.jsx)("ul",{children:this.state.taskCards})]})}}]),s}(i.a.Component)),w=(s(49),function(e){Object(u.a)(s,e);var t=Object(h.a)(s);function s(e){var n;return Object(o.a)(this,s),(n=t.call(this,e)).state={},n}return Object(l.a)(s,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(e,t){}},{key:"render",value:function(){return Object(n.jsx)("div",{className:"box",children:Object(n.jsxs)("div",{className:"footerCenter",children:[Object(n.jsxs)("button",{className:"footerbutton",onClick:this.props.onClickLast,children:["GO TO",Object(n.jsx)("br",{}),"CATEGORIES"]}),Object(n.jsxs)("button",{className:"footerbutton",onClick:this.props.onClickAdd,children:["ADD NEW",Object(n.jsx)("br",{}),"TASK"]})]})})}}]),s}(i.a.Component)),y=function(e){Object(u.a)(s,e);var t=Object(h.a)(s);function s(e){var n;return Object(o.a)(this,s),(n=t.call(this,e)).state={},n}return Object(l.a)(s,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(e,t){e.showingWeek!==this.props.showingWeek&&console.log("showing different week now")}},{key:"render",value:function(){return Object(n.jsxs)("div",{children:[Object(n.jsx)(d,{weekNumber:this.props.currentWeek,page:this.props.page,showingWeek:this.props.showingWeek,date:this.props.currentDate,onClickNext:this.props.onClickNext,onClickLast:this.props.onClickLast},1),Object(n.jsx)(x,{showingWeek:this.props.showingWeek}),Object(n.jsx)(w,{onClickAdd:this.props.onClickAdd},2)]})}}]),s}(i.a.Component),N=(s(50),s(51),function(e){Object(u.a)(s,e);var t=Object(h.a)(s);function s(){var e;Object(o.a)(this,s);for(var n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).state={name:"",textcolor:"black",align:"left"},e}return Object(l.a)(s,[{key:"componentDidMount",value:function(){this.setState({name:this.props.labelName,textcolor:this.props.textcolor,align:this.props.labelAlign})}},{key:"render",value:function(){return Object(n.jsx)("div",{className:"label",children:Object(n.jsx)("div",{className:this.state.align,children:Object(n.jsx)("div",{className:this.state.textcolor,children:this.state.name})})})}}]),s}(i.a.Component)),C=function(e){Object(u.a)(s,e);var t=Object(h.a)(s);function s(){var e;Object(o.a)(this,s);for(var n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).state={term:"",placeholder:e.props.placeholder},e.onInputChange=function(t){e.setState({term:t.target.value})},e.onFormSubmit=function(t){t.preventDefault(),e.props.onSubmit(e.state.term)},e}return Object(l.a)(s,[{key:"render",value:function(){var e=this;return Object(n.jsx)("div",{className:"ui segment",children:Object(n.jsx)("form",{className:"ui form",onSubmit:this.onFormSubmit,children:Object(n.jsxs)("div",{className:"field",children:[Object(n.jsx)(N,{labelName:this.props.labelName,textcolor:this.props.labelTextColor,labelAlign:this.props.labelAlign}),Object(n.jsx)("div",{className:this.props.inputType,children:Object(n.jsx)("input",{type:this.props.type,className:"text-input",placeholder:this.state.placeholder,onChange:this.onInputChange,onClick:function(t){return e.setState({term:"",placeholder:""})},value:this.state.term})})]})})})}}]),s}(i.a.Component),S=function(e){Object(u.a)(s,e);var t=Object(h.a)(s);function s(){return Object(o.a)(this,s),t.apply(this,arguments)}return Object(l.a)(s,[{key:"render",value:function(){return Object(n.jsx)("div",{className:"ui segment",children:Object(n.jsxs)("div",{className:"ui grid",children:[Object(n.jsx)("div",{className:"sixteen wide column",children:Object(n.jsx)(N,{labelName:this.props.labelName,textcolor:this.props.labelTextColor,labelAlign:this.props.labelAlign})}),Object(n.jsx)("div",{className:"ui row",children:Object(n.jsx)("form",{className:"ui form",children:Object(n.jsxs)("div",{className:"fields",children:[Object(n.jsx)("div",{className:"field",children:Object(n.jsx)("input",{type:"date"})}),Object(n.jsx)("div",{className:"field",children:Object(n.jsx)("input",{type:"time"})})]})})})]})})}}]),s}(i.a.Component),W=(s(52),function(e){Object(u.a)(s,e);var t=Object(h.a)(s);function s(e){var n;return Object(o.a)(this,s),(n=t.call(this,e)).setTitle=function(e){return"high"===e?"ui red button":"medium"===e?"ui yellow button":"ui green button"},n.state={values:[]},n}return Object(l.a)(s,[{key:"componentDidMount",value:function(){var e=this,t="",s=this.props.tags.map((function(s){return t=e.setTitle(s),Object(n.jsx)(v,{level:t,title:s})}));this.setState({values:s})}},{key:"render",value:function(){return Object(n.jsx)("div",{className:"priority-tag-list",children:Object(n.jsx)("div",{className:"ui segment",children:Object(n.jsxs)("div",{className:"ui grid",children:[Object(n.jsx)("div",{className:"sixteen wide column",children:Object(n.jsx)(N,{labelName:"Priority",labelAlign:this.props.labelAlign})}),Object(n.jsx)("div",{className:"ui row",children:Object(n.jsx)("form",{className:"ui form",children:Object(n.jsx)("div",{className:"fields",children:Object(n.jsx)("div",{className:"field",children:Object(n.jsx)("div",{className:"ui row flex container",children:this.state.values})})})})})]})})})}}]),s}(i.a.Component)),A=function(e){Object(u.a)(s,e);var t=Object(h.a)(s);function s(){return Object(o.a)(this,s),t.apply(this,arguments)}return Object(l.a)(s,[{key:"render",value:function(){return Object(n.jsx)("div",{className:"drop-down",children:Object(n.jsx)("div",{className:"ui segment",children:Object(n.jsxs)("div",{className:"ui grid",children:[Object(n.jsx)("div",{className:"sixteen wide column",children:Object(n.jsx)(N,{labelName:this.props.labelName,textcolor:this.props.labelTextColor,labelAlign:this.props.labelAlign})}),Object(n.jsx)("div",{className:"ui row",children:Object(n.jsx)("form",{className:"ui form",children:Object(n.jsx)("div",{className:"fields",children:Object(n.jsx)("div",{className:"field",children:Object(n.jsxs)("select",{className:"ui search dropdown",children:[Object(n.jsx)("option",{value:"",children:"Choose category"}),Object(n.jsx)("option",{value:"0",children:"My Tasks"}),Object(n.jsx)("option",{value:"1",children:"School Stuff"}),Object(n.jsx)("option",{value:"",children:"Add new category"})]})})})})})]})})})}}]),s}(i.a.Component),T=(s(53),function(e){Object(u.a)(s,e);var t=Object(h.a)(s);function s(){var e;Object(o.a)(this,s);for(var n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).changePage=function(){"addTask"===e.props.page?e.props.onSave():console.log("where are we? ".concat(e.props.page))},e}return Object(l.a)(s,[{key:"render",value:function(){return Object(n.jsx)("button",{className:"save-button",onClick:this.changePage,children:"Save"})}}]),s}(i.a.Component)),D=function(e){Object(u.a)(s,e);var t=Object(h.a)(s);function s(){return Object(o.a)(this,s),t.apply(this,arguments)}return Object(l.a)(s,[{key:"render",value:function(){return Object(n.jsx)("div",{className:"head",children:Object(n.jsx)("div",{className:"ui inverted segment",children:Object(n.jsx)("h2",{className:"ui  top attached green inverted header",children:this.props.pagetitle})})})}}]),s}(i.a.Component),M=(s(54),function(e){Object(u.a)(s,e);var t=Object(h.a)(s);function s(){var e;Object(o.a)(this,s);for(var n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).state={priorities:["high","medium","low"],pages:[]},e}return Object(l.a)(s,[{key:"onTextFieldSubmit",value:function(e){console.log(e)}},{key:"componentDidMount",value:function(){this.setState({pages:this.props.pages})}},{key:"render",value:function(){return Object(n.jsxs)("div",{className:"add-new-task-view",children:[Object(n.jsx)(D,{pagetitle:"Add new task",page:this.props.page,onSave:this.props.onSave}),Object(n.jsx)(C,{onSubmit:this.onTextFieldSubmit,type:"text",placeholder:"What to do, Dodo?",labelName:"Task"}),Object(n.jsx)(C,{onSubmit:this.onTextFieldSubmit,type:"text",placeholder:"Elaborate...",labelName:"Description: "}),Object(n.jsx)(W,{tags:this.state.priorities,labelAlign:"center"}),Object(n.jsx)(S,{labelName:"Due date and time:",labelAlign:"center"}),Object(n.jsx)(A,{labelName:"Category",labelAlign:"center"}),Object(n.jsx)("div",{className:"ui segment",children:Object(n.jsx)(T,{page:this.props.page,onSave:this.props.onSave})})]})}}]),s}(i.a.Component)),P=function(e){Object(u.a)(s,e);var t=Object(h.a)(s);function s(e){var n;return Object(o.a)(this,s),(n=t.call(this,e)).changeViewToAdd=function(){n.setState({currentPage:n.state.pages[2]}),console.log("Currently we are on page "+n.state.currentPage)},n.changeViewToWeekly=function(){n.setState({currentPage:n.state.pages[0]}),console.log("Currently we are on page "+n.state.currentPage)},n.handleNextWeek=function(){53===n.state.showingWeek?(n.setState({showingWeek:1}),console.log(n.state.showingWeek)):(n.setState({showingWeek:n.state.showingWeek+1}),console.log(n.state.showingWeek))},n.handleLastWeek=function(){1===n.state.showingWeek?(n.setState({showingWeek:53}),console.log(n.state.showingWeek)):(n.setState({showingWeek:n.state.showingWeek-1}),console.log(n.state.showingWeek))},n.state={currentDate:new Date,currentWeek:49,showingWeek:49,pages:["weekly","categories","addTask","modifyTask"],currentPage:"weekly"},n}return Object(l.a)(s,[{key:"componentDidMount",value:function(){console.log(this.state.currentDate)}},{key:"checkView",value:function(){return"weekly"===this.state.currentPage?Object(n.jsx)(y,{currentWeek:this.state.currentWeek,page:this.state.pages[0],showingWeek:this.state.showingWeek,currentDate:this.state.currentDate,onClickNext:this.handleNextWeek,onClickLast:this.handleLastWeek,onClickAdd:this.changeViewToAdd}):"addTask"===this.state.currentPage?Object(n.jsx)(M,{pages:this.state.pages,page:this.state.currentPage,onSave:this.changeViewToWeekly}):Object(n.jsxs)("div",{children:[Object(n.jsx)("h1",{children:"Something went terribly wrong xD"}),Object(n.jsx)("button",{onClick:this.changeViewToWeekly,children:"Go back to weekly"})]})}},{key:"componentDidUpdate",value:function(e,t){t.currentPage!==this.state.currentPage&&(console.log("need to change view now"),this.checkView())}},{key:"render",value:function(){var e=this.checkView();return Object(n.jsx)("div",{className:"App ui container",children:e})}}]),s}(i.a.Component),F=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,56)).then((function(t){var s=t.getCLS,n=t.getFID,a=t.getFCP,i=t.getLCP,c=t.getTTFB;s(e),n(e),a(e),i(e),c(e)}))};r.a.render(Object(n.jsx)(i.a.StrictMode,{children:Object(n.jsx)(P,{})}),document.getElementById("root")),F()}},[[55,1,2]]]);
//# sourceMappingURL=main.f6155779.chunk.js.map