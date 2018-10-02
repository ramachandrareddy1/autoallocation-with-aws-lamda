let mongoose = require('mongoose');
let user=new  mongoose.Schema({name:String});

let model=mongoose.model('dummy',user);

mongoose.connect('mongodb://Abdul:Delinext008@cluster0-shard-00-00-wijyu.mongodb.net:27017,cluster0-shard-00-01-wijyu.mongodb.net:27017,cluster0-shard-00-02-wijyu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=false')
.then(()=>{console.log('db connected ');
  let dummy= new model({name:'rcrrr'});
  dummy.save().then((dara)=>{console.log(dara)}).catch((err)=>{console.log(err)})
})
.catch((err)=>{console.log(err)})