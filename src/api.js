import axios from 'axios';
import { 
  SEARCH_SERVER
} from './config';

export const fetchPlaceInfo = (keyword, coords) => {
  return axios.post(SEARCH_SERVER, {
    keyword,
    coords
  });
};