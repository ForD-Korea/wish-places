import axios from 'axios'; // http 통신을 위해서 axios라는 모듈을 사용합니다.
import { 
  SEARCH_SERVER // SEARC_SERVER는 검색을 위한 API 서버 URL이 담겨 있는 변수입니다.
} from './config';

export const fetchPlaceInfo = (keyword, coords) => {
  return axios.post(SEARCH_SERVER, {
    keyword,
    coords
  });
};