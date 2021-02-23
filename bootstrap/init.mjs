console.log(`In ${window.location.href} starting script: ${import.meta.url}`);
console.log("This is init.mjs, located at https://koiosonline.github.io/lib/bootstrap/init.mjs")
 
var html=document.getElementsByTagName("html")[0]
console.log("Cleaned html");
html.removeAttribute("data-wf-domain") // remove webflow stuff
html.removeAttribute("data-wf-page")
html.removeAttribute("data-wf-site")
html.removeAttribute("class")

delete window.$   // delete traces from webflow
delete window.WebFont
delete window.Webflow
delete window.GoogleAnalyticsObject
delete window.ga
delete window.jQuery
delete window.google_tag_data
delete window.google_tag_manager
delete window.gaplugins
delete window.gaGlobal
delete window.gaData
delete window.datalayer
delete window.google_optimize
console.log(window)

// http://gpersoon.com/koios/lib/bootstrap/test.html
// dnslink=/ipfs/QmZEgAo2Su99vcSwCf14AGokucaPCcshxr8zK3fZ5fKjf5
// https://ipfs.io/ipns/koios.online
// https://ipfs.io/ipns/viewer.koios.online
// https://ipfs.io/ipns/viewer.test.koios.online
// c:\bin\dig +noall +answer TXT _dnslink.koios.online
// c:\bin\dig +noall +answer TXT _dnslink.viewer.koios.online
// c:\bin\dig +noall +answer TXT _dnslink.viewer.test.koios.online

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function MakeBlob(html,fjavascript) {
    var blob = new Blob([html], {type: (fjavascript?'text/javascript':'text/html')});
    var url = URL.createObjectURL(blob);      
    return url;
}   

// var ipfsurl="https://onderzoekjebuurt.nl/ipfs/"
// var ipfsurl="https://ipfs.io/ipfs/"
// var ipfsurl="https://ipfs.infura.io/ipfs/" //metamask mobile prefers this (otherwise cors error) 2020-9-28 ==> change in infura Clear-Site-Data header ==> switch to
// var ipfsurl="https://cloudflare-ipfs.com/ipfs/" // sometimes captha
//var ipfsurl="https://gateway.ipfs.io/ipfs/"
var ipfsurl="https://srv1.web3examples.com:8081/ipfs/"

async function start() { 
	console.log("start");
	fetch("https://koiosonline.github.io/lib/releasenotes.txt").then(console.log) // workaround so metamask mobile knows how to access github
		
	let url = (new URL(document.location));
	console.log(url)
    var split=url.pathname.split("/");
	console.log(split)
	var last=split[split.length-1]
	var beforelast=split[split.length-2]
	console.log(beforelast,last);
	
	var cid=url.searchParams.get("ipfs");   	
	if (!cid) {	
		var prod="https://koiosonline.github.io/lib/bootstrap"
		var test="https://gpersoon.com/koios/lib/bootstrap/test"
		var cidlocation=(beforelast=="test")?test:prod;
		var cidfile=last;
		switch (last) {
			case "viewer.test.koios.online": 							
												cidlocation=test;cidfile="newviewer";break;
			case "viewer.koios.online": 	 						 
			case "QmZEgAo2Su99vcSwCf14AGokucaPCcshxr8zK3fZ5fKjf5": 	 
			case "":
												cidlocation=prod;cidfile="newviewer";break;
		}
		
		var loadfile=cidlocation+"/"+cidfile
		console.log(`Loading config file ${loadfile}`)
		var result=await fetch(loadfile) 
		console.log(result);
		try { cid=(await result.text()).trim(); } catch (error) { console.log(error); }
	}
	console.log(`cid ${cid}`)
	if (cid) {
		var modulesource=(await (await FetchIPFS(/*ipfsurl+*/cid)).text()).trim();
		var tag="//--script--"
		var n = modulesource.indexOf(tag);
		if (n <0 ) { console.error("Can't find tag");return;} 
		modulesource = modulesource.substring(n+tag.length);		
		//console.log(modulesource);
		var url2=MakeBlob(modulesource,true);    
        var html=document.getElementsByTagName("html")[0]        
		let list = html.classList;
		console.log(list)
		for (var i=0;i<list.length;i++) {
			console.log(list[i])
			list.remove(list[i])
		}		
        console.log(html);        
		await import(url2);		
		html.removeAttribute("class")		 // try again
	}
	
	console.log("checking scripts")
	console.log(document)
	await sleep(1000)  // delete more traces from webflow
	var todelete=[]
	var scriptlist=document.getElementsByTagName("script")
	for (var i=0;i<scriptlist.length;i++) {
		if (scriptlist[i].outerHTML.includes("google-analytics"))
		   todelete.push(scriptlist[i])
	}
	for (var i=0;i<todelete.length;i++)
		todelete[i].parentNode.removeChild(todelete[i])
}

