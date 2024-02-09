import { fetchInfo } from './module/info';
import { fetchPopular } from './module/popular';
import { search } from './module/search';

(async () => {
  const fetchedPopular = fetchPopular();
  const fetchedSearch = search('鬼滅の刃');
  const fetchedInfo = fetchInfo('overflow-uncensored.Xjqg7s');
  console.log(await Promise.all([fetchedInfo, fetchedSearch, fetchedPopular]));
})();
