const fs = require("fs");
const sdk = require('node-appwrite')
const {InputFile} = require("node-appwrite");
require('dotenv').config()
async function upload(){
    const files = await fs.promises.readdir("./uploads");
    const client = new sdk.Client();
    client.setKey(process.env.APPWRITE_API_KEY)
    client.setEndpoint(process.env.APPWRITE_ENDPOINT)
    client.setProject(process.env.APPWRITE_PROJECT_ID)
    const storage = new sdk.Storage(client);
    let i = 1
    for (const file of files) {
        let progress = `${i}/${files.length}`
        console.log(`[${progress}] Preparing ${file}...`);
        let directory = `./uploads/${file}`
        try{
            await storage.createFile(process.env.APPWRITE_BUCKET,file,InputFile.fromPath(directory, file))
            console.log(`[${progress}] Finished uploading ${file}.`)
        }catch (e) {
            console.error(`Could not upload ${file}. ${e}`)
        }
        i++;

    }
    if(process.env.DELETE_WHEN_DONE) {
        let i = 1;
        for (const file of files) {
            let progress = `${i}/${files.length}`
            fs.unlinkSync(`./uploads/${file}`)
            console.log(`[${progress}] Deleted ${file}`)
        }
    }
    console.log("Done!")
}

upload();