const mongoose =  require('mongoose');
const { Schema } = mongoose;
const productSchema = new Schema({
    pid:String,
    name:String,
    sid:String,
    picture:String,
    price:Number,
    detail:String
},{ toJSON: { virtuals: true } });
productSchema.virtual('productd', {
    ref: 'stores', // The model to use
    localField: 'sid', // Find people where `localField`
    foreignField: 'sid', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: true,
  // Query options, see http://bit.ly/mongoose-query-options
  });
  
mongoose.model('products',productSchema);