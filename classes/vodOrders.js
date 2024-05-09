class VodOrders {
  constructor(vodRecords = []) {
    this.orders = vodRecords;
  }

  createTotalCustomerUsage() {
    const dict = {};
    for (let order of this.orders) {
      const splitted = order.split(",");
      const [userId, date, _, __, price] = splitted;
      const dayMonth = date.substring(0, 7);
      const key = userId + "," + dayMonth;
      if (key in dict) {
        dict[key] = dict[key].price + +price;
      } else {
        dict[key] = price;
      }
    }
    console.log("Customer,Month,TotalPrice");
    for (let key in dict) {
      const [userId, dayMonth] = key.split(",");
      console.log(`${userId},${dayMonth},${isNaN(dict[key]) ? 0 : dict[key]}`);
    }
  }

  createSummaryReport() {
    const dict = {};
    for (let order of this.orders) {
      const splitted = order.split(",");
      const [_, date, __, ___, price] = splitted;
      const dayMonth = date.substring(0, 7);
      if (dayMonth in dict) {
        dict[dayMonth] = {
          amount: dict[dayMonth].amount++,
          price: dict[dayMonth].price + +price,
        };
      } else {
        dict[dayMonth] = { amount: 1, price: +price };
      }
    }
    console.log("Month,TotalPrice,AmountOfOrders");
    for (let key in dict) {
      console.log(
        `${key},${Math.round(dict[key].price) ?? 0},${dict[key].amount}`
      );
    }
  }
}

//tests
// const orders = [
//   "0238383,2024-04-01 17:54:23,COMEDY,76737227,19.90",
//   "0218354,2024-04-04 12:54:23,COMEDY,87227,10.50",
//   "0338363,2024-04-02 13:56:23,ACTION,67667,19.90",
//   "0238322,2024-04-01 17:52:23,COMEDY,47227,30.90",
//   "0218354,2024-04-01 16:51:23,DRAMA,137227,19.90",
//   "0238385,2024-05-01 17:54:23,NEWS,96737227,19.90",
//   "0238322,2024-04-01 17:54:23,REALITY,96737227,29.90",
//   "0238383,2024-05-01 18:54:23,COMEDY,5737227,00.90",
//   "0238383,2024-05-01 17:54:23,ACTION,137227,19.90",
// ];

// const vodOrders = new VodOrders(orders);
// vodOrders.createTotalCustomerUsage();
// vodOrders.createSummaryReport();
