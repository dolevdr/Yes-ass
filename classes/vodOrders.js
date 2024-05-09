class VodOrders {
  constructor(vodRecords = []) {
    this.orders = vodRecords;
  }

  splittedRecords(order) {
    const splitted = order.split(",");
    const [userId, date, genere, __, price] = splitted;
    const dayMonth = date.substring(0, 7);
    return { userId, dayMonth, price, genere };
  }

  // Part 1
  // createTotalCustomerUsage() {
  //   const dict = {};
  //   for (let order of this.orders) {
  //     const { userId, dayMonth, price } = this.splittedRecords(order);
  //     const key = userId + "," + dayMonth;
  //     if (key in dict) {
  //       dict[key] = dict[key].price + +price;
  //     } else {
  //       dict[key] = price;
  //     }
  //   }
  //   console.log("Customer,Month,TotalPrice");
  //   for (let key in dict) {
  //     const [userId, dayMonth] = key.split(",");
  //     console.log(`${userId},${dayMonth},${isNaN(dict[key]) ? 0 : dict[key]}`);
  //   }
  // }

  // Part 2
  createTotalCustomerUsage() {
    const dict = {};
    for (let order of this.orders) {
      const { userId, dayMonth, price, genere } = this.splittedRecords(order);
      const key = userId + "," + dayMonth;
      if (key in dict) {
        dict[key] = {
          price: dict[key].price + +price,
          genere: {
            ...dict[key].genere,
            [genere]: (dict[key].genere[genere] || 0) + 1,
          },
        };
      } else {
        dict[key] = { price: +price, genere: { [genere]: 1 } };
      }
    }
    console.log("Customer,Month,TotalPrice,Discount");
    for (let key in dict) {
      const [userId, dayMonth] = key.split(",");
      console.log(
        `${userId},${dayMonth},${
          isNaN(dict[key].price) ? 0 : Math.round(dict[key].price)
        },${
          Object.keys(dict[key].genere).some(
            (gen) => dict[key].genere[gen] >= 3
          )
            ? Math.round(0.25 * dict[key].price)
            : 0
        }`
      );
    }
  }

  // Part 1
  // createSummaryReport() {
  //   const dict = {};
  //   for (let order of this.orders) {
  //     const { dayMonth, price } = this.splittedRecords(order);
  //     if (dayMonth in dict) {
  //       dict[dayMonth] = {
  //         amount: dict[dayMonth].amount++,
  //         price: dict[dayMonth].price + +price,
  //       };
  //     } else {
  //       dict[dayMonth] = { amount: 1, price: +price };
  //     }
  //   }
  //   console.log("Month,TotalPrice,AmountOfOrders");
  //   for (let key in dict) {
  //     console.log(
  //       `${key},${Math.round(dict[key].price) ?? 0},${dict[key].amount}`
  //     );
  //   }
  // }

  createSummaryReport() {
    const dict = {};
    for (let order of this.orders) {
      const { dayMonth, price, genere } = this.splittedRecords(order);
      if (dayMonth in dict) {
        dict[dayMonth] = {
          amount: dict[dayMonth].amount++,
          price: dict[dayMonth].price + +price,
          genere: {
            ...dict[dayMonth].genere,
            [genere]: (dict[dayMonth].genere[genere] || 0) + 1,
          },
        };
      } else {
        dict[dayMonth] = { price: +price, genere: { [genere]: 1 }, amount: 1 };
      }
    }
    console.log("Month,TotalPrice,AmountOfOrders,DiscountAmount");
    for (let key in dict) {
      console.log(
        `${key},${Math.round(dict[key].price) ?? 0},${dict[key].amount}${
          Object.keys(dict[key].genere).filter(
            (gen) => dict[key].genere[gen] >= 3
          ).length
        }`
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
//   "0238383,2024-04-01 18:54:23,COMEDY,5737227,00.90",
//   "0238383,2024-04-01 17:54:23,COMEDY,137227,19.90",
// ];

// const vodOrders = new VodOrders(orders);
// vodOrders.createTotalCustomerUsage();
// vodOrders.createSummaryReport();
