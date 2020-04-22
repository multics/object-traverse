function debug(info) {
  if ((process.env.NODE_ENV || '').toLowerCase() === 'debug') {
    return console.log(info)
  }
  return () => { }
}

function isValue(obj) {
  return ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet', 'Array'].some(name => toString.call(obj) === `[object ${name}]` )
}

function type(obj) {
  return toString.call(obj).replace(/\[object (.*)\]/g, '$1').toLowerCase()
}

module.exports = function traverse(object) {
  const keys = {}
  let _keys
  try {
    _keys = Object.keys(object)
  } catch (ex) {
    return ''
  }

  _keys.forEach(key => {
    const o = object[key]
    debug(`check key[${key}]: ${JSON.stringify(o)}`)
    if (!isValue(o) && Object.keys(o).length > 0) {
      debug(`yes, there is more level.`)
      keys[key] = traverse(o)
    } else {
      debug(`no, it is a leaf: ${o}`)
      keys[key] = type(o)
    }
    debug(keys)
  })

  debug(keys)
  return keys
}
