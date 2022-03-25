const app = require('express')();
const bodyParser = require('body-parser');
const compile = require('./functions/compiler.js');
const eval = require('./functions/eval.js');
const constants = require('./utils/constants.js');

app.use(bodyParser.json());

app.get('/', (req,res) => {res.send('WELCOME')});
app.post("/compiler/typescript", function(req, res){
    let c = req.body["typescript"] || req.body["code"];
      if (c){
        if (!("string"===typeof c)){
          res.status(400).send({message:constants["ERR_M_INV_C"]});
          return;
        };
        let compiled = compile(c);
        res.status(200).send({
          code: compiled
        });
        return true;
      } else {        res.status(400).send({message:constants["ERR_NULL_C"]});
          return;
      }
})

app.post('/compiler/eval', function(req, res){
  let data = req.body.c;
  if (data){
    if ("string"===typeof data){
      let evaled;
      try{
        evaled = eval(data);
      } catch (e) {
        evaled = e;
      }
      res.send({evaled})
    } else {
      res.status(400).send({error: constants["ERR_M_INV_C"]});
    } 
  }/* else {
      res.status(400).send({error: constants["ERR_NULL_C"]});
    }*/
})
app.listen(3000, () => console.log('SERVER RUNNING ON PORT 3000'));