ace.define("ace/snippets",[],function(r,a,b){"use strict";var d=r("./lib/dom");var o=r("./lib/oop");var E=r("./lib/event_emitter").EventEmitter;var l=r("./lib/lang");var R=r("./range").Range;var f=r("./range_list").RangeList;var H=r("./keyboard/hash_handler").HashHandler;var T=r("./tokenizer").Tokenizer;var g=r("./clipboard");var V={CURRENT_WORD:function(e){return e.session.getTextRange(e.session.getWordRange());},SELECTION:function(e,c,i){var t=e.session.getTextRange();if(i)return t.replace(/\n\r?([ \t]*\S)/g,"\n"+i+"$1");return t;},CURRENT_LINE:function(e){return e.session.getLine(e.getCursorPosition().row);},PREV_LINE:function(e){return e.session.getLine(e.getCursorPosition().row-1);},LINE_INDEX:function(e){return e.getCursorPosition().row;},LINE_NUMBER:function(e){return e.getCursorPosition().row+1;},SOFT_TABS:function(e){return e.session.getUseSoftTabs()?"YES":"NO";},TAB_SIZE:function(e){return e.session.getTabSize();},CLIPBOARD:function(e){return g.getText&&g.getText();},FILENAME:function(e){return/[^/\\]*$/.exec(this.FILEPATH(e))[0];},FILENAME_BASE:function(e){return/[^/\\]*$/.exec(this.FILEPATH(e))[0].replace(/\.[^.]*$/,"");},DIRECTORY:function(e){return this.FILEPATH(e).replace(/[^/\\]*$/,"");},FILEPATH:function(e){return"/not implemented.txt";},WORKSPACE_NAME:function(){return"Unknown";},FULLNAME:function(){return"Unknown";},BLOCK_COMMENT_START:function(e){var m=e.session.$mode||{};return m.blockComment&&m.blockComment.start||"";},BLOCK_COMMENT_END:function(e){var m=e.session.$mode||{};return m.blockComment&&m.blockComment.end||"";},LINE_COMMENT:function(e){var m=e.session.$mode||{};return m.lineCommentStart||"";},CURRENT_YEAR:h.bind(null,{year:"numeric"}),CURRENT_YEAR_SHORT:h.bind(null,{year:"2-digit"}),CURRENT_MONTH:h.bind(null,{month:"numeric"}),CURRENT_MONTH_NAME:h.bind(null,{month:"long"}),CURRENT_MONTH_NAME_SHORT:h.bind(null,{month:"short"}),CURRENT_DATE:h.bind(null,{day:"2-digit"}),CURRENT_DAY_NAME:h.bind(null,{weekday:"long"}),CURRENT_DAY_NAME_SHORT:h.bind(null,{weekday:"short"}),CURRENT_HOUR:h.bind(null,{hour:"2-digit",hour12:false}),CURRENT_MINUTE:h.bind(null,{minute:"2-digit"}),CURRENT_SECOND:h.bind(null,{second:"2-digit"})};V.SELECTED_TEXT=V.SELECTION;function h(c){var s=new Date().toLocaleString("en-us",c);return s.length==1?"0"+s:s;}var S=function(){this.snippetMap={};this.snippetNameMap={};};(function(){o.implement(this,E);this.getTokenizer=function(){return S.$tokenizer||this.createTokenizer();};this.createTokenizer=function(){function c(s){s=s.substr(1);if(/^\d+$/.test(s))return[{tabstopId:parseInt(s,10)}];return[{text:s}];}function e(j){return"(?:[^\\\\"+j+"]|\\\\.)";}var i={regex:"/("+e("/")+"+)/",onMatch:function(v,s,j){var t=j[0];t.fmtString=true;t.guard=v.slice(1,-1);t.flag="";return"";},next:"formatString"};S.$tokenizer=new T({start:[{regex:/\\./,onMatch:function(v,s,j){var m=v[1];if(m=="}"&&j.length){v=m;}else if("`$\\".indexOf(m)!=-1){v=m;}return[v];}},{regex:/}/,onMatch:function(v,s,j){return[j.length?j.shift():v];}},{regex:/\$(?:\d+|\w+)/,onMatch:c},{regex:/\$\{[\dA-Z_a-z]+/,onMatch:function(s,j,m){var t=c(s.substr(1));m.unshift(t[0]);return t;},next:"snippetVar"},{regex:/\n/,token:"newline",merge:false}],snippetVar:[{regex:"\\|"+e("\\|")+"*\\|",onMatch:function(v,s,j){var m=v.slice(1,-1).replace(/\\[,|\\]|,/g,function(p){return p.length==2?p[1]:"\x00";}).split("\x00").map(function(p){return{value:p};});j[0].choices=m;return[m[0]];},next:"start"},i,{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"start"}],formatString:[{regex:/:/,onMatch:function(v,s,j){if(j.length&&j[0].expectElse){j[0].expectElse=false;j[0].ifEnd={elseEnd:j[0]};return[j[0].ifEnd];}return":";}},{regex:/\\./,onMatch:function(v,s,j){var m=v[1];if(m=="}"&&j.length)v=m;else if("`$\\".indexOf(m)!=-1)v=m;else if(m=="n")v="\n";else if(m=="t")v="\t";else if("ulULE".indexOf(m)!=-1)v={changeCase:m,local:m>"a"};return[v];}},{regex:"/\\w*}",onMatch:function(v,s,j){var m=j.shift();if(m)m.flag=v.slice(1,-1);this.next=m&&m.tabstopId?"start":"";return[m||v];},next:"start"},{regex:/\$(?:\d+|\w+)/,onMatch:function(v,s,j){return[{text:v.slice(1)}];}},{regex:/\${\w+/,onMatch:function(v,s,j){var t={text:v.slice(2)};j.unshift(t);return[t];},next:"formatStringVar"},{regex:/\n/,token:"newline",merge:false},{regex:/}/,onMatch:function(v,s,j){var m=j.shift();this.next=m&&m.tabstopId?"start":"";return[m||v];},next:"start"}],formatStringVar:[{regex:/:\/\w+}/,onMatch:function(v,s,j){var t=j[0];t.formatFunction=v.slice(2,-1);return[j.shift()];},next:"formatString"},i,{regex:/:[\?\-+]?/,onMatch:function(v,s,j){if(v[1]=="+")j[0].ifEnd=j[0];if(v[1]=="?")j[0].expectElse=true;},next:"formatString"},{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"formatString"}]});return S.$tokenizer;};this.tokenizeTmSnippet=function(s,c){return this.getTokenizer().getLineTokens(s,c).tokens.map(function(x){return x.value||x;});};this.getVariableValue=function(e,c,i){if(/^\d+$/.test(c))return(this.variables.__||{})[c]||"";if(/^[A-Z]\d+$/.test(c))return(this.variables[c[0]+"__"]||{})[c.substr(1)]||"";c=c.replace(/^TM_/,"");if(!this.variables.hasOwnProperty(c))return"";var v=this.variables[c];if(typeof v=="function")v=this.variables[c](e,c,i);return v==null?"":v;};this.variables=V;this.tmStrFormat=function(s,c,e){if(!c.fmt)return s;var j=c.flag||"";var m=c.guard;m=new RegExp(m,j.replace(/[^gim]/g,""));var p=typeof c.fmt=="string"?this.tokenizeTmSnippet(c.fmt,"formatString"):c.fmt;var _=this;var t=s.replace(m,function(){var v=_.variables.__;_.variables.__=[].slice.call(arguments);var w=_.resolveVariables(p,e);var x="E";for(var i=0;i<w.length;i++){var c=w[i];if(typeof c=="object"){w[i]="";if(c.changeCase&&c.local){var y=w[i+1];if(y&&typeof y=="string"){if(c.changeCase=="u")w[i]=y[0].toUpperCase();else w[i]=y[0].toLowerCase();w[i+1]=y.substr(1);}}else if(c.changeCase){x=c.changeCase;}}else if(x=="U"){w[i]=c.toUpperCase();}else if(x=="L"){w[i]=c.toLowerCase();}}_.variables.__=v;return w.join("");});return t;};this.tmFormatFunction=function(s,c,e){if(c.formatFunction=="upcase")return s.toUpperCase();if(c.formatFunction=="downcase")return s.toLowerCase();return s;};this.resolveVariables=function(s,e){var c=[];var m="";var p=true;for(var i=0;i<s.length;i++){var t=s[i];if(typeof t=="string"){c.push(t);if(t=="\n"){p=true;m="";}else if(p){m=/^\t*/.exec(t)[0];p=/\S/.test(t);}continue;}if(!t)continue;p=false;if(t.fmtString){var j=s.indexOf(t,i+1);if(j==-1)j=s.length;t.fmt=s.slice(i+1,j);i=j;}if(t.text){var v=this.getVariableValue(e,t.text,m)+"";if(t.fmtString)v=this.tmStrFormat(v,t,e);if(t.formatFunction)v=this.tmFormatFunction(v,t,e);if(v&&!t.ifEnd){c.push(v);w(t);}else if(!v&&t.ifEnd){w(t.ifEnd);}}else if(t.elseEnd){w(t.elseEnd);}else if(t.tabstopId!=null){c.push(t);}else if(t.changeCase!=null){c.push(t);}}function w(t){var x=s.indexOf(t,i+1);if(x!=-1)i=x;}return c;};this.insertSnippetForSelection=function(e,s){var c=e.getCursorPosition();var m=e.session.getLine(c.row);var v=e.session.getTabString();var w=m.match(/^\s*/)[0];if(c.column<w.length)w=w.slice(0,c.column);s=s.replace(/\r/g,"");var y=this.tokenizeTmSnippet(s);y=this.resolveVariables(y,e);y=y.map(function(x){if(x=="\n")return x+w;if(typeof x=="string")return x.replace(/\t/g,v);return x;});var z=[];y.forEach(function(p,i){if(typeof p!="object")return;var C=p.tabstopId;var D=z[C];if(!D){D=z[C]=[];D.index=C;D.value="";D.parents={};}if(D.indexOf(p)!==-1)return;if(p.choices&&!D.choices)D.choices=p.choices;D.push(p);var F=y.indexOf(p,i+1);if(F===-1)return;var G=y.slice(i+1,F);var j=G.some(function(t){return typeof t==="object";});if(j&&!D.value){D.value=G;}else if(G.length&&(!D.value||typeof D.value!=="string")){D.value=G.join("");}});z.forEach(function(D){D.length=0;});var A={};function B(t){var x=[];for(var i=0;i<t.length;i++){var p=t[i];if(typeof p=="object"){if(A[p.tabstopId])continue;var j=t.lastIndexOf(p,i-1);p=x[j]||{tabstopId:p.tabstopId};}x[i]=p;}return x;}for(var i=0;i<y.length;i++){var p=y[i];if(typeof p!="object")continue;var C=p.tabstopId;var D=z[C];var F=y.indexOf(p,i+1);if(A[C]){if(A[C]===p){delete A[C];Object.keys(A).forEach(function(j){D.parents[j]=true;});}continue;}A[C]=p;var G=D.value;if(typeof G!=="string")G=B(G);else if(p.fmt)G=this.tmStrFormat(G,p,e);y.splice.apply(y,[i+1,Math.max(0,F-i)].concat(G,p));if(D.indexOf(p)===-1)D.push(p);}var I=0,J=0;var K="";y.forEach(function(t){if(typeof t==="string"){var j=t.split("\n");if(j.length>1){J=j[j.length-1].length;I+=j.length-1;}else J+=t.length;K+=t;}else if(t){if(!t.start)t.start={row:I,column:J};else t.end={row:I,column:J};}});var L=e.getSelectionRange();var M=e.session.replace(L,K);var N=new k(e);var O=e.inVirtualSelectionMode&&e.selection.index;N.addTabstops(z,L.start,M,O);};this.insertSnippet=function(e,s){var c=this;if(e.inVirtualSelectionMode)return c.insertSnippetForSelection(e,s);e.forEachSelection(function(){c.insertSnippetForSelection(e,s);},null,{keepOrder:true});if(e.tabstopManager)e.tabstopManager.tabNext();};this.$getScope=function(e){var s=e.session.$mode.$id||"";s=s.split("/").pop();if(s==="html"||s==="php"){if(s==="php"&&!e.session.$mode.inlinePhp)s="html";var c=e.getCursorPosition();var i=e.session.getState(c.row);if(typeof i==="object"){i=i[0];}if(i.substring){if(i.substring(0,3)=="js-")s="javascript";else if(i.substring(0,4)=="css-")s="css";else if(i.substring(0,4)=="php-")s="php";}}return s;};this.getActiveScopes=function(e){var s=this.$getScope(e);var c=[s];var i=this.snippetMap;if(i[s]&&i[s].includeScopes){c.push.apply(c,i[s].includeScopes);}c.push("_");return c;};this.expandWithTab=function(e,c){var s=this;var i=e.forEachSelection(function(){return s.expandSnippetForSelection(e,c);},null,{keepOrder:true});if(i&&e.tabstopManager)e.tabstopManager.tabNext();return i;};this.expandSnippetForSelection=function(e,c){var i=e.getCursorPosition();var j=e.session.getLine(i.row);var m=j.substring(0,i.column);var p=j.substr(i.column);var s=this.snippetMap;var t;this.getActiveScopes(e).some(function(v){var w=s[v];if(w)t=this.findMatchingSnippet(w,m,p);return!!t;},this);if(!t)return false;if(c&&c.dryRun)return true;e.session.doc.removeInLine(i.row,i.column-t.replaceBefore.length,i.column+t.replaceAfter.length);this.variables.M__=t.matchBefore;this.variables.T__=t.matchAfter;this.insertSnippetForSelection(e,t.content);this.variables.M__=this.variables.T__=null;return true;};this.findMatchingSnippet=function(c,e,j){for(var i=c.length;i--;){var s=c[i];if(s.startRe&&!s.startRe.test(e))continue;if(s.endRe&&!s.endRe.test(j))continue;if(!s.startRe&&!s.endRe)continue;s.matchBefore=s.startRe?s.startRe.exec(e):[""];s.matchAfter=s.endRe?s.endRe.exec(j):[""];s.replaceBefore=s.triggerRe?s.triggerRe.exec(e)[0]:"";s.replaceAfter=s.endTriggerRe?s.endTriggerRe.exec(j)[0]:"";return s;}};this.snippetMap={};this.snippetNameMap={};this.register=function(c,e){var i=this.snippetMap;var j=this.snippetNameMap;var m=this;if(!c)c=[];function w(s){if(s&&!/^\^?\(.*\)\$?$|^\\b$/.test(s))s="(?:"+s+")";return s||"";}function p(s,v,x){s=w(s);v=w(v);if(x){s=v+s;if(s&&s[s.length-1]!="$")s=s+"$";}else{s=s+v;if(s&&s[0]!="^")s="^"+s;}return new RegExp(s);}function t(s){if(!s.scope)s.scope=e||"_";e=s.scope;if(!i[e]){i[e]=[];j[e]={};}var v=j[e];if(s.name){var x=v[s.name];if(x)m.unregister(x);v[s.name]=s;}i[e].push(s);if(s.prefix)s.tabTrigger=s.prefix;if(!s.content&&s.body)s.content=Array.isArray(s.body)?s.body.join("\n"):s.body;if(s.tabTrigger&&!s.trigger){if(!s.guard&&/^\w/.test(s.tabTrigger))s.guard="\\b";s.trigger=l.escapeRegExp(s.tabTrigger);}if(!s.trigger&&!s.guard&&!s.endTrigger&&!s.endGuard)return;s.startRe=p(s.trigger,s.guard,true);s.triggerRe=new RegExp(s.trigger);s.endRe=p(s.endTrigger,s.endGuard,true);s.endTriggerRe=new RegExp(s.endTrigger);}if(Array.isArray(c)){c.forEach(t);}else{Object.keys(c).forEach(function(s){t(c[s]);});}this._signal("registerSnippets",{scope:e});};this.unregister=function(c,e){var j=this.snippetMap;var m=this.snippetNameMap;function p(s){var t=m[s.scope||e];if(t&&t[s.name]){delete t[s.name];var v=j[s.scope||e];var i=v&&v.indexOf(s);if(i>=0)v.splice(i,1);}}if(c.content)p(c);else if(Array.isArray(c))c.forEach(p);};this.parseSnippetFile=function(s){s=s.replace(/\r/g,"");var c=[],i={};var j=/^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm;var m;while(m=j.exec(s)){if(m[1]){try{i=JSON.parse(m[1]);c.push(i);}catch(e){}}if(m[4]){i.content=m[4].replace(/^\t/gm,"");c.push(i);i={};}else{var p=m[2],v=m[3];if(p=="regex"){var t=/\/((?:[^\/\\]|\\.)*)|$/g;i.guard=t.exec(v)[1];i.trigger=t.exec(v)[1];i.endTrigger=t.exec(v)[1];i.endGuard=t.exec(v)[1];}else if(p=="snippet"){i.tabTrigger=v.match(/^\S*/)[0];if(!i.name)i.name=v;}else if(p){i[p]=v;}}}return c;};this.getSnippetByName=function(c,e){var s=this.snippetNameMap;var i;this.getActiveScopes(e).some(function(j){var m=s[j];if(m)i=m[c];return!!i;},this);return i;};}).call(S.prototype);var k=function(e){if(e.tabstopManager)return e.tabstopManager;e.tabstopManager=this;this.$onChange=this.onChange.bind(this);this.$onChangeSelection=l.delayedCall(this.onChangeSelection.bind(this)).schedule;this.$onChangeSession=this.onChangeSession.bind(this);this.$onAfterExec=this.onAfterExec.bind(this);this.attach(e);};(function(){this.attach=function(e){this.index=0;this.ranges=[];this.tabstops=[];this.$openTabstops=null;this.selectedTabstop=null;this.editor=e;this.editor.on("change",this.$onChange);this.editor.on("changeSelection",this.$onChangeSelection);this.editor.on("changeSession",this.$onChangeSession);this.editor.commands.on("afterExec",this.$onAfterExec);this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler);};this.detach=function(){this.tabstops.forEach(this.removeTabstopMarkers,this);this.ranges=null;this.tabstops=null;this.selectedTabstop=null;this.editor.removeListener("change",this.$onChange);this.editor.removeListener("changeSelection",this.$onChangeSelection);this.editor.removeListener("changeSession",this.$onChangeSession);this.editor.commands.removeListener("afterExec",this.$onAfterExec);this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler);this.editor.tabstopManager=null;this.editor=null;};this.onChange=function(c){var e=c.action[0]=="r";var s=this.selectedTabstop||{};var p=s.parents||{};var t=(this.tabstops||[]).slice();for(var i=0;i<t.length;i++){var m=t[i];var v=m==s||p[m.index];m.rangeList.$bias=v?0:1;if(c.action=="remove"&&m!==s){var w=m.parents&&m.parents[s.index];var x=m.rangeList.pointIndex(c.start,w);x=x<0?-x-1:x+1;var y=m.rangeList.pointIndex(c.end,w);y=y<0?-y-1:y-1;var z=m.rangeList.ranges.slice(x,y);for(var j=0;j<z.length;j++)this.removeRange(z[j]);}m.rangeList.$onChange(c);}var A=this.editor.session;if(!this.$inChange&&e&&A.getLength()==1&&!A.getValue())this.detach();};this.updateLinkedFields=function(){var t=this.selectedTabstop;if(!t||!t.hasLinkedRanges||!t.firstNonLinked)return;this.$inChange=true;var s=this.editor.session;var c=s.getTextRange(t.firstNonLinked);for(var i=0;i<t.length;i++){var e=t[i];if(!e.linked)continue;var j=e.original;var m=a.snippetManager.tmStrFormat(c,j,this.editor);s.replace(e,m);}this.$inChange=false;};this.onAfterExec=function(e){if(e.command&&!e.command.readOnly)this.updateLinkedFields();};this.onChangeSelection=function(){if(!this.editor)return;var c=this.editor.selection.lead;var e=this.editor.selection.anchor;var j=this.editor.selection.isEmpty();for(var i=0;i<this.ranges.length;i++){if(this.ranges[i].linked)continue;var m=this.ranges[i].contains(c.row,c.column);var p=j||this.ranges[i].contains(e.row,e.column);if(m&&p)return;}this.detach();};this.onChangeSession=function(){this.detach();};this.tabNext=function(c){var m=this.tabstops.length;var i=this.index+(c||1);i=Math.min(Math.max(i,1),m);if(i==m)i=0;this.selectTabstop(i);if(i===0)this.detach();};this.selectTabstop=function(c){this.$openTabstops=null;var t=this.tabstops[this.index];if(t)this.addTabstopMarkers(t);this.index=c;t=this.tabstops[this.index];if(!t||!t.length)return;this.selectedTabstop=t;var e=t.firstNonLinked||t;if(t.choices)e.cursor=e.start;if(!this.editor.inVirtualSelectionMode){var s=this.editor.multiSelect;s.toSingleRange(e);for(var i=0;i<t.length;i++){if(t.hasLinkedRanges&&t[i].linked)continue;s.addRange(t[i].clone(),true);}}else{this.editor.selection.fromOrientedRange(e);}this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler);if(this.selectedTabstop&&this.selectedTabstop.choices)this.editor.execCommand("startAutocomplete",{matches:this.selectedTabstop.choices});};this.addTabstops=function(t,s,e){var c=this.useLink||!this.editor.getOption("enableMultiselect");if(!this.$openTabstops)this.$openTabstops=[];if(!t[0]){var p=R.fromPoints(e,e);q(p.start,s);q(p.end,s);t[0]=[p];t[0].index=0;}var i=this.index;var j=[i+1,0];var m=this.ranges;t.forEach(function(v,w){var x=this.$openTabstops[w]||v;for(var i=0;i<v.length;i++){var p=v[i];var y=R.fromPoints(p.start,p.end||p.start);n(y.start,s);n(y.end,s);y.original=p;y.tabstop=x;m.push(y);if(x!=v)x.unshift(y);else x[i]=y;if(p.fmtString||(x.firstNonLinked&&c)){y.linked=true;x.hasLinkedRanges=true;}else if(!x.firstNonLinked)x.firstNonLinked=y;}if(!x.firstNonLinked)x.hasLinkedRanges=false;if(x===v){j.push(x);this.$openTabstops[w]=x;}this.addTabstopMarkers(x);x.rangeList=x.rangeList||new f();x.rangeList.$bias=0;x.rangeList.addList(x);},this);if(j.length>2){if(this.tabstops.length)j.push(j.splice(2,1)[0]);this.tabstops.splice.apply(this.tabstops,j);}};this.addTabstopMarkers=function(t){var s=this.editor.session;t.forEach(function(c){if(!c.markerId)c.markerId=s.addMarker(c,"ace_snippet-marker","text");});};this.removeTabstopMarkers=function(t){var s=this.editor.session;t.forEach(function(c){s.removeMarker(c.markerId);c.markerId=null;});};this.removeRange=function(c){var i=c.tabstop.indexOf(c);if(i!=-1)c.tabstop.splice(i,1);i=this.ranges.indexOf(c);if(i!=-1)this.ranges.splice(i,1);i=c.tabstop.rangeList.ranges.indexOf(c);if(i!=-1)c.tabstop.splice(i,1);this.editor.session.removeMarker(c.markerId);if(!c.tabstop.length){i=this.tabstops.indexOf(c.tabstop);if(i!=-1)this.tabstops.splice(i,1);if(!this.tabstops.length)this.detach();}};this.keyboardHandler=new H();this.keyboardHandler.bindKeys({"Tab":function(e){if(a.snippetManager&&a.snippetManager.expandWithTab(e))return;e.tabstopManager.tabNext(1);e.renderer.scrollCursorIntoView();},"Shift-Tab":function(e){e.tabstopManager.tabNext(-1);e.renderer.scrollCursorIntoView();},"Esc":function(e){e.tabstopManager.detach();}});}).call(k.prototype);var n=function(p,c){if(p.row==0)p.column+=c.column;p.row+=c.row;};var q=function(p,s){if(p.row==s.row)p.column-=s.column;p.row-=s.row;};d.importCssString(".ace_snippet-marker {    -moz-box-sizing: border-box;    box-sizing: border-box;    background: rgba(194, 193, 208, 0.09);    border: 1px dotted rgba(211, 208, 235, 0.62);    position: absolute;}","snippets.css",false);a.snippetManager=new S();var u=r("./editor").Editor;(function(){this.insertSnippet=function(c,e){return a.snippetManager.insertSnippet(this,c,e);};this.expandSnippet=function(c){return a.snippetManager.expandWithTab(this,c);};}).call(u.prototype);});ace.define("ace/ext/emmet",[],function(r,a,m){"use strict";var H=r("../keyboard/hash_handler").HashHandler;var E=r("../editor").Editor;var s=r("../snippets").snippetManager;var R=r("../range").Range;var c=r("../config");var b,d;function A(){}A.prototype={setupContext:function(e){this.ace=e;this.indentation=e.session.getTabString();if(!b)b=window.emmet;var h=b.resources||b.require("resources");h.setVariable("indentation",this.indentation);this.$syntax=null;this.$syntax=this.getSyntax();},getSelectionRange:function(){var e=this.ace.getSelectionRange();var h=this.ace.session.doc;return{start:h.positionToIndex(e.start),end:h.positionToIndex(e.end)};},createSelection:function(e,h){var i=this.ace.session.doc;this.ace.selection.setRange({start:i.indexToPosition(e),end:i.indexToPosition(h)});},getCurrentLineRange:function(){var e=this.ace;var h=e.getCursorPosition().row;var l=e.session.getLine(h).length;var i=e.session.doc.positionToIndex({row:h,column:0});return{start:i,end:i+l};},getCaretPos:function(){var p=this.ace.getCursorPosition();return this.ace.session.doc.positionToIndex(p);},setCaretPos:function(i){var p=this.ace.session.doc.indexToPosition(i);this.ace.selection.moveToPosition(p);},getCurrentLine:function(){var e=this.ace.getCursorPosition().row;return this.ace.session.getLine(e);},replaceContent:function(v,e,h,n){if(h==null)h=e==null?this.getContent().length:e;if(e==null)e=0;var i=this.ace;var j=i.session.doc;var l=R.fromPoints(j.indexToPosition(e),j.indexToPosition(h));i.session.remove(l);l.end=l.start;v=this.$updateTabstops(v);s.insertSnippet(i,v);},getContent:function(){return this.ace.getValue();},getSyntax:function(){if(this.$syntax)return this.$syntax;var e=this.ace.session.$modeId.split("/").pop();if(e=="html"||e=="php"){var h=this.ace.getCursorPosition();var i=this.ace.session.getState(h.row);if(typeof i!="string")i=i[0];if(i){i=i.split("-");if(i.length>1)e=i[0];else if(e=="php")e="html";}}return e;},getProfileName:function(){var e=b.resources||b.require("resources");switch(this.getSyntax()){case"css":return"css";case"xml":case"xsl":return"xml";case"html":var p=e.getVariable("profile");if(!p)p=this.ace.session.getLines(0,2).join("").search(/<!DOCTYPE[^>]+XHTML/i)!=-1?"xhtml":"html";return p;default:var h=this.ace.session.$mode;return h.emmetConfig&&h.emmetConfig.profile||"xhtml";}},prompt:function(t){return prompt(t);},getSelection:function(){return this.ace.session.getTextRange();},getFilePath:function(){return"";},$updateTabstops:function(v){var e=1000;var z=0;var l=null;var t=b.tabStops||b.require('tabStops');var h=b.resources||b.require("resources");var i=h.getVocabulary("user");var j={tabstop:function(p){var q=parseInt(p.group,10);var u=q===0;if(u)q=++z;else q+=e;var w=p.placeholder;if(w){w=t.processText(w,j);}var x='${'+q+(w?':'+w:'')+'}';if(u){l=[p.start,x];}return x;},escape:function(p){if(p=='$')return'\\$';if(p=='\\')return'\\\\';return p;}};v=t.processText(v,j);if(i.variables['insert_final_tabstop']&&!/\$\{0\}$/.test(v)){v+='${0}';}else if(l){var n=b.utils?b.utils.common:b.require('utils');v=n.replaceSubstring(v,'${0}',l[0],l[1]);}return v;}};var k={expand_abbreviation:{"mac":"ctrl+alt+e","win":"alt+e"},match_pair_outward:{"mac":"ctrl+d","win":"ctrl+,"},match_pair_inward:{"mac":"ctrl+j","win":"ctrl+shift+0"},matching_pair:{"mac":"ctrl+alt+j","win":"alt+j"},next_edit_point:"alt+right",prev_edit_point:"alt+left",toggle_comment:{"mac":"command+/","win":"ctrl+/"},split_join_tag:{"mac":"shift+command+'","win":"shift+ctrl+`"},remove_tag:{"mac":"command+'","win":"shift+ctrl+;"},evaluate_math_expression:{"mac":"shift+command+y","win":"shift+ctrl+y"},increment_number_by_1:"ctrl+up",decrement_number_by_1:"ctrl+down",increment_number_by_01:"alt+up",decrement_number_by_01:"alt+down",increment_number_by_10:{"mac":"alt+command+up","win":"shift+alt+up"},decrement_number_by_10:{"mac":"alt+command+down","win":"shift+alt+down"},select_next_item:{"mac":"shift+command+.","win":"shift+ctrl+."},select_previous_item:{"mac":"shift+command+,","win":"shift+ctrl+,"},reflect_css_value:{"mac":"shift+command+r","win":"shift+ctrl+r"},encode_decode_data_url:{"mac":"shift+ctrl+d","win":"ctrl+'"},expand_abbreviation_with_tab:"Tab",wrap_with_abbreviation:{"mac":"shift+ctrl+a","win":"shift+ctrl+a"}};var f=new A();a.commands=new H();a.runEmmetCommand=function n(h){if(this.action=="expand_abbreviation_with_tab"){if(!h.selection.isEmpty())return false;var p=h.selection.lead;var t=h.session.getTokenAt(p.row,p.column);if(t&&/\btag\b/.test(t.type))return false;}try{f.setupContext(h);var i=b.actions||b.require("actions");if(this.action=="wrap_with_abbreviation"){return setTimeout(function(){i.run("wrap_with_abbreviation",f);},0);}var j=i.run(this.action,f);}catch(e){if(!b){var l=a.load(n.bind(this,h));if(this.action=="expand_abbreviation_with_tab")return false;return l;}h._signal("changeStatus",typeof e=="string"?e:e.message);c.warn(e);j=false;}return j;};for(var g in k){a.commands.addCommand({name:"emmet:"+g,action:g,bindKey:k[g],exec:a.runEmmetCommand,multiSelectAction:"forEach"});}a.updateCommands=function(e,h){if(h){e.keyBinding.addKeyboardHandler(a.commands);}else{e.keyBinding.removeKeyboardHandler(a.commands);}};a.isSupportedMode=function(e){if(!e)return false;if(e.emmetConfig)return true;var i=e.$id||e;return/css|less|scss|sass|stylus|html|php|twig|ejs|handlebars/.test(i);};a.isAvailable=function(h,g){if(/(evaluate_math_expression|expand_abbreviation)$/.test(g))return true;var i=h.session.$mode;var j=a.isSupportedMode(i);if(j&&i.$modes){try{f.setupContext(h);if(/js|php/.test(f.getSyntax()))j=false;}catch(e){}}return j;};var o=function(e,t){var h=t;if(!h)return;var i=a.isSupportedMode(h.session.$mode);if(e.enableEmmet===false)i=false;if(i)a.load();a.updateCommands(h,i);};a.load=function(e){if(typeof d!=="string"){c.warn("script for emmet-core is not loaded");return false;}c.loadModule(d,function(){d=null;e&&e();});return true;};a.AceEmmetEditor=A;c.defineOptions(E.prototype,"editor",{enableEmmet:{set:function(v){this[v?"on":"removeListener"]("changeMode",o);o({enableEmmet:!!v},this);},value:true}});a.setCore=function(e){if(typeof e=="string")d=e;else b=e;};});(function(){ace.require(["ace/ext/emmet"],function(m){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=m;}});})();
