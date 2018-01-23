/* Geodesy representation conversion functions                        (c) Chris Veness 2002-2017  */

var Dms={};Dms.parseDMS=function(e){if(typeof e=="number"&&isFinite(e))return Number(e);var t=String(e).trim().replace(/^-/,"").replace(/[NSEW]$/i,"").split(/[^0-9.,]+/);t[t.length-1]==""&&t.splice(t.length-1);if(t=="")return NaN;var n;switch(t.length){case 3:n=t[0]/1+t[1]/60+t[2]/3600;break;case 2:n=t[0]/1+t[1]/60;break;case 1:n=t[0];break;default:return NaN}return/^-|[WS]$/i.test(e.trim())&&(n=-n),Number(n)},Dms.separator="",Dms.toDMS=function(e,t,n){if(isNaN(e))return null;t===undefined&&(t="dms");if(n===undefined)switch(t){case"d":case"deg":n=4;break;case"dm":case"deg+min":n=2;break;case"dms":case"deg+min+sec":n=0;break;default:t="dms",n=0}e=Math.abs(e);var r,i,s,o;switch(t){default:case"d":case"deg":i=e.toFixed(n),i<100&&(i="0"+i),i<10&&(i="0"+i),r=i+"°";break;case"dm":case"deg+min":i=Math.floor(e),s=(e*60%60).toFixed(n),s==60&&(s=0,i++),i=("000"+i).slice(-3),s<10&&(s="0"+s),r=i+"°"+Dms.separator+s+"′";break;case"dms":case"deg+min+sec":i=Math.floor(e),s=Math.floor(e*3600/60)%60,o=(e*3600%60).toFixed(n),o==60&&(o=0..toFixed(n),s++),s==60&&(s=0,i++),i=("000"+i).slice(-3),s=("00"+s).slice(-2),o<10&&(o="0"+o),r=i+"°"+Dms.separator+s+"′"+Dms.separator+o+"″"}return r},Dms.toLat=function(e,t,n){var r=Dms.toDMS(e,t,n);return r===null?"–":r.slice(1)+Dms.separator+(e<0?"S":"N")},Dms.toLon=function(e,t,n){var r=Dms.toDMS(e,t,n);return r===null?"–":r+Dms.separator+(e<0?"W":"E")},Dms.toBrng=function(e,t,n){e=(Number(e)+360)%360;var r=Dms.toDMS(e,t,n);return r===null?"–":r.replace("360","0")},Dms.compassPoint=function(e,t){t===undefined&&(t=3),e=(e%360+360)%360;var n=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"],r=4*Math.pow(2,t-1),i=n[Math.round(e*r/360)%r*16/r];return i},typeof module!="undefined"&&module.exports&&(module.exports=Dms);