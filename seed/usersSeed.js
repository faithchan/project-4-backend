const usersSeed = [
  {
    username: 'helloworld',
    type: 'User',
    email: 'abc@123.com',
    password: 'abc123',
    walletAddress: '0x3eb9c5B92Cb655f2769b5718D33f72E23B807D24',
    followers: [
      '0xe82d5C6B394D9C4dE32F0913e6cE82Dd8dc39226',
      '0x78bCA437E8D6c961a1F1F7D97c81781044195bcF',
    ],
    following: [
      '0xe82d5C6B394D9C4dE32F0913e6cE82Dd8dc39226',
      '0x78bCA437E8D6c961a1F1F7D97c81781044195bcF',
    ],
  },
  {
    username: 'helloworld2',
    type: 'Admin',
    email: 'abc@234.com',
    password: 'abc234',
    walletAddress: '0xe82d5C6B394D9C4dE32F0913e6cE82Dd8dc39226',
    followers: [
      '0x3eb9c5B92Cb655f2769b5718D33f72E23B807D24',
      '0x78bCA437E8D6c961a1F1F7D97c81781044195bcF',
    ],
    following: [
      '0x3eb9c5B92Cb655f2769b5718D33f72E23B807D24',
      '0x78bCA437E8D6c961a1F1F7D97c81781044195bcF',
    ],
  },
]

module.exports = usersSeed
