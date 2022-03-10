const ts = require('typescript');

module.exports = function(c)
{  
  let options = { compilerOptions: { module: ts.ModuleKind.CommonJS }};
  let e;
  try {
    e = ts.transpileModule(c, options).outputText;
  } catch (error){
    e = error;
  }
  return e;

}