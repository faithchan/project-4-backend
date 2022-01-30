const usersSeed = [
  {
    username: 'helloworld',
    type: 'User',
    email: 'abc@123.com',
    password: 'abc123',
    walletAddress: '0x3eb9c5B92Cb655f2769b5718D33f72E23B807D24',
    tokensCreated: [0, 1],
    tokensOwned: [0, 1],
  },
  {
    username: 'helloworld2',
    type: 'Admin',
    email: 'abc@234.com',
    password: 'abc234',
    walletAddress: '0xe82d5C6B394D9C4dE32F0913e6cE82Dd8dc39226',
    tokensCreated: [2, 3],
    tokensOwned: [2, 3],
  },
]

module.exports = usersSeed
