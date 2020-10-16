const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://jasem123:jasem123@cluster0-21jug.mongodb.net/DataBaseApp1?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("open")
});

module.exports = mongoose;

// const userSchema = new mongoose.Schema({
//     username: String,
//     email: String,
//     password: String,
//     fcmToken: String,
//     isAdmin: Boolean
//   });


// const User = mongoose.model("User", userSchema);

// const productSchema = new mongoose.Schema({
//   title: String,
//   subTitle: String,
//   price: Number,
//   description: String,
//   image: String,
// });

// const Product = mongoose.model("Product", productSchema);


// module.exports = {
//     User,
//     Product
//   };