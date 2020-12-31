import { createBrowserHistory } from 'history';

require('dotenv').config({ silent: true });

export const history = createBrowserHistory();

export const dishes = [
  {
    id: '1',
    imageUrl: '/img/NIKE.jpg',
    name: 'kIET dang yeu vai chuong',
    category: 'DEADLINE',
    date: 'Apr 23, 2020',
    url: 'https://www.npmjs.com/package/react-share'
  },
  {
    id: '2',
    imageUrl: '/img/jordan.jpg',
    name: 'XYZ',
    category: 'LOW PRICE',
    date: 'July 24, 2020',
    url: 'https://www.npmjs.com/package/react-meta-tags',
  },
  {
    id: '3',
    imageUrl: '/img/M2KTekno.jpg',
    name: 'kIETTT',
    category: 'HIGH PRICE',
    date: 'Apr 23, 2020',
    url: 'https://www.npmjs.com/package/react-share'
  },
  {
    id: '4',
    imageUrl: '/img/Yeezy-Boost-350-V2-Tail-Light.png',
    name: 'XYZ',
    category: 'YEEZY',
    date: 'July 24, 2020',
    url: 'https://www.npmjs.com/package/react-meta-tags',
  }
]

export const dishes2 = [
  {
    id: '1',
    imageUrl: '/img/NIKE.jpg',
    name: 'kIET dang yeu',
    category: 'DEADLINE',
    url: 'https://www.npmjs.com/package/react-share',
    date: '3'
  },
  {
    id: '2',
    imageUrl: '/img/UltraBoostCusTie-Dye.jpg',
    name: 'XYZ',
    category: 'DEADLINE',
    url: 'https://www.npmjs.com/package/react-meta-tags',
    date: '3'
  },
  {
    id: '3',
    imageUrl: '/img/M2KTekno.jpg',
    name: 'kIETTT',
    category: 'HIGH PRICE',
    url: 'https://www.npmjs.com/package/react-share',
    date: '3'
  },
  {
    id: '4',
    imageUrl: '/img/YeezyBoost350.jpg',
    name: 'XYZ',
    category: 'YEEZY',
    date: 'July 24, 2020',
    url: 'https://www.npmjs.com/package/react-meta-tags',
  },
  {
    id: '5',
    imageUrl: '/img/jordan.jpg',
    name: 'XYZ',
    category: 'LOW PRICE',
    date: 'July 24, 2020',
    url: 'https://www.npmjs.com/package/react-meta-tags',
  },
  {
    id: '6',
    imageUrl: '/img/Yeezy-Boost-350-V2-Tail-Light.png',
    name: 'Kiet chao mn',
    category: 'YEEZY',
    date: '3'
  },
  {
    id: '7',
    imageUrl: '/img/SuperStar.jpg',
    name: 'tennnnn',
    category: 'HIGH PRICE',
    date: '3'
  },
  {
    id: '8',
    imageUrl: '/img/AirJordan6.jpg',
    name: 'AirJordan6',
    category: 'LOW PRICE',
    date: '3'
  },
  {
    id: '9',
    imageUrl: '/img/Jordan11Retro.jpg',
    name: 'Jordan11Retro',
    category: 'LOW PRICE',
    date: '3'
  },
  {
    id: '10',
    imageUrl: '/img/RetroAirJordan6.jpg',
    name: 'RetroAirJordan6',
    category: 'LOW PRICE',
    date: '3'
  }
]

export const getDish = async (name) => dishes.find(e => e.name === name)

export const getAllDiseds = () => dishes
export const getAllDishes = () => dishes2
// export const getDishesbyCategory = (category) => {
//   return new Promise(resolve => {
//     resolve(dishes2.filter(e => e.category === category))
//   })
// }
export const getDishesbyCategory = (category) => dishes2.filter(e => e.category === category)