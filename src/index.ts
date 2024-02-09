import { fetchInfo } from './module/info';
import { fetchPopular } from './module/popular';
import { search } from './module/search';

(async () => {
  const fetchedPopular = fetchPopular();
  const fetchedSearch = search('鬼滅の刃');
  const fetchedInfo = fetchInfo(
    'kimetsu-no-yaiba-movie-mugen-ressha-hen.D7hy7a'
  );
  console.log(await Promise.all([fetchedInfo, fetchedSearch, fetchedPopular]));
})();
