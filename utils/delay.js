//Useful promise for waiting for a bit....
const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};

module.exports = delay;
