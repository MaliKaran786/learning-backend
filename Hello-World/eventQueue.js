const fs=require("fs")
console.log("1");

const result=fs.readFileSync("new.txt","utf-8")
console.log(result)//blocking request
console.log("2");
console.log("3");
console.log("4");


console.log("______________");


console.log("1");
fs.readFile("test.txt","utf-8",(err,res)=>{
  if(err){
    console.log(err)
  }
  else{
    console.log(res)
  }
})//non-blocking request

console.log("2");
console.log("3");
console.log("4");

console.log("_______");
const os=require("os")
console.log(os.cpus().length);
