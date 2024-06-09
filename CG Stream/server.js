const http=require('http');
const fs=require("fs");

const server=http.createServer((req,res)=>{
    if(req.url!=='/'){
        return res.end();
    }

    /*const file=fs.readFileSync('Nanna.mkv');

    return res.end(file);*/

    /*const readableStream=fs.createReadStream('sample.txt');

    readableStream.pipe(res);*/

    //copy big file using bad way

    /*const file=fs.readFileSync('sample.txt');
    fs.writeFileSync('output.txt',file);
    res.end();*/

    //copy big file using good way

    const readStream=fs.createReadStream('sample.txt');
    const writeStream=fs.createWriteStream('output.txt');

    readStream.on('data',(chunk)=>{
        console.log('chunk',chunk.toString());
        writeStream.write(chunk);
    })

    readStream.on('end',()=>{
        console.log("Reading complete");
        res.end('Data has been read and written to output.txt')
    }) 
    writeStream.on('error', (error) => {
        console.error('Error writing file:', error);
        res.status(500).end('Internal Server Error');
    });  
});

const PORT=process.env.PORT||5700;
server.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})
