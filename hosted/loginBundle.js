(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage").textContent=e,document.getElementById("errorBox").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,r,a)=>{const n=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),s=await n.json();s.error&&t(s.error),s.redirect&&(window.location=s.redirect),a&&a(s)},hideError:()=>{document.getElementById("errorBox").classList.add("hidden")}}}},t={};function r(a){var n=t[a];if(void 0!==n)return n.exports;var s=t[a]={exports:{}};return e[a](s,s.exports,r),s.exports}(()=>{const e=r(603),t=e=>React.createElement("div",null,React.createElement("h3",null,"IT'S WORKING"),React.createElement("h3",null,"WOAH")),a=t=>{t.preventDefault(),e.hideError();const r=t.target.querySelector("#user").value,a=t.target.querySelector("#pass").value,n=t.target.querySelector("#pass2").value;return r&&a&&n?a!==n?(e.handleError("Passwords do not match!"),!1):(e.sendPost(t.target.action,{username:r,pass:a,pass2:n}),!1):(e.handleError("All fields are required!"),!1)},n=e=>React.createElement("form",{id:"signupForm",name:"signupForm",onSubmit:a,action:"/signup",method:"POST"},React.createElement("label",{htmlFor:"username"},"Username: "),React.createElement("input",{type:"text",id:"user",name:"username",placeholder:"username"}),React.createElement("label",{htmlFor:"pass"},"Password: "),React.createElement("input",{type:"password",id:"pass",name:"pass",placeholder:"password"}),React.createElement("label",{htmlFor:"pass2"},"Password: "),React.createElement("input",{type:"password",id:"pass2",name:"pass2",placeholder:"retype password"}),React.createElement("input",{className:"formSubmit",type:"submit",value:"Sign In"})),s=t=>{t.preventDefault(),e.hideError();const r=t.target.querySelector("#user").value,a=t.target.querySelector("#pass").value;return r&&a?(e.sendPost(t.target.action,{username:r,pass:a}),!1):(e.handleError("Username or password is empty!"),!1)},l=e=>React.createElement("form",{id:"loginForm",name:"loginForm",onSubmit:s,action:"/login",method:"POST",className:"mainForm"},React.createElement("label",{htmlFor:"username"},"Username: "),React.createElement("input",{type:"text",id:"user",name:"username",placeholder:"username"}),React.createElement("label",{htmlFor:"pass"},"Password: "),React.createElement("input",{type:"password",id:"pass",name:"pass",placeholder:"password"}),React.createElement("input",{type:"hidden",id:"_csrf",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"formSubmit",type:"submit",value:"Sign In"}));window.onload=()=>{ReactDOM.render(React.createElement(t,null),document.getElementById("publicTweets"));const e=document.getElementById("signupButton"),r=document.getElementById("loginButton");e.addEventListener("click",(e=>(e.preventDefault(),ReactDOM.render(React.createElement(n,null),document.getElementById("loginSignup")),!1))),r.addEventListener("click",(e=>(e.preventDefault(),ReactDOM.render(React.createElement(l,null),document.getElementById("loginSignup")),!1)))}})()})();