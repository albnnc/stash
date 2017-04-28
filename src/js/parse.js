export default function parse (data) {
  data = data
      .split('\n')
      .map(x => x.split('\t'))
      .filter(x => x != '')

  let names = data.shift()
  data = data.map(x => {
    let result = {}
    names.forEach((v, i) => {
      result[v] = x[i]
    })
    return result
  })

  // get list of unique asset numbers
  let output = []
  data.forEach(x => {
    let n = x['Asset Number']
    if (output.indexOf(n) === -1) {
      output.push(n)
    }
  })

  output = output.map(x => {
    let result = {
      assetNumber: x,
      times: 0,
      money: 0,
      lastSell: new Date(0)
    }
    for (let i = 0; i < data.length; ++i) {
      if (data[i]['Asset Number'] === x) {
        result.times++
        result.money += new Number(data[i]['Gross Royalty in USD'])
        let date = new Date(data[i]['Sales Date'])
        if (result.lastSell < date) {
          result.lastSell = date
        }
      }
    }
    result.money = new Number(result.money.toFixed(2))
    return result
  })

  output.sort((x, y) => {
    if (x.times < y.times) {
      return 1
    } else if (x.times > y.times) {
      return -1
    }
    return 0
  })

  return output
}
 