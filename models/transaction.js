const mongoose =  require('mongoose');
const { Schema } = mongoose;
const transactionSchema = new Schema({
    user_id:String,
    pid:String,
    count:Number
},{ toJSON: { virtuals: true } });
transactionSchema.virtual('productd', {
    ref: 'products', // The model to use
    localField: 'pid', // Find people where `localField`
    foreignField: 'pid', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: true,
  // Query options, see http://bit.ly/mongoose-query-options
  });
mongoose.model('transaction',transactionSchema);