import '../scss/main.scss'

import $ from 'jquery'
import input from './input'
import parse from './parse'
import output from './output'

$(document).ready(function () {
  input(
    $('.hero input'),
    $('.hero .button'),
    (data) => {
      output(parse(data))
    }
  )
})
