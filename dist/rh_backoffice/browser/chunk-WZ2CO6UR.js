import{Ma as h,Oa as p,a as c}from"./chunk-VAZIEAYM.js";import{ca as n,ha as e}from"./chunk-YXL6XVMF.js";var f=(()=>{let r=class r{constructor(a,s,l){this._api_url=a,this._http=s,this._localStorage=l,this.getToken=()=>{let t=this._localStorage.getTokenToStorage();return this.headers={headers:{Authorization:"Bearer "+t}},this.headers},this.connectAdmin=t=>{let i=this._api_url.apiUrl+"login_admin";return this._http.post(i,t)},this.checkUserAccounts=t=>{let i=this._api_url.apiUrl+"check_user_account";return this._http.post(i,t)},this.updateUserPassword=t=>{let i=this._api_url.apiUrl+"update_user_password";return this._http.post(i,t)},this.logOut=t=>{let i=this._localStorage.getTokenToStorage(),u=this._api_url.apiUrl+"logout_users/"+t;return this._http.get(u,this.getToken())}}};r.\u0275fac=function(s){return new(s||r)(e(h),e(c),e(p))},r.\u0275prov=n({token:r,factory:r.\u0275fac,providedIn:"root"});let o=r;return o})();export{f as a};
