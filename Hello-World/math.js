function add(a,b){
  return a+b
}
function sub(a,b){
  return a-b
}
//this method to be used only once as it overwrites 
module.exports={
  add,
  sub,
};

//can be used multiple times
//exports.prod=(a,b)=>a*b;
//exports.sub=(a,b)=>a-b;