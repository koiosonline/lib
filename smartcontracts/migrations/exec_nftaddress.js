var KOIOSNFT = artifacts.require("KOIOSNFT");
 
module.exports = async function(deployer) {  
  KOIOSNFTContract = await KOIOSNFT.deployed()
  console.log(`KOIOSNFTContract is at address:  ${KOIOSNFTContract.address}`);
  var total=await KOIOSNFTContract.totalSupply()
  console.log(`totalSupply is now:  ${total}`);
  
  var nrTemplates=await KOIOSNFTContract.nrTemplates()
    for (var i=0;i<nrTemplates;i++) {          
		var templateinfo = await KOIOSNFTContract.GetTemplateInfo(i);
		console.log(templateinfo);
    }
    
};

 