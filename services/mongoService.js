const mongoose = require('mongoose');
const Accounts = mongoose.model('accounts');
const Stores = mongoose.model('stores');
const Products = mongoose.model('products');
const Cart = mongoose.model('cart');
const Transaction = mongoose.model('transaction');
const crypto = require('crypto');
async function generateCard(){
    let max=9999;
    let min=1000;
    let card_number = (Math.floor(Math.random() * (+max - +min)) + +min)+''+(Math.floor(Math.random() * (+max - +min)) + +min)+''+(Math.floor(Math.random() * (+max - +min)) + +min);
    return await Accounts.find({card:card_number}).then(async (res)=>{
        if(res.length>0){
            console.log(res);
            return await generateCard();
        }
        else{
            console.log(card_number);
            return card_number;
        }
    });
}
module.exports = {
    register:async function(data){
        await generateCard().then(async (card)=>{
            console.log(card);
            await new Accounts({
                email : data.email,
                password : crypto.createHash('md5').update(data.password).digest("hex"),
                name:data.name,
                balance:0,
                card:card
             }).save();
        })
    },
    getUser:async function(email){
        console.log(email);
        return await Accounts.findOne({email:email},function(err,account){
            return account;
        });
        
    },
    saveStore:async function(data){
        return await new Stores({
            sid:crypto.createHash('md5').update(data.name+ new Date()).digest("hex"),
            name:data.name,
            location:data.location,
            owner:data.owner,
            picture:data.picture,
            contact:data.contact
        }).save().then(()=>{
            return true;
        });
         
    },
    saveProduct:async function(data){
        return await new Products({
            pid:crypto.createHash('md5').update(data.name+ new Date()).digest("hex"),
            name:data.name,
            picture:data.picture,
            price:data.price,
            detail:data.detail,
            sid:data.sid
        }).save().then(()=>{
            return true;
        });
         
    },
    getProductById:async function(pid){
        return await Products.find({pid:pid}).populate('productd').then(data=>{
            console.log(data);
            return data;
        })
    },
    getProducts:async function(skip){
        console.log(skip);
        return await Products.find({},null,{skip:skip,limit:7}).select('name price picture pid -_id').then(data=>{
            console.log(data);
            return data;
        })
    },
    getProductsByStore:async function(sid){
        return await Products.find({sid:sid},null,{limit:7}).select('name price picture pid -_id').then(data=>{
            console.log(data);
            return data;
        })
    },
    getStores:async function(skip){
        return await Stores.find({},null,{skip:skip,limit:5}).select('name location picture sid -_id').then(data=>{
            console.log(data);
            return data;
        })
    },
    updateProducts:async function(){
        return await Stores.find({}).then(data=>{
            for(let doc of data){
                doc.picture=doc.picture.replace('assests','assets');
                doc.save();
            }
            return data;
        })
    },
    addProductToCart:async function(data){
        return await new Cart({
            pid:data.pid,
            user_id:data.userid,
            count:1,
            buy:0
        }).save().then(()=>{
            return true;
        })
    },
    getCart:async function(data){
        return await Cart.findOne({pid:data.pid,user_id:data.userid,buy:0},function(err,cart){
            return cart;
        });
        
    },
    deleteProductFromCart:async function(data){
        return await Cart.deleteOne({_id:data.id}).then(()=>{
            return true;
        });
    },
    buy:async function(data){
        return await Cart.updateMany({user_id:data.userid},{buy:1}).then(()=>{
            return true;
        });
    },
    reward:async function(data){
        return await Accounts.findOne({_id:data.userid}).then((account)=>{
            console.log(account);
            account.balance = account.balance+data.reward
            account.save();
            return account;
        });
    },
    getCartByUser:async function(userid){
        
        return await Cart.find({user_id:userid,buy:0}).populate('prod').then(data=>{
            return data;
        });
    }
}