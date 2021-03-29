async function loadPage () {
  const tweets = await $.get('/tweets')
  $('#tweets').empty()
  for (const tweet of tweets) {
    $('#tweets').append(`<p>${tweet.text}</p>`)
  }
}
loadPage()

$('button').on('click', async function () {
  const input = $('input').val()
  await $.post('/tweets', { text: input })
  loadPage()
})