import axios from 'axios';

// create axios : Tạo ra một đối tượng axios
export const request = axios.create({
    baseURL: 'https://ig-food-menus.herokuapp.com/',
});
