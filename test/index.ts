import AniCrush from '../build';

const ani = new AniCrush();

(async () => {
  console.log(await ani.fetchPopular());
})();
