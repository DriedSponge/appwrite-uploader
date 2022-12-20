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
    files.map((file)=>{
        console.log(`Preparing ${file}...`);
        let directory = `./uploads/${file}`
        storage.createFile(process.env.APPWRITE_BUCKET,file,InputFile.fromPath(directory, file)).then((res)=>{
            console.log(`Finished uploading ${file}.`)
        }).catch((err)=>{
                console.error(`Could not upload ${file}. ${err}`)
        })
    })
}

upload();