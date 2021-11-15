const RandExp = require('randexp')

const getStrings = (regex, limit, timeout) => {
  regex = regex.substring(1, regex.length - 1)
  const set = new Set()
  const start = Date.now()

  while (set.size < limit && Date.now() - start <= timeout) {
    const str = new RandExp(regex).gen()
    set.add(str)
    console.log(str, set.size)
  }

  return [...set]
}

module.exports = getStrings
