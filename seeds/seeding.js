const Feedback = require('./../models/feedback');
const data = require('./data.json');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/product_feedback', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('connected to mongoose');
})
.catch((err) => {
  console.log('error with mongoose');
  console.log(err);
})

// console.log(data.productRequests[0].title);
createFeedbacks();

async function createFeedbacks() {
  await Feedback.deleteMany({});
  for(let i = 0; i < data.productRequests.length; i++) {
    const feedback = new Feedback({
      title: data.productRequests[i].title,
      category: data.productRequests[i].category,
      upvotes: data.productRequests[i].upvotes,
      description: data.productRequests[i].description,
      author: '6131326e76bc1e46a0f2e2e8'
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
