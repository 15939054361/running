(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/stepRanking/index"],{"17b7":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var i=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.rankList,(function(e,n){var r=t.__get_orig(e),i=e.loves.includes(t.userInfo.openId),o=t.list.includes(e.openId);return{$orig:r,g0:i,g1:o}})));t.$mp.data=Object.assign({},{$root:{l0:n}})},o=[]},"2f55":function(t,e,n){"use strict";var r=n("3f79"),i=n.n(r);i.a},"32fc":function(t,e,n){"use strict";n.r(e);var r=n("17b7"),i=n("e9f2");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("2f55");var s,a=n("f0c5"),u=Object(a["a"])(i["default"],r["b"],r["c"],!1,null,"5186b6ec",null,!1,r["a"],s);e["default"]=u.exports},"3f79":function(t,e,n){},"95b0":function(t,e,n){"use strict";(function(t){n("39f5");r(n("66fd"));var e=r(n("32fc"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},db3f:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("a34a")),i=n("2f62"),o=n("1a14"),s=n("5156");function a(t){return t&&t.__esModule?t:{default:t}}function u(t,e,n,r,i,o,s){try{var a=t[o](s),u=a.value}catch(c){return void n(c)}a.done?e(u):Promise.resolve(u).then(r,i)}function c(t){return function(){var e=this,n=arguments;return new Promise((function(r,i){var o=t.apply(e,n);function s(t){u(o,r,i,s,a,"next",t)}function a(t){u(o,r,i,s,a,"throw",t)}s(void 0)}))}}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){d(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function d(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var h={data:function(){return{rankList:[],scrollTop:0,params:{limit:30,page:0},hasMore:!0,listCurID:"",StatusBar:this.StatusBar,CustomBar:this.CustomBar,hidden:!0,listCur:"",boxTop:"",list:[]}},computed:f({},(0,i.mapState)("user",{userInfo:function(t){return t.userInfo}})),onReady:function(){wx.requestSubscribeMessage();var e=this;t.createSelectorQuery().select(".indexes").boundingClientRect((function(t){e.barTop=t.top})).exec()},created:function(){this.init(),console.log(this.userInfo)},methods:{init:function(){var e=this;return c(r.default.mark((function n(){var i;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e.hasMore){n.next=2;break}return n.abrupt("return",t.showToast({title:"没有更多了",icon:"none"}));case 2:return n.next=4,(0,o.step_ranking)(e.params);case 4:i=n.sent,0===i.status?(i.data.forEach((function(t,n){var r=[];console.log(t.today),e.rankList.push({avatar:t.userInfo[0].avatarUrl,nickName:t.userInfo[0].nickName,step:t.today,id:t._id,openId:t.userInfo[0].openId,indexId:t.userInfo[0]._id,count:t.loves.length}),t.loves.length>0?t.loves.forEach((function(t,e){r.push(t.love)})):r=t.loves,e.rankList[n].loves=r})),e.listCur=e.rankList[0].name,e.params.page++,i.data.length<e.params.limit?e.hasMore=!1:e.hasMore=!0):t.showToast({title:i.message,icon:"none"});case 6:case"end":return n.stop()}}),n)})))()},lower:function(){this.init()},getCur:function(t){this.hidden=!1,this.listCur=this.rankList[t.target.id].name},setCur:function(t){this.hidden=!0,this.listCur=this.listCur},tMove:function(t){var e=t.touches[0].clientY,n=this.boxTop,r=this;if(e>n){var i=parseInt((e-n)/20);this.listCur=r.rankList[i].name}},tStart:function(){this.hidden=!1},tEnd:function(){console.log(this.userInfo),this.hidden=!0,this.listCurID=this.userInfo._id},indexSelect:function(t){for(var e=this,n=this.barHeight,r=this.rankList,i=Math.ceil(r.length*t.detail.y/n),o=0;o<r.length;o++)if(i<o+1)return e.listCur="5f040501b933b918ddbf51de",e.movableY=20*o,!1},scroll:function(){this.listCurID=0},handleLove:function(e){var n=this;return c(r.default.mark((function i(){var o,a,u,c;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(o=e.currentTarget.dataset,a=o.index,u=o.openid,!n.rankList[a].loves.includes(n.userInfo.openId)&&!n.list.includes(u)){r.next=3;break}return r.abrupt("return");case 3:return r.next=5,(0,s.like)({love:n.userInfo.openId,loved:u});case 5:c=r.sent,console.log(c.status),0===c.status?(n.list.push(u),n.rankList[a].count++,console.log(n.list)):t.showToast({title:c.message,icon:"none"}),console.log(c);case 9:case"end":return r.stop()}}),i)})))()}}};e.default=h}).call(this,n("543d")["default"])},e9f2:function(t,e,n){"use strict";n.r(e);var r=n("db3f"),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a}},[["95b0","common/runtime","common/vendor"]]]);