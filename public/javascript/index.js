const menu = document.querySelector('#menu');
const body = document.querySelector('body');
const posts = document.querySelectorAll('.post');
const categories = document.querySelectorAll('.categories');
const upvotes = document.querySelectorAll('.upvotes');

// --------------------navbar functionality----------------------------
document.querySelector('#menu-btn').addEventListener('click', () => {
  menu.classList.remove('hide');
  body.classList.add('overlay');
})

document.querySelector('.close-menu').addEventListener('click', () => {
  menu.classList.add('hide');
  body.classList.remove('overlay');
})

//---------------------filtering posts---------------------------------------
for (let i = 0; i < categories.length; i++) {
  categories[i].addEventListener('click', (e) => {
    let showPost = categories[i].innerText;
    filter(showPost);
  })
}

const showAll = document.querySelectorAll('.all');
for (all of showAll) {
  all.addEventListener('click', () => {
    for (post of posts) {
      post.style.display = 'block';
      menu.classList.add('hide');
      body.classList.remove('overlay');
    }
  })
}

// --------------------------upvotes for post ----------------------------------
// Everytime we click the upvote button, we will send a patch request to our server using axios
const upvoteForms = document.querySelectorAll('.upvoteForm');
for (let upvoteForm of upvoteForms) {

  upvoteForm.addEventListener('submit', async (e) => {
    e.preventDefault(); //this will prevent our page from refreshing when we click the upvote button

    let url = upvoteForm.action;
    let upvote = parseInt(upvoteForm.children[0].innerText) + 1;
    upvoteForm.children[0].innerHTML = `<i class="fas fa-chevron-up"> ${upvote}</i>`; //update votes in the page

    // updating votes in our DB by sending a patch request to our server
    await axios({
      method: 'patch',
      url: url,
      data: {
        votes: upvote
      }}).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
      });
  });
};

// --------------------------------sort-------------------------------------




// -----------------------------funtions----------------------------------------
function filter(show) {
  let myArray = Array.from(posts);

  myArray.filter((item) => {
    if (item.classList.contains(`${show}`)) {
      menu.classList.add('hide');
      body.classList.remove('overlay');
      return item.style.display = 'block';
    }
    item.style.display = 'none';
  })
}









// -/////////////////////////////
