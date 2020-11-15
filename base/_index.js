(function () {
  class Car {
    constructor(doors, engine, color) {
      this.doors = doors;
      this.engine = engine;
      this.color = color;
    }
  }

  class SUV extends Car {
    constructor(doors, engine, color) {
      super(doors, engine, color);
      this.douches = 1;
    }
  }

  class CarFactory {
    createCar(type) {
      switch (type) {
        case 'civic':
          return new Car(4, 'v6', 'red');
        case 'honda':
          return new Car(4, 'v8', 'blue');
      }
    }
  }

  class SUVFactory {
    createCar(type) {
      switch (type) {
        case 'cx5':
          return new SUV(4, 'v6', 'red');
        case 'santafe':
          return new SUV(4, 'v8', 'blue');
      }
    }
  }

  const carFac = new CarFactory();
  const suvFac = new SUVFactory();

  const autoManufacturer = function (type, model) {
    switch (type) {
      case 'car':
        return carFac.createCar(model);
      case 'SUV':
        return suvFac.createCar(model);
    }
  };
  const santafe = autoManufacturer('SUV', 'santafe');
  console.log(santafe);

  let carMixin = {
    startEngine() {
      console.log(`The ${this.engine} is starting`);
    },
  };

  Object.assign(Car.prototype, carMixin);
  const honda = autoManufacturer('car', 'honda');
  honda.startEngine();
})();
