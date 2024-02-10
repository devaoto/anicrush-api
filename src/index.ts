import { fetchInfo } from './module/info';
import { fetchPopular } from './module/popular';
import { search } from './module/search';

(async () => {
  const fetchedPopular = fetchPopular();
  const fetchedSearch = search('鬼滅の刃');
  const fetchedInfo = await fetchInfo('classroom-of-the-elite-iii.O04Tut');
  console.log(fetchedInfo);
  console.log(await Promise.all([fetchedSearch, fetchedPopular]));
})();
