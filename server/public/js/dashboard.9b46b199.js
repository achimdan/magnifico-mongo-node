(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dashboard"],{"732f":function(t,e,a){"use strict";var r=a("c737"),i=a.n(r);i.a},a761:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dashboard"},[a("h5",{staticClass:"title"},[t._v(" My Dashboard ")]),a("div",{staticClass:"cards"},[a("b-card",{attrs:{"bg-variant":"dark","text-variant":"white",title:"Add category"}},[a("b-card-text",[t._v(" With supporting text below as a natural lead-in to additional content. ")]),a("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.add-category-modal",modifiers:{"add-category-modal":!0}}],attrs:{pill:"",variant:"primary"}},[t._v(" Add category ")])],1),a("b-card",{attrs:{"bg-variant":"dark","text-variant":"white",title:"Add product"}},[a("b-card-text",[t._v(" With supporting text below as a natural lead-in to additional content. ")]),a("b-button",{attrs:{pill:"",variant:"primary"},on:{click:t.addProduct}},[t._v(" Add product ")])],1)],1),a("div",{staticClass:"products"},[a("b-table",{attrs:{"table-class":"shop-table",striped:"",hover:"",fields:t.fields,items:t.products},scopedSlots:t._u([{key:"cell(Images)",fn:function(e){return[a("b-carousel",{staticStyle:{"text-shadow":"1px 1px 2px #333"},attrs:{id:"carousel-1",controls:"",interval:8e13,background:"#ababab","img-width":"100","img-height":"100"}},t._l(e.item.Images,(function(e){return a("b-carousel-slide",{key:e.Id,attrs:{"img-src":t.baseUrl+"api/files/"+e.Name}})})),1)]}},{key:"cell(Category)",fn:function(e){return[e.item.Category?a("span",[t._v(" "+t._s(e.item.Category.Name)+" ")]):t._e()]}},{key:"cell(Stock)",fn:function(e){return[a("b-form-checkbox",{attrs:{id:"stock",disabled:"",name:"stock"},model:{value:e.item.Stock,callback:function(a){t.$set(e.item,"Stock",a)},expression:"data.item.Stock"}})]}},{key:"cell(Actions)",fn:function(e){return[a("b-button",{staticClass:"mr-1",attrs:{size:"sm"},on:{click:function(a){return t.deleteProduct(e.item,e.index,a.target)}}},[t._v(" Delete ")]),a("b-button",{attrs:{size:"sm"},on:{click:function(a){return t.edit(e.item)}}},[t._v(" Edit ")]),a("b-button",{attrs:{size:"sm"},on:{click:function(a){return t.preview(e.item)}}},[t._v(" Preview ")])]}}])})],1)])},i=[],c=a("d4ec"),o=a("bee2"),n=a("99de"),s=a("7e84"),d=a("262e"),l=a("9ab4"),u=a("60a3"),b=a("aea7"),m=function(t){function e(){var t;return Object(c["a"])(this,e),t=Object(n["a"])(this,Object(s["a"])(e).apply(this,arguments)),t.fields=[{key:"Images",class:"image"},{key:"Name",sortable:!1},{key:"Description"},{key:"Price"},{key:"Stock"},{key:"Actions"}],t}return Object(d["a"])(e,t),Object(o["a"])(e,[{key:"created",value:function(){b["a"].fetchProducts()}},{key:"addProduct",value:function(){b["a"].setModalType("ADD"),this.$bvModal.show("add-product-modal")}},{key:"deleteProduct",value:function(t,e){b["a"].deleteProduct({item:t,index:e})}},{key:"edit",value:function(t){b["a"].setModalType("EDIT"),b["a"].setSelectedProduct(t),this.$bvModal.show("add-product-modal")}},{key:"preview",value:function(t){this.$router.push("/product/".concat(t.Id))}},{key:"products",get:function(){return b["a"].products}},{key:"baseUrl",get:function(){return b["a"].BASE_URL}}]),e}(u["c"]);m=Object(l["__decorate"])([u["a"]],m);var p=m,f=p,v=(a("732f"),a("2877")),k=Object(v["a"])(f,r,i,!1,null,"63f9ceeb",null);e["default"]=k.exports},c737:function(t,e,a){}}]);
//# sourceMappingURL=dashboard.9b46b199.js.map