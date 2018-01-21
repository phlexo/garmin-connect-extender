/* Vincenty Direct and Inverse Solution of Geodesics on the Ellipsoid (c) Chris Veness 2002-2017  */

if(typeof module!="undefined"&&module.exports)var LatLon=require("./latlon-ellipsoidal.js");LatLon.prototype.distanceTo=function(e){if(!(e instanceof LatLon))throw new TypeError("point is not LatLon object");try{return Number(this.inverse(e).distance.toFixed(3))}catch(t){return NaN}},LatLon.prototype.initialBearingTo=function(e){if(!(e instanceof LatLon))throw new TypeError("point is not LatLon object");try{return Number(this.inverse(e).initialBearing.toFixed(9))}catch(t){return NaN}},LatLon.prototype.finalBearingTo=function(e){if(!(e instanceof LatLon))throw new TypeError("point is not LatLon object");try{return Number(this.inverse(e).finalBearing.toFixed(9))}catch(t){return NaN}},LatLon.prototype.destinationPoint=function(e,t){return this.direct(Number(e),Number(t)).point},LatLon.prototype.finalBearingOn=function(e,t){return Number(this.direct(Number(e),Number(t)).finalBearing.toFixed(9))},LatLon.prototype.direct=function(e,t){var n=this.lat.toRadians(),r=this.lon.toRadians(),i=t.toRadians(),s=e,o=this.datum.ellipsoid.a,u=this.datum.ellipsoid.b,a=this.datum.ellipsoid.f,f=Math.sin(i),l=Math.cos(i),c=(1-a)*Math.tan(n),h=1/Math.sqrt(1+c*c),p=c*h,d=Math.atan2(c,l),v=h*f,m=1-v*v,g=m*(o*o-u*u)/(u*u),y=1+g/16384*(4096+g*(-768+g*(320-175*g))),b=g/1024*(256+g*(-128+g*(74-47*g))),w,E,S,x,T=s/(u*y),N,C=0;do w=Math.cos(2*d+T),E=Math.sin(T),S=Math.cos(T),x=b*E*(w+b/4*(S*(-1+2*w*w)-b/6*w*(-3+4*E*E)*(-3+4*w*w))),N=T,T=s/(u*y)+x;while(Math.abs(T-N)>1e-12&&++C<100);if(C>=100)throw new Error("Formula failed to converge");var k=p*E-h*S*l,L=Math.atan2(p*S+h*E*l,(1-a)*Math.sqrt(v*v+k*k)),A=Math.atan2(E*f,h*S-p*E*l),O=a/16*m*(4+a*(4-3*m)),M=A-(1-O)*a*v*(T+O*E*(w+O*S*(-1+2*w*w))),_=(r+M+3*Math.PI)%(2*Math.PI)-Math.PI,D=Math.atan2(v,-k);return D=(D+2*Math.PI)%(2*Math.PI),{point:new LatLon(L.toDegrees(),_.toDegrees(),this.datum),finalBearing:D.toDegrees(),iterations:C}},LatLon.prototype.inverse=function(e){var t=this,n=e;t.lon==-180&&(t.lon=180);var r=t.lat.toRadians(),i=t.lon.toRadians(),s=n.lat.toRadians(),o=n.lon.toRadians(),u=this.datum.ellipsoid.a,a=this.datum.ellipsoid.b,f=this.datum.ellipsoid.f,l=o-i,c=(1-f)*Math.tan(r),h=1/Math.sqrt(1+c*c),p=c*h,d=(1-f)*Math.tan(s),v=1/Math.sqrt(1+d*d),m=d*v,g,y,b,w=0,E=0,S=0,x,T=0,N=0,C,k=l,L,A=0;do{g=Math.sin(k),y=Math.cos(k),b=v*g*v*g+(h*m-p*v*y)*(h*m-p*v*y);if(b==0)break;w=Math.sqrt(b),E=p*m+h*v*y,S=Math.atan2(w,E),x=h*v*g/w,T=1-x*x,N=T!=0?E-2*p*m/T:0,C=f/16*T*(4+f*(4-3*T)),L=k,k=l+(1-C)*f*x*(S+C*w*(N+C*E*(-1+2*N*N)));if(Math.abs(k)>Math.PI)throw new Error("λ > π")}while(Math.abs(k-L)>1e-12&&++A<1e3);if(A>=1e3)throw new Error("Formula failed to converge");var O=T*(u*u-a*a)/(a*a),M=1+O/16384*(4096+O*(-768+O*(320-175*O))),_=O/1024*(256+O*(-128+O*(74-47*O))),D=_*w*(N+_/4*(E*(-1+2*N*N)-_/6*N*(-3+4*w*w)*(-3+4*N*N))),P=a*M*(S-D),H=Math.atan2(v*g,h*m-p*v*y),B=Math.atan2(h*g,-p*v+h*m*y);return H=(H+2*Math.PI)%(2*Math.PI),B=(B+2*Math.PI)%(2*Math.PI),{distance:P,initialBearing:P==0?NaN:H.toDegrees(),finalBearing:P==0?NaN:B.toDegrees(),iterations:A}},Number.prototype.toRadians===undefined&&(Number.prototype.toRadians=function(){return this*Math.PI/180}),Number.prototype.toDegrees===undefined&&(Number.prototype.toDegrees=function(){return this*180/Math.PI}),typeof module!="undefined"&&module.exports&&(module.exports=LatLon);