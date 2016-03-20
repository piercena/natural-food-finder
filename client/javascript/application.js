const $ = require('jquery')

function appendResponse (response) {
  let resultDiv = $('.result')
  let form = $('.search-form')

  resultDiv.find('h2').text(response.term)
  resultDiv.find('p').text(response.reason)

  if (response.result) {
    resultDiv.toggleClass('negative', response.result)
  }

  form.find('input').prop('disabled', false)
}

$(function () {
  let form = $('.search-form')

  form.on('submit', (event) => {
    event.preventDefault()

    form.addClass('submitted')
    form.find('input').prop('disabled', true)

    let term = form.find('.search-term').val()

    $.ajax({
      url: '/search',
      method: 'get',
      data: { term },
      dataType: 'json',
      complete: function (response) {
        appendResponse(response.responseJSON)
      }
    })
  })
})