start();


let ipfsproviders=[ 
    "https://srv1.web3examples.com:8081/ipfs",
    "https://ipfs.io/ipfs",
 //   "https://gateway.ipfs.io/ipfs"
]; 

async function FetchIPFS(cid) {
    console.log("In FetchIPFS");
    console.log(cid)
    if (!cid) return undefined;		
	//cid=stripipfsprefix(cid)
    var urlarray=[];
    for (var i=0;i<ipfsproviders.length;i++) {
        var url=GetCidViaIpfsProvider(cid,i);
		urlarray.push(url)
	}
    try { var fetchresult=await FetchMultipleWithTimeout(urlarray,150000)    } catch(error) {console.log(error);}
    if (fetchresult && fetchresult.ok) return fetchresult; // found a working version     			
	return undefined;
}

function GetCidViaIpfsProvider(cid,nr) {
    var url=`${ipfsproviders[nr]}/${cid}`;    
    return url;  
}      


var statusarray=[]
var fetchcounter=0;
 async function FetchWithTimeout(url) {
     console.log("In FetchWithTimeout");
     console.log(url);
	const controller = new AbortController()
	var index = fetchcounter++
	statusarray[index]=url
	var fetchresult;
	const timeoutId = setTimeout(() => { console.log(`timeout ${url}`);controller.abort();}, 150000)
	try { 
		fetchresult=await fetch(url,{ /*signal: controller.signal,*/ cache: 'force-cache' });   // /index.json
	} catch (error) {console.log(`Fetch error ${url} ${error}`); }

	clearTimeout(timeoutId)
	
	if (!fetchresult || !fetchresult.ok) {
		statusarray[index]+=" not loaded"
        return undefined;    
    }
	
	statusarray[index] = ""
	return fetchresult;
}	
 
 async function FetchMultipleWithTimeout(urlarray,timeout) {   
    var promisearray=[]
    var controllerarray=[]
    console.log("In FetchMultipleWithTimeout")
console.log(urlarray)
    for (const item of urlarray) {
        const controller = new AbortController()
        controllerarray.push(controller)        
        try {var prom=fetch(item,{ /*signal: controller.signal, */cache: 'force-cache' }).catch( /*console.log*/ ) } catch(error) {console.log(error); }
        promisearray.push(prom)        
    }    

    promisearray.push(sleep(timeout).catch(console.log))
    var fetchresult=await Promise.race(promisearray).catch(console.log);
    for (let i=0;i<urlarray.length;i++) {         
        var checkready=await Promise.race([promisearray[i],undefined]).catch(console.log);           
        if (!checkready)
            controllerarray[i].abort()
    }
    return fetchresult;
}



/* code in webflow, in the Inside <head> tag:
<script>
var save=document.firstChild
while (document.firstChild) 
   document.removeChild(document.firstChild);
document.appendChild(save);   // restore the previous first child
var html=document.createElement("html")   
document.appendChild(html);
var head=document.createElement("head")
html.appendChild(head);
var body=document.createElement("body")
html.appendChild(body);
import("https://koiosonline.github.io/lib/bootstrap/init.mjs")
</script>

for test pages:
import("https://gpersoon.com/koios/lib/bootstrap/test/init.mjs")
*/
