import {price_data, 
  firstDateOfMonth} from "./priceData"

export class Market {
  constructor(date) {
    this.date = date;
  }

  setDate(date) {
    this.date = date;
  }

  getCurrentDate() {
    return this.date;
  }

  getPrice(code) {
    return price_data[code]["close_price"][this.date];
  }

  static getPrice(code, date){
    return price_data[code]["close_price"][date];
  }

  static getMonthlyPriceList(code){
    const priceList = firstDateOfMonth.map(date => price_data[code]["close_price"][date])
    return priceList
  }

  static getMonthlyPriceListInRange(code, startDate, endDate) {
    const monthlyPriceList = this.getMonthlyPriceList(code);

    const startDateIdx = firstDateOfMonth.indexOf(startDate);
    const endDateIdx = firstDateOfMonth.indexOf(endDate);

    const slicedMonthlyPriceList = monthlyPriceList.slice(
      startDateIdx,
      endDateIdx + 1
    );

    return slicedMonthlyPriceList;
  }

  static getMonthlyReturns(code){
    const monthlyPriceList = Market.getMonthlyPriceList(code);
    
    const pctChangeList = [];

    monthlyPriceList.forEach((price, index) => {
      if (index === 0) return;

      const prePrice = monthlyPriceList[index - 1];
      const pctChange = ((price - prePrice) / prePrice) * 100;
      pctChangeList.push(pctChange);
    });

    return pctChangeList
  }

  static getMonthlyReturnsInRange(code, startDate, endDate) {
    const monthlyPriceList = Market.getMonthlyPriceListInRange(code, startDate, endDate);
    
    const pctChangeList = [];

    monthlyPriceList.forEach((price, index) => {
      if (index === 0) return;

      const prePrice = monthlyPriceList[index - 1];
      const pctChange = ((price - prePrice) / prePrice) * 100;
      pctChangeList.push(pctChange);
    });

    return pctChangeList
  }

  getPriceList(code) {
    return price_data[code]["close_price"];
  }

  getPctChange(code) {
    const closePriceObject = this.getPriceList(code);
    const dateList = Object.keys(closePriceObject);
    const closePriceList = Object.values(closePriceObject);
    const pctChangeList = [];

    closePriceList.map((price, index) => {
      if (index === 0) return null;

      const prePrice = closePriceList[index - 1];
      const pctChange = ((price - prePrice) / prePrice) * 100;
      pctChangeList.push(pctChange);

      return null;
    });

    const data = {};
    data["dateList"] = dateList.slice(1);
    data["pctChange"] = pctChangeList;

    return data;
  }

  getCumPctChange(code) {
    const closePriceObject = this.getPriceList(code);
    const dateList = Object.keys(closePriceObject);
    const closePriceList = Object.values(closePriceObject);
    const cumPctChangeList = [];

    const basePrice = closePriceList[0];
    closePriceList.map(price => {
      const pctChange = ((price - basePrice) / basePrice) * 100;
      cumPctChangeList.push(pctChange);
      return null;
    });

    const data = {};
    data["dateList"] = dateList.slice(1);
    data["pctChange"] = cumPctChangeList;

    return data;
  }

  getPriceListInRange(code, startDate, endDate) {
    const closePriceObject = this.getPriceList(code);
    const closePriceList = Object.values(closePriceObject);

    const dateList = Object.keys(closePriceObject);
    const startDateIdx = dateList.indexOf(startDate);
    const endDateIdx = dateList.indexOf(endDate);

    const slicedClosePriceList = closePriceList.slice(
      startDateIdx,
      endDateIdx + 1
    );

    return slicedClosePriceList;
  }

  getReturnsListInRange(code, startDate, endDate) {
    const closePriceList = this.getPriceListInRange(code, startDate, endDate);

    const returnsList = [];

    closePriceList.map((price, index) => {
      if (index === 0) return null;

      const prePrice = closePriceList[index - 1];
      const pctChange = ((price - prePrice) / prePrice) * 100;
      returnsList.push(pctChange);

      return null;
    });

    return returnsList;
  }

  getCumPctChangeInRange(code, startDate, endDate) {
    const closePriceObject = this.getPriceList(code);
    const closePriceList = Object.values(closePriceObject);

    const dateList = Object.keys(closePriceObject);
    const startDateIdx = dateList.indexOf(startDate);
    const endDateIdx = dateList.indexOf(endDate);

    const slicedClosePriceList = closePriceList.slice(
      startDateIdx,
      endDateIdx + 1
    );

    const cumPctChangeList = [];

    const basePrice = slicedClosePriceList[0];
    slicedClosePriceList.map(price => {
      const pctChange = ((price - basePrice) / basePrice) * 100;
      cumPctChangeList.push(pctChange);
      return null;
    });

    const data = {};
    data["dateList"] = dateList.slice(startDateIdx, endDateIdx + 1);
    data["pctChange"] = cumPctChangeList;

    return data;
  }
}

// console.log(Market.getPrice("069500", "20160303"))
console.log(Market.getMonthlyPriceList("069500"))
console.log(Market.getMonthlyPriceListInRange("069500", "20160303", "20160901"));
console.log(Market.getMonthlyReturns("069500"))
console.log(Market.getMonthlyReturnsInRange("069500", "20160303", "20160901"))

