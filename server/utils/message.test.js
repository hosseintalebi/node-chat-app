const expect = require('expect')
const { generateMessage, generateLocationMessage } = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Hoss'
    const text = 'some message'
    const message = generateMessage(from, text)
    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({ from, text })
  })
  it('should generate correct location message object', () => {
    const from = 'Hoss'
    const lat = 1
    const lng = 2
    const url = `https://google.com/maps?q=${lat},${lng}`
    const locationMessage = generateLocationMessage(from, lat, lng)
    expect(locationMessage.createdAt).toBeA('number')
    expect(locationMessage).toInclude({from, url})
  })
})
