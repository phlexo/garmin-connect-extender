function consoleInfo(a){if(typeof console==="object"&&typeof console.info==="function"){console.info(a)
}}function consoleError(a){if(typeof console==="object"&&typeof console.error==="function"){console.error(a)
}}var GAUTH=function(){var j,t,p,z,g,r,A,v,s,b,c,h;
var q=10,m;
var d;
function f(B,C){z=document.createElement("IFRAME");
z.setAttribute("src",C);
z.setAttribute("id",d);
z.setAttribute("title","");
z.setAttribute("scrolling","no");
z.setAttribute("marginheight","0");
z.setAttribute("marginwidth","0");
z.setAttribute("class","gauth-iframe");
z.style.width="100%";
z.style.height="0px";
z.style.border="none";
z.frameBorder="0";
B.appendChild(z);
parent.document.getElementById(d).src=C
}function k(){if(t.indexOf("/login")!=-1){t=t.substring(0,t.indexOf("/login"))
}return t
}function u(){var B=t.substring(0,t.indexOf("://"));
var C=t.substring(B.length+3,t.length);
if(C.indexOf("/")!=-1){C=C.substring(0,C.indexOf("/"))
}return B+"://"+C
}function a(){return"/login"
}function y(){return"/createNewAccount"
}function x(B){g=document.createElement("DIV");
g.setAttribute("class","gauth-loading");
g.innerHTML=(v?'<link href="'+v+'" rel="stylesheet" type="text/css" media="all" />':"")+"<img src='"+u()+"/sso/images/ajax-loader.gif'/>";
B.appendChild(g)
}function n(B){if(B==undefined||(B!=false&&B!=true)){return true
}else{return false
}}function o(B){if(B){var C=[];
if(!B.gauthHost){C.push("gauthHost")
}if(!B.locale){C.push("locale")
}B.locale=B.locale.replace(/^([a-z]{2})\-([a-z]{2})$/i,"$1_$2");
if(!B.clientId){C.push("clientId")
}if(n(B.rememberMeShown)){B.rememberMeShown="true"
}if(n(B.createAccountShown)){B.createAccountShown="true"
}if(n(B.openCreateAccount)){B.openCreateAccount=false
}if(n(B.displayNameShown)){B.displayNameShown="false"
}if(n(B.consumeServiceTicket)){B.consumeServiceTicket="true"
}if(n(B.initialFocus)){B.initialFocus="true"
}if(n(B.embedWidget)){B.embedWidget=false
}if(n(B.socialEnabled)){B.socialEnabled="true"
}if(n(B.generateExtraServiceTicket)){B.generateExtraServiceTicket=false
}if(n(B.generateNoServiceTicket)){B.generateNoServiceTicket=false
}if(n(B.globalOptInShown)){B.globalOptInShown="false"
}if(n(B.globalOptInChecked)){B.globalOptInChecked="false"
}if(n(B.mobile)){B.mobile=false
}if(n(B.connectLegalTerms)){B.connectLegalTerms="false"
}if(C.length===0){j=B;
if(j.target){A=j.target
}t=j.gauthHost;
if(j.cssUrl){v=j.cssUrl
}return
}if(C.length>1){throw"The following are required configuration parameters!: "+C
}else{throw C+" is a required configuration parameter!"
}}else{throw"Configuration is required!"
}}function i(E,B){if(document.getElementById("gauth-light-box")==null){consoleInfo("gauth-widget.js LoadPopupInDialogBox(): calling loadLightBoxes() because gauth-light-box is null");
loadLightBoxes()
}b=document.getElementById("gauth-light-box");
b.innerHTML="<a class='button' id='liteBoxClose' href='#' onclick='hideLightBox();return false;'><span>X</span></a>";
var D;
var C=k();
D=C+E+"&lightBox=true";
consoleInfo("gauth-widget.js LoadPopupInDialogBox(): popup_source: "+D);
if(document.getElementById("popup-iframe-id")){purge(document.getElementById("popup-iframe-id"));
b.removeChild(document.getElementById("popup-iframe-id"))
}e(b,D,B)
}function e(B,D,C){h=document.createElement("IFRAME");
h.setAttribute("src",D);
h.setAttribute("title",C);
h.setAttribute("id","popup-iframe-id");
h.setAttribute("scrolling","no");
h.setAttribute("marginheight","0");
h.setAttribute("marginwidth","0");
h.setAttribute("class","popup-iframe-class");
h.style.width="100%";
h.style.height="100%";
h.style.border="none";
h.frameBorder="0";
B.appendChild(h)
}function l(B){if(w(B)){return
}var C=document.createElement("link");
C.setAttribute("rel","stylesheet");
C.setAttribute("type","text/css");
C.setAttribute("href",B);
document.getElementsByTagName("head")[0].appendChild(C)
}function w(B){var E="href";
var D=document.getElementsByTagName("link");
for(var C=D.length;
C>=0;
C--){if(D[C]&&D[C].getAttribute(E)!=null&&D[C].getAttribute(E).indexOf(B)!=-1){return true
}}return false
}return{loadGAuth:function(){p=document.getElementById(j.id?j.id:"gauth-widget");
d=j.id?"gauth-widget-frame-"+j.id:"gauth-widget-frame";
x(p);
var C=k();
var B;
if(!j.redirectAfterAccountLoginUrl){B="service="+encodeURIComponent(jQuery.removeRequestParameters(document.location.href))
}else{if(j.redirectAfterAccountLoginUrl.indexOf("http")==0){B="service="+encodeURIComponent(j.redirectAfterAccountLoginUrl)
}else{B="service="+encodeURIComponent(jQuery.getHost()+j.redirectAfterAccountLoginUrl)
}}if(j.callBackWebHostUrl){B+="&webhost="+encodeURIComponent(j.callBackWebHostUrl)
}B+="&source="+encodeURIComponent(jQuery.removeRequestParameters(document.location.href));
if(j.redirectAfterAccountLoginUrl){if(j.redirectAfterAccountLoginUrl.indexOf("http")==0){B+="&redirectAfterAccountLoginUrl="+encodeURIComponent(j.redirectAfterAccountLoginUrl)
}else{B+="&redirectAfterAccountLoginUrl="+encodeURIComponent(jQuery.getHost()+j.redirectAfterAccountLoginUrl)
}}if(j.redirectAfterAccountCreationUrl){if(j.redirectAfterAccountCreationUrl.indexOf("http")==0){B+="&redirectAfterAccountCreationUrl="+encodeURIComponent(j.redirectAfterAccountCreationUrl)
}else{B+="&redirectAfterAccountCreationUrl="+encodeURIComponent(jQuery.getHost()+j.redirectAfterAccountCreationUrl)
}}else{if(j.redirectAfterAccountLoginUrl){if(j.redirectAfterAccountLoginUrl.indexOf("http")==0){B+="&redirectAfterAccountCreationUrl="+encodeURIComponent(j.redirectAfterAccountLoginUrl)
}else{B+="&redirectAfterAccountCreationUrl="+encodeURIComponent(jQuery.getHost()+j.redirectAfterAccountLoginUrl)
}}}B+="&gauthHost="+encodeURIComponent(j.gauthHost);
B+="&locale="+j.locale;
B+="&id="+j.id;
if(j.cssUrl){B+="&cssUrl="+encodeURIComponent(j.cssUrl)
}if(j.productSupportUrl){B+="&productSupportUrl="+encodeURIComponent(j.productSupportUrl)
}if(j.termsOfUseUrl){B+="&termsOfUseUrl="+encodeURIComponent(j.termsOfUseUrl)
}if(j.privacyStatementUrl){B+="&privacyStatementUrl="+encodeURIComponent(j.privacyStatementUrl)
}if(j.customerId){B+="&customerId="+j.customerId
}B+="&clientId="+j.clientId;
B+="&rememberMeShown="+j.rememberMeShown;
B+="&rememberMeChecked="+j.rememberMeChecked;
B+="&createAccountShown="+j.createAccountShown;
B+="&openCreateAccount="+j.openCreateAccount;
B+="&displayNameShown="+j.displayNameShown;
B+="&consumeServiceTicket="+j.consumeServiceTicket;
B+="&initialFocus="+j.initialFocus;
B+="&embedWidget="+j.embedWidget;
if(!j.socialEnabled){B+="&socialEnabled="+j.socialEnabled
}B+="&generateExtraServiceTicket="+j.generateExtraServiceTicket;
B+="&generateNoServiceTicket="+j.generateNoServiceTicket;
B+="&globalOptInShown="+j.globalOptInShown;
B+="&globalOptInChecked="+j.globalOptInChecked;
B+="&mobile="+j.mobile;
B+="&connectLegalTerms="+j.connectLegalTerms;
if(j.lockToEmailAddress){B+="&lockToEmailAddress="+encodeURIComponent(j.lockToEmailAddress)
}r=C+a()+"?"+B;
s=y()+"?"+B;
consoleInfo("gauth-widget.js loadGAuth(): source: "+r);
consoleInfo("gauth-widget.js loadGAuth(): createAccountUrl: "+s);
if(j.openCreateAccount){r=C+s
}consoleInfo("gauth-widget.js loadGAuth(): source after check: "+r);
if(j.embedWidget){consoleInfo("gauth-widget.js loadGAuth(): Setting document.location.href to '"+r+"'");
document.location.href=r
}else{consoleInfo("gauth-widget.js loadGAuth(): Calling appendIFrame('"+r+"'");
f(p,r);
m=setTimeout(function(){GAUTH_Events.error({status:"error",errorDetails:"No response from the server in "+q+" seconds."})
},q*1000)
}},init:function(B){try{o(B);
l(t+"/css/gauth-widget.css?20120530");
XD.receiveMessage(function(D){if(D&&D.data){var I=D.data;
if(typeof(I)==="string"){I=JSON.parse(D.data)
}GAUTH_Events.messagePosted(I);
if(I.gauthInitHeight){if(g&&p){p.removeChild(g);
g=undefined
}clearTimeout(m);
consoleInfo("gauth-widget.js: Initializing gauth height to: "+I.gauthInitHeight);
z.style.height=I.gauthInitHeight+20+"px"
}else{if(I.openLiteBox){consoleInfo("gauth-widget.js: Opening lite box, ID: ["+I.openLiteBox+"], URL: ["+I.popupUrl+"], TITLE: ["+I.popupTitle+"], LOGINPROVIDER: ["+I.loginProviderName+"], CLIENTID: ["+I.clientId+"]");
i(I.popupUrl,I.popupTitle);
var H=I.loginProviderName=="qq";
var G=I.clientId=="GarminConnect"||I.clientId=="GarminExpressConnect"||I.clientId=="GarminConnectMobileAndroid"||I.clientId=="GarminConnectMobileiOS"||I.clientId=="VIRBDesktopWin"||I.clientId=="VIRBDesktopMac"||I.clientId=="VIRBMobileAndroid"||I.clientId=="VIRBMobileiOS";
if(I.openLiteBox=="createAccountLink"){showLightBox(600+(G?180:0),850);
return false
}else{if(I.openLiteBox=="createAccountOrlinkSocialAccount"){showLightBox(300+(H?100:0),850);
return false
}else{if(I.openLiteBox=="createSocialAccount"){showLightBox(500+(G?100:0)+(H?100:0),850);
return false
}else{if(I.openLiteBox=="linkSocialAccount"){showLightBox(450,850);
return false
}}}}}else{if(I.closeLiteBox){consoleInfo("gauth-widget.js: Closing lite box...");
hideLightBox();
if(I.username){GAUTH.send({setUsername:"1",username:I.username})
}}else{if(I.gauthHeight){consoleInfo("gauth-widget.js: Resizing gauth to md.gauthHeight: "+I.gauthHeight);
z.style.height=I.gauthHeight+20+"px"
}else{if(I.fullPageSocialAuth){consoleInfo("gauth-widget.js: Redirecting to full page social auth for provider ["+I.provider+"], redirectURL ["+I.redirectURL+"]...");
var F=k()+"/socialAuth?provider="+I.provider+"&redirectURL="+I.redirectURL;
consoleInfo("gauth-widget.js: Setting document.location.href to '"+F+"'");
document.location.href=F
}else{if(I.status){var E=I.status;
switch(E){case"SUCCESS":if(A){window.location.href=A+"?serviceTicket="+I.serviceTicket
}else{GAUTH_Events.success(I)
}break;
case"FAIL":GAUTH_Events.fail(I);
break;
case"ACCOUNT_LOCKED":GAUTH_Events.locked(I);
break;
case"ACCOUNT_DISABLED":GAUTH_Events.disabled(I);
break;
case"ACCOUNT_PROBLEM":GAUTH_Events.problem(I);
break;
default:GAUTH_Events.error(I)
}}}}}}}}},u())
}catch(C){GAUTH_Events.error({errorDetails:C})
}},send:function(B){consoleInfo("gauth-widget.js send(): message: ["+JSON.stringify(B)+"]");
consoleInfo("gauth-widget.js send(): target_url: ["+r+"]}");
window.XD.postMessage(B,r,document.getElementById(d).contentWindow);
return false
},checkAuthentication:function(){var B;
loginPath=a();
if(j.embedWidget){B=k()+loginPath+"?clientId="+j.clientId+"&manual&service="+encodeURIComponent(jQuery.removeRequestParameters(document.location.href))
}else{B=k()+loginPath+"?clientId="+j.clientId+"&manual&service="+encodeURIComponent(document.location.href)
}if(j.generateExtraServiceTicket){B+="&generateExtraServiceTicket=true"
}if(j.generateNoServiceTicket){B+="&generateNoServiceTicket=true"
}if(j.callBackWebHostUrl){B+="&webhost="+encodeURIComponent(j.callBackWebHostUrl)
}consoleInfo("gauth-widget.js: checkAuthentication(): Loading ajax jsonp URL: ["+B+"]");
jQuery.ajax({url:B,dataType:"jsonp",error:function(E,C,D){consoleError("gauth-widget.js: checkAuthentication(): Error loading ajax jsonp URL: ["+B+"]! Error: "+D);
GAUTH_Events.error({status:"ERROR",errorDetails:D})
},success:function(E,C,F){consoleInfo("gauth-widget.js: checkAuthentication(): Success loading ajax jsonp url. data: ["+E+"]");
var D=E;
if(typeof(D)==="string"){D=JSON.parse(E)
}consoleInfo("gauth-widget.js: checkAuthentication(): serviceTicketId: ["+D.serviceTicketId+"], serviceUrl: ["+D.serviceUrl+"]");
if(D.serviceTicketId){GAUTH_Events.authenticated({status:"AUTHENTICATED",serviceTicket:D.serviceTicketId,serviceUrl:D.serviceUrl})
}else{GAUTH_Events.not_authenticated({status:"NOT_AUTHENTICATED"})
}}})
},openCreateAccount:function(B){consoleInfo("gauth-widget.js: openCreateAccount(): Opening create account iFrame.");
if(!B){B=""
}i(s,B);
showLightBox(800,850);
return false
}}
}();
function loadLightBoxes(){var a=document.createDocumentFragment();
var c=document.createElement("div");
c.id="gauth-light-box";
c.className="LB-white-content";
a.appendChild(c);
var b=document.createElement("div");
b.id="light_box_fade";
b.className="LB-black-overlay";
b.style.height=document.body.offsetHeight+20>screen.height?document.body.offsetHeight+20+"px":screen.height+"px";
if(typeof document.body.style.maxHeight==="undefined"){b.style.width=document.body.scrollWidth+20+"px"
}else{b.style.width="100%"
}a.appendChild(b);
document.body.appendChild(a)
}function showLightBox(j,b){loadLightBoxes();
var h=document.getElementById("gauth-light-box");
h.style.display="block";
h.style.height=j+"px";
h.style.width=b+"px";
h.style.position="absolute";
h.style.left="50%";
h.style.top="50%";
var c=b/2;
var a=j/2;
var e=vpHeight()/2;
var f=vpWidth()/2;
h.style.marginTop="-"+Math.min(e,a)+"px";
h.style.marginLeft="-"+Math.min(f,c)+"px";
var g=document.getElementById("light_box_fade");
if(g){g.style.display="block"
}if(typeof document.body.style.maxHeight==="undefined"){select_boxes=document.getElementsByTagName("select");
for(var d=0;
d<select_boxes.length;
d++){select_boxes[d].style.visibility="hidden"
}}window.scrollTo(0,0);
h.focus()
}function hideLightBox(){consoleInfo("gauth-widget.js: hideLightBox(): Entering function.");
var d=document.getElementById("gauth-light-box");
if(d){d.style.display="none";
var c=document.getElementById("light_box_fade");
if(c){c.style.display="none"
}purge(document.getElementById("popup-iframe-id"))
}if(typeof document.body.style.maxHeight==="undefined"){select_boxes=document.getElementsByTagName("select");
for(var b=0,a=select_boxes.length;
b<a;
b++){select_boxes[b].style.visibility="hidden"
}}}function vpWidth(){return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth
}function vpHeight(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight
}function purge(f){var c,e,b,g;
if(f){c=f.attributes;
if(c){for(e=c.length-1;
e>=0;
e-=1){g=c[e].name;
if(typeof f[g]==="function"){f[g]=null
}}}c=f.childNodes;
if(c){b=c.length;
for(e=0;
e<b;
e+=1){purge(f.childNodes[e])
}}}}jQuery.extend({getUrlVars:function(){var d=[],c;
var a=window.location.href.slice(window.location.href.indexOf("?")+1).split("&");
for(var b=0;
b<a.length;
b++){c=a[b].split("=");
d.push(c[0]);
d[c[0]]=c[1]
}return d
},getUrlVar:function(a){return jQuery.getUrlVars()[a]
},getHost:function(){pathArray=window.location.href.split("/");
return pathArray[0]+"//"+pathArray[2]
},removeRequestParameters:function(a){if(a.indexOf("?")!=-1){return a.slice(0,a.indexOf("?"))
}else{return a
}}});
var JSON;
if(!JSON){JSON={}
}(function(){function f(n){return n<10?"0"+n:n
}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null
};
String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()
}
}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;
function quote(string){escapable.lastIndex=0;
return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})+'"':'"'+string+'"'
}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];
if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)
}if(typeof rep==="function"){value=rep.call(holder,key,value)
}switch(typeof value){case"string":return quote(value);
case"number":return isFinite(value)?String(value):"null";
case"boolean":case"null":return String(value);
case"object":if(!value){return"null"
}gap+=indent;
partial=[];
if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;
for(i=0;
i<length;
i+=1){partial[i]=str(i,value)||"null"
}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";
gap=mind;
return v
}if(rep&&typeof rep==="object"){length=rep.length;
for(i=0;
i<length;
i+=1){if(typeof rep[i]==="string"){k=rep[i];
v=str(k,value);
if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);
if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";
gap=mind;
return v
}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;
gap="";
indent="";
if(typeof space==="number"){for(i=0;
i<space;
i+=1){indent+=" "
}}else{if(typeof space==="string"){indent=space
}}rep=replacer;
if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")
}return str("",{"":value})
}
}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;
function walk(holder,key){var k,v,value=holder[key];
if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);
if(v!==undefined){value[k]=v
}else{delete value[k]
}}}}return reviver.call(holder,key,value)
}text=String(text);
cx.lastIndex=0;
if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})
}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");
return typeof reviver==="function"?walk({"":j},""):j
}throw new SyntaxError("JSON.parse")
}
}}());
var XD=function(){var e,d,b=1,c,a=this;
return{postMessage:function(g,j,h){if(!j){return
}h=h||parent;
if(a.postMessage){if(j.indexOf("%253A%252F%252F")>=0){j=decodeURIComponent(j);
consoleInfo("gauth-widget.js: decoded over-encoded target_url to: ["+j+"]")
}var i=j.replace(/([^:]+:\/\/[^\/]+).*/,"$1");
var f=JSON.stringify(g);
consoleInfo("gauth-widget.js: newURL: ["+i+"], jsonMessage: ["+f+"]");
h.postMessage(f,i)
}else{if(j){h.location=j.replace(/#.*$/,"")+"#"+(+new Date)+(b++)+"&"+JSON.stringify(g)
}}},receiveMessage:function(g,f){if(a.postMessage){if(g){c=function(h){if((typeof f==="string"&&h.origin!==f)||(Object.prototype.toString.call(f)==="[object Function]"&&f(h.origin)===!1)){return !1
}g(h)
}
}if(a.addEventListener){a[g?"addEventListener":"removeEventListener"]("message",c,!1)
}else{a[g?"attachEvent":"detachEvent"]("onmessage",c)
}}else{e&&clearInterval(e);
e=null;
if(g){e=setInterval(function(){var i=document.location.hash,h=/^#?\d+&/;
if(i!==d&&h.test(i)){d=i;
g({data:JSON.parse(decodeURIComponent(i.replace(h,"")))})
}},100)
}}}}
}();
function EventTarget(){this._listeners={}
}EventTarget.prototype={constructor:EventTarget,addListener:function(a,b){if(typeof this._listeners[a]=="undefined"){this._listeners[a]=[]
}this._listeners[a].push(b)
},fire:function(d,e){if(typeof d=="string"){d={type:d}
}if(!d.target){d.target=this
}if(!d.type){throw new Error("Event object missing 'type' property.")
}if(this._listeners[d.type] instanceof Array){var c=this._listeners[d.type];
for(var b=0,a=c.length;
b<a;
b++){c[b].call(this,d,e)
}}},removeListener:function(d,e){if(this._listeners[d] instanceof Array){var c=this._listeners[d];
for(var b=0,a=c.length;
b<a;
b++){if(c[b]===e){c.splice(b,1);
break
}}}}};
function EventReg(){EventTarget.call(this)
}EventReg.prototype=new EventTarget();
EventReg.prototype.constructor=EventReg;
EventReg.prototype.not_authenticated=function(a){this.fire("NOT_AUTHENTICATED",a)
};
EventReg.prototype.authenticated=function(a){this.fire("AUTHENTICATED",a)
};
EventReg.prototype.success=function(a){this.fire("SUCCESS",a)
};
EventReg.prototype.error=function(a){this.fire("ERROR",a)
};
EventReg.prototype.fail=function(a){this.fire("FAIL",a)
};
EventReg.prototype.locked=function(a){this.fire("ACCOUNT_LOCKED",a)
};
EventReg.prototype.disabled=function(a){this.fire("ACCOUNT_DISABLED",a)
};
EventReg.prototype.problem=function(a){this.fire("ACCOUNT_PROBLEM",a)
};
EventReg.prototype.messagePosted=function(a){this.fire("MESSAGE-POSTED",a)
};
var GAUTH_Events=new EventReg();
GAUTH_Events.addListener("NOT_AUTHENTICATED",function(a,b){consoleInfo("gauth-widget.js: [NOT_AUTHENTICATED event triggered]")
});
GAUTH_Events.addListener("AUTHENTICATED",function(a,b){consoleInfo("gauth-widget.js: [AUTHENTICATED event triggered] serviceTicket: ["+b.serviceTicket+"], serviceUrl: ["+b.serviceUrl+"]")
});
GAUTH_Events.addListener("SUCCESS",function(a,b){consoleInfo("gauth-widget.js: [SUCCESS event triggered]")
});
GAUTH_Events.addListener("ERROR",function(a,b){consoleInfo("gauth-widget.js:  [ERROR event triggered] errorDetails: ["+b.errorDetails+"]")
});
GAUTH_Events.addListener("FAIL",function(a,b){consoleInfo("gauth-widget.js:  [FAIL event triggered] failDetails: ["+b.failDetails+"]")
});
GAUTH_Events.addListener("ACCOUNT_LOCKED",function(a,b){consoleInfo("gauth-widget.js: [ACCOUNT_LOCKED event triggered]")
});
GAUTH_Events.addListener("ACCOUNT_DISABLED",function(a,b){consoleInfo("gauth-widget.js: [ACCOUNT_DISABLED event triggered]")
});
GAUTH_Events.addListener("ACCOUNT_PROBLEM",function(a,b){consoleInfo("gauth-widget.js: [ACCOUNT_PROBLEM event triggered]")
});