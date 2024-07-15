// src/aizenMenu.js
export const aizenMenu = [
    {
      title: 'All Categories',
      key: 'all Categories',
    },
    {
      title: 'Fresh Fruits',
      key: 'freshFruits',
      subItems: [
        { title: 'Apple', key: 'apple' },
        { title: 'orange', key: 'orange' }
        
      ]
    },
    {
      title: 'Fresh Vegetables',
      key: 'freshVegetables',
      subItems: [
        { title: 'Seller Request', key: 'sellerRequest' },
        { title: 'Manage Users', key: 'manageUsers' },
     
      ]
    },
    {
      title: 'Others', 
      key: 'others',
      subItems:[
        { title:'Add City', key:'addCity'},
        { title:'Add State',key:'addState'},
        { title:'Add Country',key:'addCountry'}
      ]
    }
  ];
  