/*
1. Fix the bugs in the codes below, to make the console print out different numbers
from 0 to 100
 */

const printNum = () => {
  for (var i = 0; i <= 100; i++) {
    setTimeout(console.log(i), 1000);
  }
};

printNum();

/*
2. Given the array below:
myArr = ['12-24-2014', '09-2022-23', '12-30-2021', '08-02-2021', '07-15-2018', '2019-12-14', '2022-14-12']
the array above has serveral dates, written in order month-day-year
Write the code inside function fixDate(array) below to transform the array to new
format dates day-month-year
expected result: ['24-12-2014', '23-09-2022', '30-12-2021', '08-02-2021', '15-07-2018', '14-12-2019', '14-12-2022'] . 
You only need to produce the same array as expected result, no need to consider other 
possibility.
 */

let myArr = [
  "12-24-2014",
  "09-2022-23",
  "12-30-2021",
  "08-02-2021",
  "07-15-2018",
  "2019-12-14",
  "2022-14-12",
];
const fixDate = (array) => {
  let finalArray = [];

  for (var i = 0; i < array.length; i++) {
    const childArray = array[i].split("-");
    childArray.sort(function (a, b) {
      return a - b;
    });
    finalArray.push(`${childArray[1]}-${childArray[0]}-${childArray[2]}`);
  }
  return finalArray;
};
let newArr = fixDate(myArr);
console.log(newArr);

/*
3. Counter function
Write a counter funtion to print out in console the time difference between 2 given date
Expected result in the console: 11 days - 13 hours - 38 minutes - 20 seconds
*/
const dateFrom = new Date(500000);
const dateTo = new Date(1000000000);

const counter = (from, to) => {
  const days = dateTo.getDate() - dateFrom.getDate();
  const hours = dateTo.getHours() - dateFrom.getHours();
  const minutes = dateTo.getMinutes() - dateFrom.getMinutes();
  const seconds = dateTo.getSeconds() - dateFrom.getSeconds();

  return `${days} days - ${hours} hours - ${minutes} minutes - ${seconds} seconds`;
};
const timer = counter(dateFrom, dateTo);
console.log(timer);

/* 
4. Check the url and read documentation: https://restcountries.com
- Write a function to get all countries, sorted in alphabetical order
- Write a function to find one country based on the search input
The data fetched from url should be displayed in index.html.
*/

const getAllCountries = () => {
  const url = "https://restcountries.com/v3.1/all";
  const countries = [];
  const result = async (url) => {
    const data = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.map((res) => {
          countries.push(res.name.common);
        });
        countries.sort();
        for (var i = 0; i < countries.length; i++) {
          document.getElementById(
            "country"
          ).innerHTML += `<div class="border">${countries[i]}</div>`;
        }
      });
  };
  result(url);
};

const getSingleCountry = () => {
  var country = document.getElementById("getSingleCountry").value;
  const url = `https://restcountries.com/v3.1/name/${country}`;

  const result = async (url) => {
    const data = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.map((res) => {
          document.getElementById("getCountry").innerHTML = res.name.common;
          console.log(res.name.common);
        });
      });
  };
  result(url);
};

getAllCountries();

/*
5. Provide logic for function generateNewFolderName, which receive an array as argument. Everytime the function gets called,
it should check for folder name. If the folder named 'New Folder' does not exist, it should add the name 'New Folder' to array.
If folder 'New Folder' exists, it should add 'New Folder (1)' to array. If 'New Folder (1)' exists, it should add 'New Folder (2)'
to array, and so on.
*/

const generateNewFolderName = (existingFolders) => {
  const arrayLength = existingFolders.length;
  const newFolder = `New Folder (${arrayLength})`;
  const isFolderExisted = existingFolders.includes(newFolder);

  if (existingFolders.length < 1) {
    existingFolders.push("New Folder");
  } else if (isFolderExisted == false) {
    existingFolders.push(newFolder);
  }
};

let folder = [];
generateNewFolderName(folder);
generateNewFolderName(folder);
generateNewFolderName(folder);
generateNewFolderName(folder);
console.log(folder); //expect to see ['New Folder', 'New Folder (1)', 'New Folder (2)', 'New Folder (3)']

/* 
6. Complete class Book:
- class Book should have 3 properties: title (read-only, must be a string but cannot be empty), cost (private, must be positive number) 
  and profit (private, positive number > 0 and =< 0.5)
(error should be thrown if data is not valid)
- give the logic to get book's price and profit separately.
- give the logics to increase and decrease the price with a certain amount 
- give the logic to calculate price based on cost and profit. For example: cost 14, profit 0.3 => expected price is 20.

Complete class TaxableBook: 
- inherit Book, but have 1 more private parameter in the constructor: taxRate. 
- give the logic to calculate price with taxRate. For example: 
cost 14, profit 0.3 , tax 24% => expected price is 30.43
*/
class Book {
  _title;
  constructor(title, cost, profit) {
    if ((title && title.length < 1) || cost <= 0 || profit >= 0.5 || profit <= 0) {
      throw Error("error");
    } else {
      this._title = title;
      this.profit = profit;
      this.cost = cost;
    }
  }
  bookPrice() {
    return this.cost / (1 - this.profit);
  }
  bookProfit() {
    return this.bookPrice() * this.profit;
  }
  priceIncrease() {
    return this.bookPrice() + 1;
  }
  priceDecrease() {
    return this.bookPrice() - 1;
  }
}
class TaxableBook extends Book {
  /* provide your code here */
  constructor(title, cost, profit, taxRate) {
    super();
    this.cost = cost;
    this.profit = profit;
    this.taxRate = taxRate;
  }

  priceWithTax() {
    return this.cost / (1 - this.profit - this.taxRate / 100);
  }
}

const book1 = new Book("The Power of Habits", 14, 0.3);
const book2 = new TaxableBook("The Power of Habits", 14, 0.3, 24);
