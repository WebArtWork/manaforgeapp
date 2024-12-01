import{e as M}from"./chunk-TJS7GMF3.js";import{$a as l,H as a,K as u,L as p,Q as g,Ua as w,W as _,cb as v,db as C,eb as S,gb as c,lb as y,q as f,r as h,sb as b,t as s,ub as j}from"./chunk-76546ULM.js";var k={formId:"manaforgeworld",title:"Manaforgeworld",components:[{name:"Text",key:"name",focused:!0,fields:[{name:"Placeholder",value:"fill manaforgeworld title"},{name:"Label",value:"Title"}]},{name:"Text",key:"description",fields:[{name:"Placeholder",value:"fill manaforgeworld description"},{name:"Label",value:"Description"}]}]};var I=(()=>{class r extends v{constructor(i,t,e,n){super({name:"manaforgeworld"},i,t,e,n),this.manaforgeworlds=this.getDocs(),this.manaforgeworldsByAuthor={},this.get(),this.filteredDocuments(this.manaforgeworldsByAuthor)}static{this.\u0275fac=function(t){return new(t||r)(s(S),s(C),s(c),s(l))}}static{this.\u0275prov=f({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();var x=(()=>{class r{get rows(){return this._manaforgeworldService.manaforgeworlds}constructor(i,t,e,n,m){this._translate=i,this._manaforgeworldService=t,this._alert=e,this._form=n,this._core=m,this.columns=["name","description"],this.form=this._form.getForm("manaforgeworld",k),this.config={create:()=>{this._form.modal(this.form,{label:"Create",click:(o,d)=>{this._preCreate(o),this._manaforgeworldService.create(o),d()}})},update:o=>{this._form.modal(this.form,[],o).then(d=>{this._core.copy(d,o),this._manaforgeworldService.update(o)})},delete:o=>{this._alert.question({text:this._translate.translate("Common.Are you sure you want to delete this manaforgeworld?"),buttons:[{text:this._translate.translate("Common.No")},{text:this._translate.translate("Common.Yes"),callback:()=>{this._manaforgeworldService.delete(o)}}]})},buttons:[{icon:"cloud_download",click:o=>{this._form.modalUnique("manaforgeworld","url",o)}},{icon:"auto_stories",hrefFunc:o=>"/stories/"+o._id},{icon:"sports_kabaddi",hrefFunc:o=>"/heroes/"+o._id},{icon:"school",hrefFunc:o=>"/schools/"+o._id},{icon:"fort",hrefFunc:o=>"/dungeons/"+o._id}],headerButtons:[{icon:"playlist_add",click:this._bulkManagement(),class:"playlist"},{icon:"edit_note",click:this._bulkManagement(!1),class:"edit"}]}}_bulkManagement(i=!0){return()=>{this._form.modalDocs(i?[]:this.rows).then(t=>{if(i)for(let e of t)this._preCreate(e),this._manaforgeworldService.create(e);else{for(let e of this.rows)t.find(n=>n._id===e._id)||this._manaforgeworldService.delete(e);for(let e of t){let n=this.rows.find(m=>m._id===e._id);n?(this._core.copy(e,n),this._manaforgeworldService.update(n)):(this._preCreate(e),this._manaforgeworldService.create(e))}}})}}_preCreate(i){i.__created}static{this.\u0275fac=function(t){return new(t||r)(a(y),a(I),a(c),a(j),a(l))}}static{this.\u0275cmp=u({type:r,selectors:[["ng-component"]],standalone:!1,decls:1,vars:3,consts:[["title","Worlds",3,"columns","config","rows"]],template:function(t,e){t&1&&_(0,"wtable",0),t&2&&g("columns",e.columns)("config",e.config)("rows",e.rows)},dependencies:[b],encapsulation:2})}}return r})();var A=[{path:"",component:x}],z=(()=>{class r{static{this.\u0275fac=function(t){return new(t||r)}}static{this.\u0275mod=p({type:r})}static{this.\u0275inj=h({imports:[w.forChild(A),M]})}}return r})();export{z as WorldsModule};
