const { copyFileSync } = require("fs");
const fs = require("fs/promises");

(async()=>{ 
   const CREATE_FILE="create a file"; 
   const DELETE_FILE="delete a file";
   const RENAME_FILE="rename the file";
   const ADD_TO_FILE="add to the file";




   const createFile=async(path)=>{
      try{
         const existingFileHandle=await fs.open(path,"r");
         existingFileHandle.close();

      }
      catch(e){
         const newFileHandle=await fs.open(path,"w");
         console.log("A new file was succesfully created.");
         newFileHandle.close();
      }

   };

   const deleteFile=async(path)=>{
      try{
         await fs.unlink(path);
         console.log("file deleted sucessfully");
      }
      catch(e){
         if(e.code===ENOENT){
            console.log("No File in path to delete");
         }
         else{
            console.log("Error while deleting the file");
         }
      }
   }


   const renameFile=(oldPath,newPath)=>{
      console.log(`Rename ${oldPath} to ${newPath}`);
      fs.rename(oldPath, newPath, (err) => {
         if (err) {
             console.error('Error renaming file:', err);
         } else {
             console.log('File renamed successfully');
         }
     });
   }


   const addToFile=async(path,content)=>{
      try{
         const fileHandle=await fs.open(path, "w");
         await fs.writeFile(fileHandle, content);
         console.log("File has been added")
      }catch(e){
         console.log("DAta is updated");
      }
   }

   const commandFilehandler=await fs.open("./command.txt","r");

   commandFilehandler.on("change",async()=>{
      const size=(await commandFilehandler.stat()).size;
      const buff=Buffer.alloc(size);
      const offset=0;
      const length=buff.byteLength;
      const position=0;
      await commandFilehandler.read(buff,offset,length,position);
      const command=buff.toString("utf-8");


      if(command.includes(CREATE_FILE)){
         const filepath=command.substring(CREATE_FILE.length+1);
         createFile(filepath);
      }

      //delete

      if(command.includes(DELETE_FILE)){
         const filepath=command.substring(DELETE_FILE.length+1);
         deleteFile(filepath);
      }

      //rename

      if(command.includes(RENAME_FILE)){
         const _idx=command.indexOf(" to ");
         const oldFilePath=command.substring(RENAME_FILE.length+1,_idx);
         const newFilePath=command.substring(_idx+4);
         renameFile(oldFilePath,newFilePath);
      }

      //Add File

      if(command.includes(ADD_TO_FILE)){
         const _idx=command.indexOf(" this content");
         console.log(_idx);
         const filepath=command.substring(ADD_TO_FILE.length+1,_idx);
         const content=command.substring(_idx+15);
         console.log(content);
         addToFile(filepath,content)
      }

   })
   const watcher=fs.watch("./command.txt");
   for await (const event of watcher){
      if(event.eventType==="change"){
        commandFilehandler.emit("change");
      }
   }
})();