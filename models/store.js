const mongoose =  require('mongoose');
const { Schema } = mongoose;
const storeSchema = new Schema({
    sid:String,
    name:String,
    location:String,
    owner:String,
    picture:String,
    contact:String
});

mongoose.model('stores',storeSchema);