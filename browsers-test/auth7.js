var Module=typeof Module!=="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides={};var key;for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}var arguments_=[];var thisProgram="./this.program";var quit_=function(status,toThrow){throw toThrow};var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof process.versions==="object"&&typeof process.versions.node==="string";ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;var nodeFS;var nodePath;if(ENVIRONMENT_IS_NODE){if(ENVIRONMENT_IS_WORKER){scriptDirectory=require("path").dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=function shell_read(filename,binary){var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}if(!nodeFS)nodeFS=require("fs");if(!nodePath)nodePath=require("path");filename=nodePath["normalize"](filename);return nodeFS["readFileSync"](filename,binary?null:"utf8")};readBinary=function readBinary(filename){var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/")}arguments_=process["argv"].slice(2);if(typeof module!=="undefined"){module["exports"]=Module}quit_=function(status){process["exit"](status)};Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_SHELL){if(typeof read!="undefined"){read_=function shell_read(f){var data=tryParseAsDataURI(f);if(data){return intArrayToString(data)}return read(f)}}readBinary=function readBinary(f){var data;data=tryParseAsDataURI(f);if(data){return data}if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){arguments_=scriptArgs}else if(typeof arguments!="undefined"){arguments_=arguments}if(typeof quit==="function"){quit_=function(status){quit(status)}}if(typeof print!=="undefined"){if(typeof console==="undefined")console={};console.log=print;console.warn=console.error=typeof printErr!=="undefined"?printErr:print}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!=="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=function(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){readBinary=function(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}}}readAsync=function(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=function(title){document.title=title}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);for(key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime;if(Module["noExitRuntime"])noExitRuntime=Module["noExitRuntime"];if(typeof WebAssembly!=="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heap,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heap[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heap.subarray&&UTF8Decoder){return UTF8Decoder.decode(heap.subarray(idx,endPtr))}else{var str="";while(idx<endPtr){var u0=heap[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heap[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heap[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heap[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf)}var INITIAL_MEMORY=Module["INITIAL_MEMORY"]||16777216;var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;__ATINIT__.push({func:function(){___wasm_call_ctors()}});function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what+="";err(what);ABORT=true;EXITSTATUS=1;what="abort("+what+"). Build with -s ASSERTIONS=1 for more info.";var e=new WebAssembly.RuntimeError(what);throw e}function hasPrefix(str,prefix){return String.prototype.startsWith?str.startsWith(prefix):str.indexOf(prefix)===0}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return hasPrefix(filename,dataURIPrefix)}var fileURIPrefix="file://";function isFileURI(filename){return hasPrefix(filename,fileURIPrefix)}var wasmBinaryFile="data:application/octet-stream;base64,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IAIgACADIAIoAiQRAQAiBCADSQ0BIAAgA2ohACABIANrIQEgAigCFCEFCyAFIAAgARAMGiACIAIoAhQgAWo2AhQgASADaiEECyAECyIBAX8gAQRAA0AgACACahA3OgAAIAJBAWoiAiABRw0ACwsLAwABCxsAIABCADcDQCAAQgA3A0ggAEHwCEHAABAMGgu7AgACQCABQRRLDQACQAJAAkACQAJAAkACQAJAAkACQCABQQlrDgoAAQIDBAUGBwgJCgsgAiACKAIAIgFBBGo2AgAgACABKAIANgIADwsgAiACKAIAIgFBBGo2AgAgACABNAIANwMADwsgAiACKAIAIgFBBGo2AgAgACABNQIANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKQMANwMADwsgAiACKAIAIgFBBGo2AgAgACABMgEANwMADwsgAiACKAIAIgFBBGo2AgAgACABMwEANwMADwsgAiACKAIAIgFBBGo2AgAgACABMAAANwMADwsgAiACKAIAIgFBBGo2AgAgACABMQAANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKwMAOQMADwsgACACQQARAAALC0IBA38gACgCACwAABALBEADQCAAKAIAIgIsAAAhAyAAIAJBAWo2AgAgAyABQQpsakEwayEBIAIsAAEQCw0ACwsgAQtZAQF/IAAgAC0ASiIBQQFrIAFyOgBKIAAoAgAiAUEIcQRAIAAgAUEgcjYCAEF/DwsgAEIANwIEIAAgACgCLCIBNgIcIAAgATYCFCAAIAEgACgCMGo2AhBBAAsRACAARQRAQQAPCyAAIAEQKgsVACAARQRAQQAPC0GwIiAANgIAQX8LCAAgAEEgEBQLEAAgAEIANwIAIABCADcCCAs1AQJ/IAJBA3YiAwRAQQAhAgNAIAAgAkEDdCIEaiABIARqKQMAEDogAkEBaiICIANHDQALCwszAQF/IwBBwAVrIgIkACAAIAIQOyABIABBwAAQHiACQcAFEAogAEHQARAKIAJBwAVqJAALjAEBA39B3gghAEHeCC0AAEUEQEEADwsCQAJAA0AgAEEBaiIAQQNxRQ0BIAAtAAANAAsMAQsDQCAAIgFBBGohACABKAIAIgJBf3MgAkGBgoQIa3FBgIGChHhxRQ0ACyACQf8BcUUEQCABQd4Iaw8L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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}else{throw"both async and sync fetching of the wasm failed"}}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch==="function"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(wasmBinaryFile)})}else{if(readAsync){return new Promise(function(resolve,reject){readAsync(wasmBinaryFile,function(response){resolve(new Uint8Array(response))},reject)})}}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={"a":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["g"];updateGlobalBufferAndViews(wasmMemory.buffer);wasmTable=Module["asm"]["h"];removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiatedSource(output){receiveInstance(output["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming==="function"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&typeof fetch==="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiatedSource,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiatedSource)})})}else{return instantiateArrayBuffer(receiveInstantiatedSource)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return{}}var ASM_CONSTS={1968:function(){return Module.getRandomValue()},2006:function(){if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback(Module);continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){wasmTable.get(func)()}else{wasmTable.get(func)(callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}function ___assert_fail(condition,filename,line,func){abort("Assertion failed: "+UTF8ToString(condition)+", at: "+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])}function _abort(){abort()}function _emscripten_asm_const_int(code,sigPtr,argbuf){var args=readAsmConstArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}var SYSCALLS={mappings:{},buffers:[null,[],[]],printChar:function(stream,curr){var buffer=SYSCALLS.buffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}},varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret},get64:function(low,high){return low}};function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];for(var j=0;j<len;j++){SYSCALLS.printChar(fd,HEAPU8[ptr+j])}num+=len}HEAP32[pnum>>2]=num;return 0}function setErrNo(value){HEAP32[___errno_location()>>2]=value;return value}function _sysconf(name){switch(name){case 30:return 16384;case 85:var maxHeapSize=2147483648;return maxHeapSize/16384;case 132:case 133:case 12:case 137:case 138:case 15:case 235:case 16:case 17:case 18:case 19:case 20:case 149:case 13:case 10:case 236:case 153:case 9:case 21:case 22:case 159:case 154:case 14:case 77:case 78:case 139:case 82:case 68:case 67:case 164:case 11:case 29:case 47:case 48:case 95:case 52:case 51:case 46:return 200809;case 27:case 246:case 127:case 128:case 23:case 24:case 160:case 161:case 181:case 182:case 242:case 183:case 184:case 243:case 244:case 245:case 165:case 178:case 179:case 49:case 50:case 168:case 169:case 175:case 170:case 171:case 172:case 97:case 76:case 32:case 173:case 35:case 80:case 81:case 79:return-1;case 176:case 177:case 7:case 155:case 8:case 157:case 125:case 126:case 92:case 93:case 129:case 130:case 131:case 94:case 91:return 1;case 74:case 60:case 69:case 70:case 4:return 1024;case 31:case 42:case 72:return 32;case 87:case 26:case 33:return 2147483647;case 34:case 1:return 47839;case 38:case 36:return 99;case 43:case 37:return 2048;case 0:return 2097152;case 3:return 65536;case 28:return 32768;case 44:return 32767;case 75:return 16384;case 39:return 1e3;case 89:return 700;case 71:return 256;case 40:return 255;case 2:return 100;case 180:return 64;case 25:return 20;case 5:return 16;case 6:return 6;case 73:return 4;case 84:{if(typeof navigator==="object")return navigator["hardwareConcurrency"]||1;return 1}}setErrNo(28);return-1}var readAsmConstArgsArray=[];function readAsmConstArgs(sigPtr,buf){readAsmConstArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){var double=ch<105;if(double&&buf&1)buf++;readAsmConstArgsArray.push(double?HEAPF64[buf++>>1]:HEAP32[buf]);++buf}return readAsmConstArgsArray}var ASSERTIONS=false;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){if(ASSERTIONS){assert(false,"Character code "+chr+" ("+String.fromCharCode(chr)+")  at offset "+i+" not in 0x00-0xFF.")}chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}var decodeBase64=typeof atob==="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE==="boolean"&&ENVIRONMENT_IS_NODE){var buf;try{buf=Buffer.from(s,"base64")}catch(_){buf=new Buffer(s,"base64")}return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var asmLibraryArg={"f":___assert_fail,"e":_abort,"b":_emscripten_asm_const_int,"c":_emscripten_memcpy_big,"a":_fd_write,"d":_sysconf};var asm=createWasm();var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return(___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["i"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["j"]).apply(null,arguments)};var ___errno_location=Module["___errno_location"]=function(){return(___errno_location=Module["___errno_location"]=Module["asm"]["k"]).apply(null,arguments)};var calledRun;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}var calledMain=false;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(args){var entryFunction=Module["_main"];var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exit(ret,true)}catch(e){if(e instanceof ExitStatus){return}else if(e=="unwind"){noExitRuntime=true;return}else{var toLog=e;if(e&&typeof e==="object"&&e.stack){toLog=[e,e.stack]}err("exception thrown: "+toLog);quit_(1,e)}}finally{calledMain=true}}function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0)return;function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain(args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}Module["run"]=run;function exit(status,implicit){if(implicit&&noExitRuntime&&status===0){return}if(noExitRuntime){}else{EXITSTATUS=status;exitRuntime();if(Module["onExit"])Module["onExit"](status);ABORT=true}quit_(status,new ExitStatus(status))}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;noExitRuntime=true;run();
