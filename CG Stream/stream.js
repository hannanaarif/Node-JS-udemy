const {Readable}=require('stream');

const ReadableStream=new Readable({
    read(){}
});


ReadableStream.on('data',(chunk)=>{
    console.log('Data Comming: ',chunk.toString());
});

ReadableStream.push('Hello from Coder Gyan');