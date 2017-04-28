import moment from 'moment'
import $ from 'jquery'

moment.locale('ru')

export default function output (data) {
  // compute tbody html
  let html = ''
  for (let i = 0; i < data.length; ++i) {
    html +=
      '<tr>' +
      '<th>' + (i + 1) + '</th>' +
      '<td>' +
        '<a target="_blank" href="http://istockphoto.com/illustrations/' +
        data[i].assetNumber + '">' + data[i].assetNumber + '</a></td>' +
      '<td>' + data[i].times + '</td>' +
      '<td>' + data[i].money + '</td>' +
      '<td>' + moment(data[i].lastSell).format('LL') + '</td>' +
      '</tr>'
  }

  // compute total numbers
  let totalTimes = 0
  let totalMoney = 0
  for (let i = 0; i < data.length; ++i) {
    totalTimes += data[i].times
    totalMoney += data[i].money
  }
  totalMoney = totalMoney.toFixed(2)

  // select correct form of word
  let digit = totalTimes % 10
  let word = ''
  if (digit === 1) {
    word = 'продажи'
  } else if (digit > 1 && digit < 5) {
    word = 'продажи'
  } else {
    word = 'продаж'
  }

  // set info
  $('#data tbody').html(html)
  $('#data h1').html('$' + totalMoney + ' за ' + totalTimes + ' ' + word)
  $('#data h2').html('в итоге')

  // show and scroll
  $('#data').removeAttr('hidden')
  $('html, body').animate({
    scrollTop: $('#data').offset().top
  }, 700)
}
