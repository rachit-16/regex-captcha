const RandExp = require('randexp')

const getStrings = (regex, limit, timeout) => {
  regex = regex.substring(1, regex.length - 1)
  const set = new Set()
  const start = Date.now()
  let ctr = 0
  while (set.size < limit && Date.now() - start <= timeout) {
    const str = new RandExp(regex).gen()
    set.add(str)
    ctr++
    console.log(str, set.size, ctr)
  }

  return [...set]
}

module.exports = getStrings
