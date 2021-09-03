const Feedback = require('./../models/feedback');
const data = require('./data.json');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://JeanProductFeedback:s7tex3GIscrXqQ2a@cluster0.v0j1k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('connected to mongoose');
})
.catch((err) => {
  console.log('error with mongoose');
  console.log(err);
})


createFeedbacks();

async function createFeedbacks() {
  await Feedback.deleteMany({});
  for(let i = 0; i < data.productRequests.length; i++) {
    const feedback = new Feedback({
      title: data.productRequests[i].title,
      category: data.productRequests[i].category,
      upvotes: data.productRequests[i].upvotes,
      description: data.productRequests[i].description,
      author: '61321f3525ff3c0016c10646'
    });

    await feedback.save()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  mongoose.connection.close()
}


async function seedComments() {}
