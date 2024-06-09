// const fs=require('node:fs/promises');
// console.time("writeMany");
// (async()=>{
//    const fileHandler=await fs.open("test.txt","w");
//    for(let i=0;i<1000000;i++){
//     await fileHandler.write(`${ i }`);
//    }
//    console.timeEnd("writeMany");
// })();
const fs = require('fs');

(async()=>{
   console.time("writeMany");
   const stream=fs.createWriteStream("test.txt");

  /* for(let i=0;i<1000000;i++){
      const buff=Buffer.from(` ${i} `,'utf-8')
      stream.write(buff);
   }*/
   console.log(stream.writableHighWaterMark);
   console.log(stream.writableLength);
   const buff=Buffer.alloc(16383,10);
   console.log(stream.write(buff));
   // console.timeEnd("writeMany");
   // console.log(stream.writableLength);

})();