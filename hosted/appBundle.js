(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage").textContent=e,document.getElementById("errorBox").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,a,r)=>{const n=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),c=await n.json();c.error&&t(c.error),c.redirect&&(window.location=c.redirect),r&&r(c)},hideError:()=>{document.getElementById("errorBox").classList.add("hidden")}}}},t={};function a(r){var n=t[r];if(void 0!==n)return n.exports;var c=t[r]={exports:{}};return e[r](c,c.exports,a),c.exports}(()=>{const e=a(603),t=async t=>{t.preventDefault(),e.hideError();const a=await fetch("/getUsername"),r=await a.json(),n=t.target.querySelector("#tweet").value,c=t.target.querySelector("#private").checked,s=t.target.querySelector("#_csrf").value;if(!n)return e.handleError("You must write something"),!1;const l=r.username.username;return e.sendPost(t.target.action,{tweet:n,privacy:c,username:l,_csrf:s},o),!1},r=e=>React.createElement("form",{id:"tweetForm",onSubmit:t,name:"tweetForm",action:"/app",method:"POST",className:"tweetForm"},React.createElement("label",{htmlFor:"tweet"},"Tweet: "),React.createElement("input",{type:"text",id:"tweet",name:"tweet",placeholder:"Write Your Tweet Here",maxLength:"280"}),React.createElement("label",{htmlFor:"private"},"Private? "),React.createElement("input",{type:"checkbox",id:"private",name:"private"}),React.createElement("input",{type:"hidden",id:"_csrf",name:"_csrf",value:e.csrf}),React.createElement("input",{type:"submit",className:"makeTweetSubmit",value:"Make Tweet"})),n=e=>{if(0===e.tweets.length)return React.createElement("div",null,React.createElement("h3",{id:"noTweet"},"No Tweets Yet!"));const t=e.tweets.map((e=>React.createElement("div",{key:e._id,id:"tweetBox"},React.createElement("h3",{id:"tweetUsername"},e.username),React.createElement("h3",{id:"date"},e.createdDate),React.createElement("h3",{id:"actualTweet"},e.tweet))));return React.createElement("div",null,t)},c=t=>{t.preventDefault(),e.hideError();const a=t.target.querySelector("#pass").value,r=t.target.querySelector("#pass2").value,n=t.target.querySelector("#_csrf").value;return a&&r?(e.sendPost(t.target.action,{newPass:a,newPass2:r,_csrf:n}),!1):(e.handleError("All fields are required"),!1)},s=e=>React.createElement("form",{id:"changePasswordForm",name:"changePasswordForm",onSubmit:c,action:"/changePassword",method:"POST"},React.createElement("label",{htmlFor:"pass"},"New Password: "),React.createElement("input",{type:"password",id:"pass",name:"pass",placeholder:"new password"}),React.createElement("label",{htmlFor:"pass2"},"Confirm New Password: "),React.createElement("input",{type:"password",id:"pass2",name:"pass2",placeholder:"retype new password"}),React.createElement("input",{type:"hidden",id:"_csrf",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"formSubmit",type:"submit",value:"Change Password"})),o=async()=>{const e=await fetch("/getLogInTweets"),t=await e.json();ReactDOM.render(React.createElement(n,{tweets:t.tweets}),document.getElementById("tweets"))};window.onload=async()=>{const e=await fetch("/getToken"),t=await e.json();ReactDOM.render(React.createElement(r,{csrf:t.csrfToken}),document.getElementById("makeTweet")),document.getElementById("changePassword").addEventListener("click",(e=>{e.preventDefault(),ReactDOM.render(React.createElement(s,{csrf:t.csrfToken}),document.getElementById("changePasswordSection"))})),o()}})()})();