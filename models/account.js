const mongoose =  require('mongoose');
const { Schema } = mongoose;
const accountSchema = new Schema({
    email:String,
    password:String,
    card:Number,
    balance:Number,
    name:String
});

mongoose.model('accounts',accountSchema);