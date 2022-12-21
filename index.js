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
    for (let i = 0; i<files.length;i++) {
        let progress = `${i+1}/${files.length}`
        let file = files[i];
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
        for (let i = 0; i<files.length;i++) {
            let progress = `${i+1}/${files.length}`
            let file = files[i];
            fs.unlinkSync(`./uploads/${file}`)
            console.log(`[${progress}] Deleted ${file}`)
            i++
        }
    }
    console.log("Done!")
}

upload();