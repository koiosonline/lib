const fetch = require('node-fetch');
const fs2 = require('fs');
const token = fs2.readFileSync(".figma").toString().trim();
const documentid = fs2.readFileSync(".figmadocument").toString().trim();


list=[];

// module.exports
var init = async function(deployer) {
    const IpfsHttpClient = require('ipfs-http-client')
    var ipfs = await IpfsHttpClient( /*"http://diskstation:5002"); */ 'https://ipfs.infura.io:5001'); //for infura node



async function MakeImage(ipfs, name,documentpart) {   
	console.log(`Find ${name} in figma`);
	var g=FindObject(name,documentpart);
	if (!g) return undefined;
	console.log(g.id);
	var imagelink = `https://api.figma.com/v1/images/${documentid}?ids=${g.id}&format=png`       
	var buffer=await FigmaApiGetImageSrc(imagelink,token)	
	var result= await ipfs.add(buffer)
	const image =result.path;  
	//console.log(image);
	
    var str=`
{
    "name": "${name}",
    "description": "${name} token",
    "image": "${image?"ipfs://ipfs/"+image:""}"
}
`   
    const cid = (await ipfs.add(str)).path;  
	console.log(cid);
	return cid;
}

init();

  