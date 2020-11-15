(function () {
  class NewsCollection {
    constructor(...newsList) {
      this.newsList = newsList;
    }
    //Implementing iterator "by hand":
    [Symbol.iterator]() {
      let index = -1;
      const data = this.newsList;
      // iterator protocol must return an object with a "next" function that
      // returns an object with a value property and a "done" property "done"
      // will be set to true when there is no more data, so the last object
      // returned will be {data: undefined, done: true}
      return {
        next: function () {
          return { value: data[++index], done: index >= data.length };
        },
      };
    }

    // Using a generator:
    // *[Symbol.iterator]() {
    //   for (let news of this.newsList) {
    //     yield news;
    //   }
    // }

    // Or just using the built in js array iterator accessible with values() (or keys / entries)
    // [Symbol.iterator]() {
    //   return this.newsList.values();
    // }
  }

  const myNews = new NewsCollection('breaking!', 'awesome!', 'depressing!');
  for (let news of myNews) {
    // "of" consumes iterator automatically
    console.log(news);
  }
  /* Output: 
  breaking!
  awesome!
  depressing! */
})();
