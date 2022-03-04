const vm = new (require('vm2')).VM();

module.exports = function(code){
  let c;
  try {
    let evaled = vm.run(code);
    c = evaled;
  } catch (e) {
    c = e;
  } 
  return c;
}