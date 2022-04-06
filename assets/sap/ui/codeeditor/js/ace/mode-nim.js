ace.define("ace/mode/nim_highlight_rules",[],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text_highlight_rules").TextHighlightRules;var N=function(){var k=this.createKeywordMapper({"variable":"var|let|const","keyword":"assert|parallel|spawn|export|include|from|template|mixin|bind|import|concept|raise|defer|try|finally|except|converter|proc|func|macro|method|and|or|not|xor|shl|shr|div|mod|in|notin|is|isnot|of|static|if|elif|else|case|of|discard|when|return|yield|block|break|while|echo|continue|asm|using|cast|addr|unsafeAddr|type|ref|ptr|do|declared|defined|definedInScope|compiles|sizeOf|is|shallowCopy|getAst|astToStr|spawn|procCall|for|iterator|as","storage.type":"newSeq|int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|float|char|bool|string|set|pointer|float32|float64|enum|object|cstring|array|seq|openArray|varargs|UncheckedArray|tuple|set|distinct|void|auto|openarray|range","support.function":"lock|ze|toU8|toU16|toU32|ord|low|len|high|add|pop|contains|card|incl|excl|dealloc|inc","constant.language":"nil|true|false"},"identifier");var h="(?:0[xX][\\dA-Fa-f][\\dA-Fa-f_]*)";var d="(?:[0-9][\\d_]*)";var a="(?:0o[0-7][0-7_]*)";var b="(?:0[bB][01][01_]*)";var i="(?:"+h+"|"+d+"|"+a+"|"+b+")(?:'?[iIuU](?:8|16|32|64)|u)?\\b";var c="(?:[eE][+-]?[\\d][\\d_]*)";var f="(?:[\\d][\\d_]*(?:[.][\\d](?:[\\d_]*)"+c+"?)|"+c+")";var g="(?:"+h+"(?:'(?:(?:[fF](?:32|64)?)|[dD])))|(?:"+f+"|"+d+"|"+a+"|"+b+")(?:'(?:(?:[fF](?:32|64)?)|[dD]))";var s="\\\\([abeprcnlftv\\\"']|x[0-9A-Fa-f]{2}|[0-2][0-9]{2}|u[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";var j='[a-zA-Z][a-zA-Z0-9_]*';this.$rules={"start":[{token:["identifier","keyword.operator","support.function"],regex:"("+j+")([.]{1})("+j+")(?=\\()"},{token:"paren.lparen",regex:"(\\{\\.)",next:[{token:"paren.rparen",regex:'(\\.\\}|\\})',next:"start"},{include:"methods"},{token:"identifier",regex:j},{token:"punctuation",regex:/[,]/},{token:"keyword.operator",regex:/[=:.]/},{token:"paren.lparen",regex:/[[(]/},{token:"paren.rparen",regex:/[\])]/},{include:"math"},{include:"strings"},{defaultToken:"text"}]},{token:"comment.doc.start",regex:/##\[(?!])/,push:"docBlockComment"},{token:"comment.start",regex:/#\[(?!])/,push:"blockComment"},{token:"comment.doc",regex:'##.*$'},{token:"comment",regex:'#.*$'},{include:"strings"},{token:"string",regex:"'(?:\\\\(?:[abercnlftv]|x[0-9A-Fa-f]{2}|[0-2][0-9]{2}|u[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})|.{1})?'"},{include:"methods"},{token:k,regex:"[a-zA-Z][a-zA-Z0-9_]*\\b"},{token:["keyword.operator","text","storage.type"],regex:"([:])(\\s+)("+j+")(?=$|\\)|\\[|,|\\s+=|;|\\s+\\{)"},{token:"paren.lparen",regex:/\[\.|{\||\(\.|\[:|[[({`]/},{token:"paren.rparen",regex:/\.\)|\|}|\.]|[\])}]/},{token:"keyword.operator",regex:/[=+\-*\/<>@$~&%|!?^.:\\]/},{token:"punctuation",regex:/[,;]/},{include:"math"}],blockComment:[{regex:/#\[]/,token:"comment"},{regex:/#\[(?!])/,token:"comment.start",push:"blockComment"},{regex:/]#/,token:"comment.end",next:"pop"},{defaultToken:"comment"}],docBlockComment:[{regex:/##\[]/,token:"comment.doc"},{regex:/##\[(?!])/,token:"comment.doc.start",push:"docBlockComment"},{regex:/]##/,token:"comment.doc.end",next:"pop"},{defaultToken:"comment.doc"}],math:[{token:"constant.float",regex:g},{token:"constant.float",regex:f},{token:"constant.integer",regex:i}],methods:[{token:"support.function",regex:"(\\w+)(?=\\()"}],strings:[{token:"string",regex:'(\\b'+j+')?"""',push:[{token:"string",regex:'"""',next:"pop"},{defaultToken:"string"}]},{token:"string",regex:"\\b"+j+'"(?=.)',push:[{token:"string",regex:'"|$',next:"pop"},{defaultToken:"string"}]},{token:"string",regex:'"',push:[{token:"string",regex:'"|$',next:"pop"},{token:"constant.language.escape",regex:s},{defaultToken:"string"}]}]};this.normalizeRules();};o.inherits(N,T);e.NimHighlightRules=N;});ace.define("ace/mode/folding/cstyle",[],function(r,e,a){"use strict";var o=r("../../lib/oop");var R=r("../../range").Range;var B=r("./fold_mode").FoldMode;var F=e.FoldMode=function(c){if(c){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+c.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+c.end));}};o.inherits(F,B);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(s,f,b){var l=s.getLine(b);if(this.singleLineBlockCommentRe.test(l)){if(!this.startRegionRe.test(l)&&!this.tripleStarBlockCommentRe.test(l))return"";}var c=this._getFoldWidgetBase(s,f,b);if(!c&&this.startRegionRe.test(l))return"start";return c;};this.getFoldWidgetRange=function(s,f,b,c){var l=s.getLine(b);if(this.startRegionRe.test(l))return this.getCommentRegionBlock(s,l,b);var m=l.match(this.foldingStartMarker);if(m){var i=m.index;if(m[1])return this.openingBracketBlock(s,m[1],b,i);var d=s.getCommentFoldRange(b,i+m[0].length,1);if(d&&!d.isMultiLine()){if(c){d=this.getSectionRange(s,b);}else if(f!="all")d=null;}return d;}if(f==="markbegin")return;var m=l.match(this.foldingStopMarker);if(m){var i=m.index+m[0].length;if(m[1])return this.closingBracketBlock(s,m[1],b,i);return s.getCommentFoldRange(b,i,-1);}};this.getSectionRange=function(s,b){var l=s.getLine(b);var c=l.search(/\S/);var d=b;var f=l.length;b=b+1;var g=b;var m=s.getLength();while(++b<m){l=s.getLine(b);var i=l.search(/\S/);if(i===-1)continue;if(c>i)break;var h=this.getFoldWidgetRange(s,"all",b);if(h){if(h.start.row<=d){break;}else if(h.isMultiLine()){b=h.end.row;}else if(c==i){break;}}g=b;}return new R(d,f,g,s.getLine(g).length);};this.getCommentRegionBlock=function(s,l,b){var c=l.search(/\s*$/);var d=s.getLength();var f=b;var g=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var h=1;while(++b<d){l=s.getLine(b);var m=g.exec(l);if(!m)continue;if(m[1])h--;else h++;if(!h)break;}var i=b;if(i>f){return new R(f,c,i,l.length);}};}).call(F.prototype);});ace.define("ace/mode/nim",[],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text").Mode;var N=r("./nim_highlight_rules").NimHighlightRules;var C=r("./folding/cstyle").FoldMode;var M=function(){T.call(this);this.HighlightRules=N;this.foldingRules=new C();this.$behaviour=this.$defaultBehaviour;};o.inherits(M,T);(function(){this.lineCommentStart="#";this.blockComment={start:"#[",end:"]#",nestable:true};this.$id="ace/mode/nim";}).call(M.prototype);e.Mode=M;});(function(){ace.require(["ace/mode/nim"],function(m){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=m;}});})();