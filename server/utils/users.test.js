const expect = require('expect')
const { Users } = require('./users.js')

describe('Users', () => {
  beforeEach(() => {
    users = new Users()
    users.users = [{
      id: '1',
      name: 'Hoss',
      room: 'React'
    }, {
      id: '2',
      name: 'Rio',
      room: 'React',
    }, {
      id: '3',
      name: 'Mike',
      room: 'Node'
    }]
  })
  it('shoud add user', () => {
    var users = new Users()
    var user = {
      id: '123',
      name: 'Hoss',
      room: 'Front End'
    }
    var resUser = users.addUser(user.id, user.name, user.room)
    expect(users.users).toEqual([user])
  })
  it('should remove a user', () => {
    var userId = '1'
    var user = users.removeUser(userId)
    expect(user.id).toBe(userId)
    expect(users.users.length).toBe(2)
  })
  it('should not remove user', () => {
    var userId = '99'
    var user = users.removeUser(userId)
    expect(user).toNotExist()
    expect(users.users.length).toBe(3)
  })
  it('should find user', () => {
    var userId = '2'
    var user = users.getUser(userId)
    expect(user.id).toBe(userId)
  })
  it('should not find user', () => {
    var userId = '99'
    var user = users.getUser(userId)
    expect(user).toNotExist()
  })
  it('should return names react room', () => {
    var userList = users.getUserList('React')
    expect(userList).toEqual(['Hoss', 'Rio'])
  })
  it('should return names node room', () => {
    var userList = users.getUserList('Node')
    expect(userList).toEqual(['Mike'])
  })
})
