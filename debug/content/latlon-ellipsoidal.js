/* Geodesy tools for an ellipsoidal earth model                       (c) Chris Veness 2005-2016  */

function LatLon(e,t,n){if(!(this instanceof LatLon))return new LatLon(e,t,n);n===undefined&&(n=LatLon.datum.WGS84),this.lat=Number(e),this.lon=Number(t),this.datum=n}if(typeof module!="undefined"&&module.exports)var Vector3d=require("./vector3d.js");if(typeof module!="undefined"&&module.exports)var Dms=require("./dms.js");LatLon.ellipsoid={WGS84:{a:6378137,b:6356752.314245,f:1/298.257223563},Airy1830:{a:6377563.396,b:6356256.909,f:1/299.3249646},AiryModified:{a:6377340.189,b:6356034.448,f:1/299.3249646},Bessel1841:{a:6377397.155,b:6356078.962818,f:1/299.1528128},Clarke1866:{a:6378206.4,b:6356583.8,f:1/294.978698214},Clarke1880IGN:{a:6378249.2,b:6356515,f:1/293.466021294},GRS80:{a:6378137,b:6356752.31414,f:1/298.257222101},Intl1924:{a:6378388,b:6356911.946,f:1/297},WGS72:{a:6378135,b:6356750.5,f:1/298.26}},LatLon.datum={ED50:{ellipsoid:LatLon.ellipsoid.Intl1924,transform:[89.5,93.8,123.1,-1.2,0,0,.156]},Irl1975:{ellipsoid:LatLon.ellipsoid.AiryModified,transform:[-482.53,130.596,-564.557,-8.15,-1.042,-0.214,-0.631]},NAD27:{ellipsoid:LatLon.ellipsoid.Clarke1866,transform:[8,-160,-176,0,0,0,0]},NAD83:{ellipsoid:LatLon.ellipsoid.GRS80,transform:[1.004,-1.91,-0.515,-0.0015,.0267,34e-5,.011]},NTF:{ellipsoid:LatLon.ellipsoid.Clarke1880IGN,transform:[168,60,-320,0,0,0,0]},OSGB36:{ellipsoid:LatLon.ellipsoid.Airy1830,transform:[-446.448,125.157,-542.06,20.4894,-0.1502,-0.247,-0.8421]},Potsdam:{ellipsoid:LatLon.ellipsoid.Bessel1841,transform:[-582,-105,-414,-8.3,1.04,.35,-3.08]},TokyoJapan:{ellipsoid:LatLon.ellipsoid.Bessel1841,transform:[148,-507,-685,0,0,0,0]},WGS72:{ellipsoid:LatLon.ellipsoid.WGS72,transform:[0,0,-4.5,-0.22,0,0,.554]},WGS84:{ellipsoid:LatLon.ellipsoid.WGS84,transform:[0,0,0,0,0,0,0]}},LatLon.prototype.convertDatum=function(e){var t=this,n=null;t.datum==LatLon.datum.WGS84&&(n=e.transform);if(e==LatLon.datum.WGS84){n=[];for(var r=0;r<7;r++)n[r]=-t.datum.transform[r]}n==null&&(t=this.convertDatum(LatLon.datum.WGS84),n=e.transform);var i=t.toCartesian(),s=i.applyTransform(n),o=s.toLatLonE(e);return o},LatLon.prototype.toCartesian=function(){var e=this.lat.toRadians(),t=this.lon.toRadians(),n=0,r=this.datum.ellipsoid.a,i=this.datum.ellipsoid.f,s=Math.sin(e),o=Math.cos(e),u=Math.sin(t),a=Math.cos(t),f=2*i-i*i,l=r/Math.sqrt(1-f*s*s),c=(l+n)*o*a,h=(l+n)*o*u,p=(l*(1-f)+n)*s,d=new Vector3d(c,h,p);return d},Vector3d.prototype.toLatLonE=function(e){var t=this.x,n=this.y,r=this.z,i=e.ellipsoid.a,s=e.ellipsoid.b,o=e.ellipsoid.f,u=2*o-o*o,a=u/(1-u),f=Math.sqrt(t*t+n*n),l=Math.sqrt(f*f+r*r),c=s*r/(i*f)*(1+a*s/l),h=c/Math.sqrt(1+c*c),p=h/c,d=isNaN(p)?0:Math.atan2(r+a*s*h*h*h,f-u*i*p*p*p),v=Math.atan2(n,t),m=Math.sin(d),g=Math.cos(d),y=i/Math.sqrt(1-u*m*m),b=f*g+r*m-i*i/y,w=new LatLon(d.toDegrees(),v.toDegrees(),e);return w},Vector3d.prototype.applyTransform=function(e){var t=this.x,n=this.y,r=this.z,i=e[0],s=e[1],o=e[2],u=e[3]/1e6+1,a=(e[4]/3600).toRadians(),f=(e[5]/3600).toRadians(),l=(e[6]/3600).toRadians(),c=i+t*u-n*l+r*f,h=s+t*l+n*u-r*a,p=o-t*f+n*a+r*u;return new Vector3d(c,h,p)},LatLon.prototype.toString=function(e,t){return Dms.toLat(this.lat,e,t)+", "+Dms.toLon(this.lon,e,t)},Number.prototype.toRadians===undefined&&(Number.prototype.toRadians=function(){return this*Math.PI/180}),Number.prototype.toDegrees===undefined&&(Number.prototype.toDegrees=function(){return this*180/Math.PI}),typeof module!="undefined"&&module.exports&&(module.exports=LatLon,module.exports.Vector3d=Vector3d);