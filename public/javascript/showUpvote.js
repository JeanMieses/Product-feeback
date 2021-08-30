const upvoteForms = document.querySelectorAll('.upvoteForm');
  for (let upvoteForm of upvoteForms) {

    upvoteForm.addEventListener('submit', async (e) => {
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
