Based on the (too brief and sometimes wrong) linkedin course "javascript patterns", the decent article found <a href="https://soshace.com/javascript-design-patterns-in-action/">https://soshace.com/javascript-design-patterns-in-action </a> and where mentioned below if noteworthy.

# Creational patterns
Control the creation process of an object

## Class design pattern
Just basic class creation and instantiation

    class Car {
      constructor(doors, engine, color) {
        this.doors = doors;
        this.engine = engine;
        this.color = color;
      }
    }
    const car = new Car(4, 'v8', 'blue');

## Constructor pattern
Just extending classes and delegating default parameters to super class

    class SUV extends Car {
      constructor(doors, engine, color) {
        super(doors, engine, color);
        this.douches = 1;
      }
    }
    const car = new Car(4, 'v8', 'blue');
    const mysuv = new SUV(4, 'v8', 'blue');
    console.trace(mysuv.douches);


## Singleton pattern
Allow only one instance of the class to be created  
Uses variable in containing scope (here: instance)  
See also **flyweight** pattern under **Structural patterns**

    let instance = null;
    class Car {
      constructor(doors, engine, color) {
        if (!instance) {
          this.doors = doors;
          this.engine = engine;
          this.color = color;
          instance = this;
        } else {
          return instance;
        }
      }
    }

    const car1 = new Car(4, 'v6', 'red');
    const car2 = new Car(8, 'v8', 'blue');
    console.log(car1); // Car {doors: 4, engine: "v6", color: "red"}
    console.log(car2); // ALSO Car {doors: 4, engine: "v6", color: "red"} - same object

## Factory pattern
Create new Objects through a factory Class  

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
      const carFac = new CarFactory();
      const civic = carFac.createCar('civic');
      console.log(civic); // Car {doors: 4, engine: "v6", color: "red"}

I think in JS this should rather be an object literal as objects don't need an explicit class template to be created unlike in Java - any reason for it being a class in the courses example?

    const carFactory = {
      createCar: function (type) {
        switch (type) {
          case 'civic':
            return new Car(4, 'v6', 'red');
          case 'honda':
            return new Car(4, 'v8', 'blue');
        }
      },
    };
    const civic = carFactory.createCar('honda');
    console.log(civic); // Car {doors: 4, engine: "v8", color: "blue"}

## Abstract factory pattern
Basically one more layer of abstraction to instantiate objects

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

# Structural patterns
- code organization

## Module pattern
- Organize code in pure functions
- importing / exporting as needed
- video shows just the usual node import / export stuff

## Mixins
Add functionality to existing objects / classes / prototypes outside its definition.

    let carMixin = {
      startEngine() {The Strategy pattern encapsulates alternative algorithms (or strategies) for a particular task. It allows a method to be swapped out at runtime by any other method (strategy) without the client realizing it. Essentially, Strategy is a group of algorithms that are interchangeable.
        console.log(`The ${this.engine} is starting`);
      },
    };

    Object.assign(Car.prototype, carMixin);

    const honda = autoManufacturer('car', 'honda');
    honda.startEngine(); // The v8 is starting

## Facade
Hiding complexity by creating a facade for the complex code  
Example: Frameworks like react, ReactDOM.render()...

## Flyweight
Avoids to create items twice, similar to singleton.  
Example:  
- Initialize an empty collection of characters.
- Letter 'E' is needed?
- If it already exists, retrieve that object from the collection, otherwise create a new letter 'E' and store it in the collection, to be re-used the next time.

**Flyweight** is reusing (obviously immutable) instances of a class wherever possible, rather than creating new instances of a class with the same "value", which saves CPU and memory.

**Singleton** is when there is only ever one instance of a (usually mutable) class. It is often used in multi-threaded environments to facilitate all threads using a single instance and "seeing" the same state.


## Decorator
Extend classes or functions with other code
Example (python):

    # this is the decorator function
    def log_function_call(func):
        def wrapper(*args, **kwargs):
            #print(f"{func.__name__} was called with args {args} and kwargs args {kwargs}")
            print(
                f'function {func.__name__} called with args {args} and kwargs {kwargs}')
            return func(*args, **kwargs)
        return wrapper


    @log_function_call
    def multiplyBy5(nr):  # this is the decorated function
        return 5 * nr


    print(multiplyBy5(12))
    # output:
    # function multiplyBy5 called with args (12,) and kwargs {}
    # 60

## MVC
Model View Controller  
Defines how application should be split
- Model = Data
- View = Visuals
- Controller = logic

View has access to both Controller and Models


## MVP
Model View Presenter  
- Model = Data
- View = Visuals
- Presenter = logic
View and Model has only access to Presenter

Model <--> Presenter <--> View  
Common pattern in Android development


## MVVM (or MVVC)
Model-View-View-Model

Model <--> View Model (stateful) <--> View (stateless)

Example: React
Model: where React connects to backend to get / write data
View Model: stateful components
View: Stateless view functions

# Behavioral Patterns
- focused on communication between objects in a system

## Observer pattern
An object (known as the subject) maintains a list of other objects (observers) that depend on it, automatically notifying them of any changes of the state. React.js is based on this pattern. 

https://dev.to/shadid12/how-i-reverse-engineered-rxjs-and-learned-reactive-programming-83k

## State pattern
Like reacts state management - one central state hold the information that components need to render; There can be multiple independent states or only locally necessary states of course.


## Chain of responsibility
Payload goes through a chain of functions; Common in node.js (middleware);  
Functional programming relevance (composition)?

## Iterator pattern
Standard iteration protocol, see comments

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


## Strategy pattern
"The Strategy pattern encapsulates alternative algorithms (or strategies) for a particular task. It allows a method to be swapped out at runtime by any other method (strategy) without the client realizing it. Essentially, Strategy is a group of algorithms that are interchangeable." (<a href="https://www.dofactory.com/javascript/design-patterns/strategy">https://www.dofactory.com/javascript/design-patterns/strategy</a>)
Example: Use different taxes depending on selected country on the fly for shipping

## Memento pattern
"Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later."  
(<a href="https://designpatternsgame.com/patterns/memento">https://designpatternsgame.com/patterns/memento</a>)

Example: json conversion to serialize and pass objects from and to server
## Mediator pattern

Classes communicate through a mediator object. This way classes don’t depend on each other directly which lowers the coupling.  
Example: Chatroom object works as a mediator between participant objects to exchange messages  
Example2: "Tower" acts as mediator between airplanes to exchange positions


## Command pattern
Encapsulating actions in objects (example: redux)
"Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations." (designpatternsgame.com)