(this["webpackJsonpmsg-to-markdown"]=this["webpackJsonpmsg-to-markdown"]||[]).push([[0],{15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),r=n(3),s=n.n(r),c=n(4),l=n(5),i=n(9),h=n(8),d=n(6),u=n(7),p=n(0),j=function(e){Object(i.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).handlePaste=function(e){var t=e.clipboardData.getData("text/html"),n=t.replaceAll(v,"");console.log(n);for(var o=(new window.DOMParser).parseFromString(n,"text/html"),r=0,s=[],c=0,l=Array.from(o.body.children);c<l.length;c++){var i=l[c];if("P"===i.nodeName)if(console.log("test p",i),"MsoListParagraph"===i.getAttribute("class")){var h,p=null!==(h=i.getAttribute("style"))&&void 0!==h?h:"",j=b.exec(p);if(null!==j){var g=+j[1];for(g>r&&s.push("<ul>");g<r;)s.push("</ul>"),r>0&&s.push("</li>"),r--;r=g,s.push("<li>".concat(i.textContent)),console.log("level",g,j)}}else{for(;r>0;)r--,s.push("</ul>"),r>0&&s.push("</li>");s.push("<p>".concat(i.textContent,"</p>"))}else s.push(i.outerHTML)}var f=s.join("\n");console.log(s),console.log(f);var x=new d.a;x.use(u.a);var w=x.turndown(f);console.log(w),a.setState({data:f,markdown:w})},a.handleTextChange=function(e){var t=e.target.value;a.setState({data:t})},a.state={data:"",markdown:""},a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(e,t){}},{key:"render",value:function(){var e=this;return Object(p.jsxs)("div",{onPaste:this.handlePaste,style:{backgroundColor:"#ccc"},children:[Object(p.jsx)("h1",{children:"msg to markdown"}),Object(p.jsx)("h2",{children:"usage"}),Object(p.jsx)("p",{children:"You can paste HTML content with CTRL+V. If you have HTML text on the clipboard, you can also paste to the textarea."}),Object(p.jsx)("textarea",{value:this.state.data,onChange:this.handleTextChange}),Object(p.jsxs)("div",{style:{display:"flex",flexDirection:"row",width:"100%",height:"75vh",justifyContent:"space-between"},children:[Object(p.jsxs)("div",{style:{width:"48%",overflowX:"scroll"},children:[Object(p.jsx)("h2",{children:"HTML (parsed)"}),Object(p.jsx)("pre",{children:this.state.data})]}),Object(p.jsxs)("pre",{style:{width:"48%",overflowX:"scroll"},children:[Object(p.jsxs)("h2",{children:["markdown"," ",Object(p.jsx)("button",{onClick:function(){navigator.clipboard.writeText(e.state.markdown)},children:"copy"})]}),this.state.markdown]})]})]})}}]),n}(o.a.PureComponent),v=/<!\[if[\s\S]*?endif\]>/gm,b=/level(\d)/;n(15);var g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,a=t.getFID,o=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),o(e),r(e),s(e)}))};s.a.render(Object(p.jsx)(o.a.StrictMode,{children:Object(p.jsx)(j,{})}),document.getElementById("root")),g()}},[[16,1,2]]]);
//# sourceMappingURL=main.ff7b1d8a.chunk.js.map