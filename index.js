const app = require('express')();
const bodyParser = require('body-parser');
const compile = require('./functions/compiler.js');
const eval = require('./functions/eval.js');
const constants = require('./utils/constants.js');

app.use(bodyParser.json());

app.use("/compiler/:type", function(req, res){
  if (req.params.type&&req.params.type==="typescript"){
    let c = req.body["typescript"] || req.body["code"];
      if (c){
        if (!("string"===typeof c)){
          res.status(400).json({message:constants["ERR_M_INV_C"]});
          return;
        };
        let compiled = compile(c);
        res.status(200).json({
          code: compiled
        });
        return true;
      } else {        res.status(400).json({message:constants["ERR_NULL_C"]});
          return;
      }
  } else {
    res.status(404).json({
      message: constants[P_N_F]
    });
    return;
  }
})

app.post('/eval', function(req, res){
  
})

app.listen(3000, () => console.log('SERVER RUNNING ON PORT 3000'));