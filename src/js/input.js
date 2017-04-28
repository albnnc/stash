export default function input (input, button, callback) {
  // bind button
  button.click(() => { input.click() })

  // read file
  input.change(function () {
    let file = this.files[0]
    if (file) {
      let reader = new FileReader()
      reader.onload = (e) => {
        callback(reader.result)
      }
      reader.readAsText(file)
    }
  })
}
