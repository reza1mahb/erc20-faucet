const prod = process.env.NODE_ENV === 'production';

module.exports = {
  'process.env.BACKEND_URL': prod ? '/erc20-faucet' : '123',
  'process.env.GITHUB_ID': 'e488dfd69ac2af535b44',
  'process.env.GITHUB_SECRET': 'a908ee46dcb11f3201b101a89427c748cc6a3630'
};
