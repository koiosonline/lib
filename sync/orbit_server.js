//process.env.LOG="debug" // debugging for orbitdb LOG=[debug|warn|error]
//process.env.DEBUG="*"   // debugging for IPFS
const ipfsClient = require('ipfs-http-client')  // start a seperate instance of IPFS(.exe) first
const OrbitDB = require('orbit-db')

async function main() {
    const ipfs = ipfsClient('http://192.168.1.40:5002') // 192.168.1.40 to prevent connection error
    console.log(`ipfs id=${(await ipfs.id()).id}`);
  
    const orbitdb = await OrbitDB.createInstance(ipfs,{ directory: './orbit_server' })   
    console.log(`orbitdb id=${orbitdb.id}`);    
    var accessController = { write: ["*"] }    
    const db = await orbitdb.docs('koiostest',{
        accessController:accessController,   
        meta: { name: 'test koios via diskstation' }// results in a different orbit database address       
    })    
    
    
    await db.load();
    ShowRecords()
    const address = db.address;    
    console.log(`address=${db.address.toString()}`);    
    
     db.events.on('replicated', ShowRecords)  // When the second database replicated new heads, query the database    
    
    async function ShowRecords() {
     const result = await db.query(() => true); // get all records
     console.log(JSON.stringify(result));
    console.log(`#records: ${result.length}`);  
    } 
    
     
    
    
}
main();


 

   