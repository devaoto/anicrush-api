const AniCrush = require('../build').default;

const ani = new AniCrush();

(async () => {
  console.log(await ani.fetchPopular());
})();
