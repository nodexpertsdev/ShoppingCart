const menuItems = [
  { label: 'My Lists', icon: require('../Images/list.png'), action: 'MyOrderList' },
  { label: 'Products Catalogue', icon: require('../Images/gift.png'), action: 'ProductList' },
  { label: 'My Orders', icon: require('../Images/menu_orders.png'), action: 'MyOrder' },
  { label: 'Settings', icon: require('../Images/settings.png'), action: null },
  { label: 'Notification', icon: require('../Images/bell.png'), action: 'NotificationList' },
  { label: 'Legal (Terms & Privacy Policy)', icon: require('../Images/auction.png'), action: null },
  { label: 'Logout', icon: require('../Images/logout.png'), action: 'LOGOUT' },
];

export default menuItems;
