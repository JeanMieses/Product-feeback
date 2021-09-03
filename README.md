# Frontend Mentor - Product feedback app solution

This is a solution to the [Product feedback app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-feedback-app-wbvUYqjR6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete product feedback requests
- Receive form validations when trying to create/edit feedback
- Filter suggestions by category
- Add comments and replies to a product feedback request
- Upvote product feedback requests

### Screenshot

![image](https://user-images.githubusercontent.com/71618218/132031910-90dd76d9-5adb-47fb-b0b5-6991bc4bcc8a.png)

### Links

- Solution URL: [https://github.com/JeanMieses/Product-feeback.git]
- Live Site URL: [https://productfeedbacks.herokuapp.com/feedbacks]

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Express](https://expressjs.com/) - Node.js framework
- [Passport] (http://www.passportjs.org/) - authentication for Node.js

### What I learned

I learned the basics about how to implement authentication in a web app by using passport to help me with register,
login, logout and persistent users' sessions. I learned about how Web Apps or web sites stored passwords in the Database.
We do not stored the password itself. WE run the user's password through a hashing function and we store the output from that hashing function.

I am proud of this block the code because I figured out a way to let users to upvote in any post.

``` upvoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let url = upvoteForm.action;
    let upvote = parseInt(upvoteForm.children[0].innerText) + 1;
    upvoteForm.children[0].innerHTML = `<i class="fas fa-chevron-up"> ${upvote}</i>`; //update votes in the page

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
```

### Continued development

  In the future, I will need to focus security and ErrorHandler since I did not implement any
  of that in this web app. Also, I could not figured out a way to order post by upvotes using JS.
  That is why the drop down is currently not working.

### Useful resources

- [Example resource 1](https://www.w3schools.com/howto/howto_css_animate_buttons.asp - This helped me
  with the buttons animation effect when we hover over them.

## Author

- github - [Jean C Mieses](https://github.com/JeanMieses)
- Frontend Mentor - [@JeanMieses](https://www.frontendmentor.io/profile/JeanMieses)
