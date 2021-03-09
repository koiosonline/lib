
var ERC20TokenFactory = artifacts.require("ERC20TokenFactory");
var ERC20Token = artifacts.require("ERC20Token");


module.exports = async function(deployer) {  
    ERC20TokenFactoryContract = await ERC20TokenFactory.deployed()
  	NrTokens=await ERC20TokenFactoryContract.NrTokens();	
	//console.log(`NrTokens=${NrTokens}`);
	
	var ERC20TokenContract=[];
	for (var i=0;i<NrTokens;i++) {
		tokenaddress=await ERC20TokenFactoryContract.tokens(i);	
		ERC20TokenContract[i] = await ERC20Token.at(tokenaddress) // don't process directly => timeouts
	}	
	
	for (var i=0;i<NrTokens;i++) {
		name=await ERC20TokenContract[i].name()		
		//console.log(`Processing contract ${name}`)
        if (! (name=="Titan")) continue;
		console.log(`Name: ${name} address:${ERC20TokenContract[i].address}`);

	}
//console.log("end");
}  
