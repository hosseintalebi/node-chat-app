const expect = require('expect')

const { isRealString } = require('./validation.js')

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var res = isRealString(12)
    expect(res).toBe(false)
  });
  it('should reject string with only spaces', () => {
    var res = isRealString('    ')
    expect(res).toBe(false)
  })
  it('should allow strings with non space chars', () => {
    var res = isRealString('  hoss  ')
    expect(res).toBe(true)
  })
})
