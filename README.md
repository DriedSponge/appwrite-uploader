## Appwrite Uploader

This script make it easy to upload a mass amount of files to an
[Appwrite](https://appwrite.io) bucket. It's simple to use.

1. Clone the git repo: `git clone https://github.com/driedsponge/appwrite-uploader`
2. Install dependencies: `pnpm install` or `npm install`
3. Clone `example.env` to `.env` and fill out the configuration
with the details of your Appwrite project. If `DELETE_WHEN_DONE` is set to true,
the files will be deleted after all the uploads are complete.
4. Move the files you would like to upload into a directory named `uploads`. Make
sure it's in the root directory of the code.
5. Execute the script: `node index.js`.
6. You're done!