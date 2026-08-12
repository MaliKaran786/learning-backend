const fs =require("fs")

//fs.writeFileSync("./test.txt","Hello World")
// fs.writeFile("./test.txt","Async method called",(err)=>{})

// const result=fs.readFileSync("./new.txt","utf-8")
// console.log(result);

// fs.readFile("./new.txt","utf-8",(err,result)=>{
//   if(err){
//     console.log("Error: ",err);
//   }
//   else{
//     console.log(result);
//   }
// })

// fs.appendFileSync("./test.txt",new Date().getDate().toString());
fs.appendFileSync("./test.txt",`\n${Date.now()} Hey There`)

fs.cpSync("./test.txt","./copy.txt")
fs.unlinkSync("./copy.txt")