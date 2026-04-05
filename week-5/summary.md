<img src="../assets/logo.png" width=30% />

<hr>
<span style="display:flex; justify-content: space-between;">
	<a href="../index.html">Home</a>   <a href="../week-4/summary.html">Week-4</a>    <a href="../week-6/summary.html">Week-6</a>    
</span> 
<hr>

# JAVA - Week 5

[TOC]

### Polymorphism

Polymorphism is a fundamental concept in object-oriented programming (OOP) and is a powerful mechanism that allows objects of different classes to be treated as if they were the same type. It usually refers to the effect of dynamic dispatch, which allow different classes to provide their own implementation of the same method.

Every object _knows_ what it needs to do.

##### Structural Polymorphism

Structural polymorphism in Java is the ability of different objects to be treated as if they were the same type, even if they are actually different. This is achieved through the use of inheritance, interfaces, and method overloading.

**Inheritance** allows a new class to be based on an existing class, inheriting its attributes and behaviors. This means that objects of the new class can be treated as if they were objects of the original class, and can be used interchangeably in many situations.

```java
class Animal {
   public void move() {
      System.out.println("Animals can move");
   }
}

class Dog extends Animal {
   public void move() {
      System.out.println("Dogs can walk and run");
   }
}

public class Test{
    public static void main(String[] args){
        Animal animal = new Animal();
		Animal dog = new Dog();
		animal.move(); // Output: Animals can move
        dog.move(); // Output: Dogs can walk and run

    }
}
```

**Interfaces** provide a way to define a common set of methods that different classes can implement. This means that objects of different classes that implement the same interface can be treated as if they were the same type, even though they are different classes.

```java
interface Shape {
   public void draw();
}

class Circle implements Shape {
   public void draw() {
      System.out.println("Drawing a circle");
   }
}

class Square implements Shape {
   public void draw() {
      System.out.println("Drawing a square");
   }
}
public class Test{
    public static void main(String[] args){
        Shape shape1 = new Circle();
        Shape shape2 = new Square();
		shape1.draw(); // Output: Drawing a circle
		shape2.draw(); // Output: Drawing a square

    }
}
```

**Method overloading** allows multiple methods with the same name to be defined in a class, each with different parameters. This means that different methods can be called with the same name, depending on the type and number of parameters passed to them.

```java
class Calculator {
   public int add(int a, int b) {
      return a + b;
   }

   public int add(int a, int b, int c) {
      return a + b + c;
   }
}
public class Test{
    public static void main(String[] args){
        Calculator calculator = new Calculator();
		System.out.println(calculator.add(1, 2)); // Output: 3
		System.out.println(calculator.add(1, 2, 3)); // Output: 6

    }
}
```

##### Polymorphic Functions

Methods which depends on specific capabilities of an object are known as polymorphic functions. It can work with any object as long as it possesses the capability that this method requires in order to work.

```java
interface Shape {
    public double area();
}

class Circle implements Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    public double area() {
        return Math.PI * radius * radius;
    }
}

class Rectangle implements Shape {
    private double length;
    private double width;

    public Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }

    public double area() {
        return length * width;
    }
}

public class Test {
    public static void printArea(Shape shape) {
        System.out.println("Area: " + shape.area());
    }

    public static void main(String[] args) {
        Circle circle = new Circle(5);
        Rectangle rectangle = new Rectangle(4, 6);

        printArea(circle);
        printArea(rectangle);
    }
}
```

Here, the `printArea` method is a polymorphic method as it can work with objects of any type, as long as `area` method is defined on that object.

**Type Consistency**

However, we need to impose certain restrictions in case of some methods. Let's take an example of a polymorphic method to copy an array. It takes a source array and a target array and then copies elements from the source to the target array.

```java
public static void copyArray(Object[] source, Object[] target) {
    int limit = Math.min(src.length,tgt.length);
    for (int i = 0; i < limit; i++) {
        target[i] = source[i];
    }
}
```

Now, we need to ensure that the source array can be a subtype of target array but not the vice versa. Target array should be type compatible with the source array.

##### Polymorphic Data Structures

A polymorphic data structure stores values of type Object which allows us to store arbitrary elements in that data structure. A simple example is as follows:

```java
public class LinkedList {
    private Node head;

    private class Node {
        Object data;
        Node next;

        public Node(Object data) {
            this.data = data;
            this.next = null;
        }
    }

    public void add(Object data) {
        if (head == null) {
            head = new Node(data);
        } else {
            Node current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = new Node(data);
        }
    }

    public Object get(int index) {
        Node current = head;
        for (int i = 0; i < index; i++) {
            if (current == null) {
                return null;
            }
            current = current.next;
        }
        return current.data;
    }

    public boolean remove(int index) {
        //...
    }
}
```

This LinkedList stores data elements which are of type `Object`, which means it can store data of any type.

The potential issues that may arise as a result of utilizing polymorphic data structures are enumerated below:

- Type information is lost, we need to typecast each element
- Data can be homogenous

### Java Generics

Java generics is a feature that enables programmers to create flexible and reusable code. Generics allow classes, interfaces, and methods to be written in a way that is independent of the data types used, while still ensuring type safety at compile time.

This means that a single class or method can be used with different types of data, making code more efficient, and easier to read and maintain. In essence, generics make it possible to write code that is more flexible and less error-prone, without sacrificing performance or type safety.

We can define a type quantifier before return type between angle brackets (<>)

Let's say we want to create a method that counts the number of occurrences of a particular element in an array. We could define a method like this:

```java
public static int countOccurrences(int[] array, int target) {
    int count = 0;
    for (int i = 0; i < array.length; i++) {
        if (array[i] == target) {
            count++;
        }
    }
    return count;
}
```

This method works fine for arrays consisting of integers, but what if we want to count occurrences of different type of objects such as Strings, double, etc. In that case, we will have to write separate methods for each data type, but that would be repetitive and error-prone.

This is where, we can make use of generics, we can write a single method that works with any type of object by using a generic type parameter.

```java
public static <T> int countOccurrences(T[] array, T target) {
    int count = 0;
    for (int i = 0; i < array.length; i++) {
        if (array[i].equals(target)) {
            count++;
        }
    }
    return count;
}
```

In this version of the method, the type parameter `T` represents any type of object. We use the `equals` method to compare elements and count the occurrences.

Now, we can use this method as follows:

```java
String[] stringArray = { "apple", "orange", "banana", "apple" };
System.out.println(countOccurrences(stringArray, "apple"));

Double[] doubleArray = { 3.14, 2.71, 3.14, 1.41 };
System.out.println(countOccurrences(doubleArray, 3.14));
```

We can use the `extends` keyword, to put constraints on generic type parameters. Below is an example of a generic method which copies elements from a source array into a target array.

```java
public static <S extends T, T> void copyArray(S[] source, T[] target) {
    int limit = Math.min(src.length,tgt.length);
    for (int i = 0; i < limit; i++) {
        target[i] = source[i];
    }
}

```

This method defines two type parameters namely `T` and `S`, where `S` must extend `T`, thereby ensuring that the source array will be compatible with the target array.

##### Polymorphic Data Structures using Generics

Here's an example of how we can implement the same LinkedList using Java Generics, in order to deal with the problems that can occur using normal polymorphic data structures.

```java
public class LinkedList<T> {
    private Node<T> head;

    private static class Node<T> {
        private T data;
        private Node<T> next;

        public Node(T data) {
            this.data = data;
        }
    }

    public void add(T data) {
        Node<T> newNode = new Node<>(data);
        if (head == null) {
            head = newNode;
        } else {
            Node<T> currentNode = head;
            while (currentNode.next != null) {
                currentNode = currentNode.next;
            }
            currentNode.next = newNode;
        }
    }

    public void printList() {
        Node<T> currentNode = head;
        while (currentNode != null) {
            System.out.print(currentNode.data + " ");
            currentNode = currentNode.next;
        }
        System.out.println();
    }
}
```

We can make a LinkedList for only storing Integers as follows:

```java
public static void main(String[] args) {
    LinkedList<Integer> myList = new LinkedList<>();
    myList.add(1);
    myList.add(2);
    myList.add(3);
    myList.printList(); // Output: 1 2 3
}
```

##### Hiding a Type Variable

We can define new type variable, which hides the type variable that has already been defined. Like modifying the `add` method like this will result in a new `T` which is different from the `T` defined at the class level. Quantifier `<T>` masks the type parameter `T` of LinkedList.

```java
public <T> void add(T data) {
    Node<T> newNode = new Node<>(data);
    if (head == null) {
        head = newNode;
    } else {
        Node<T> currentNode = head;
        while (currentNode.next != null) {
            currentNode = currentNode.next;
        }
        currentNode.next = newNode;
    }
}
```

##### Extending Subtypes

If `S` is compatible with `T`, `S[]` is compatible with `T[]`.

```java
class Fruit{
  //...
}
class Apple extends Fruit{
  //...
}
class Mango extends Fruit{
  //...
}
public class Main{
  public static void main(String[] args){
    Fruit[] fruitArr = new Apple[5];
    //This is valid
  }
}
```

In Java, arrays typing is covariant, that means if `Apple` extends `Fruit`, then `Apple[]` extends `Fruit[]` too. This can cause type errors during runtime as the following code becomes invalid:

```java
fruitArr[0] = new Fruit(); //Error
```

Since `fruitArr` refers to an `Apple` array, it cannot store objects of type `Fruit`.

Generic classes are not covariant, that means `LinkedList<Apple>` is not compatible with `LinkedList<Fruit>`.

This means that we cannot create a general method like below to print a LinkedList of any type of fruits.

```java
public static void printList(LinkedList<Fruit> l){
  Fruit current;
  Iterator it = l.getIterator();
  while(it.has_next()){
    current = it.get_next();
    System.out.println(current);
  }
}
```

But as we have seen earlier we can define type variables in order to solve this issue

```java
public static <T> void printList(LinkedList<T> l){
  //...
}
```

##### Wildcards

We can notice in the above example that the type variable `T` is not being used inside the method `printList`, so instead we can make use of wildcards.

In Java, wildcards are a type of generic parameter that allows us to write more flexible and reusable code. They provide a way to represent an unknown type or a type that is a subtype of a specified type. Wildcards are represented using the `?` symbol and can be used in three different forms: `?`, `? extends`, and `? super`.

The first form `?` represents an unknown type and can be used in situations where you don't care about the type of the argument or variable. For example, the following method takes a list of unknown type:

```java
public static void printList(LinkedList<?> list) {
    for (Object obj : list) {
        System.out.println(obj);
    }
}
```

This method can accept a `LinkedList` of any type, but it can only read from it because the type is unknown.

The second form `? extends` is used to represent a subtype of a specified type. For example, the following method takes a list of objects that extend `Number`:

```java
public static void printNumbers(LinkedList<? extends Number> list) {
    for (Number num : list) {
        System.out.println(num);
    }
}
```

This method can accept a `LinkedList` of any type that extends `Number`, such as `Integer`, `Double`, or `BigDecimal`.

The third form `? super` is used to represent a supertype of a specified type. For example, the following method takes a list of objects that are supertypes of `String`:

```java
public static void addStrings(LinkedList<? super String> list) {
    list.add("hello");
    list.add("world");
}
```

This method can accept a `LinkedList` of any type that is a supertype of `String`, such as `Object`.

We can define variables of wildcard type, but we need to be careful while assigning values.

```java
LinkedList<?> l = new LinkedList<String>();
l.add(new Object()) //compiler error
```

Compiler cannot guarantee type matches

##### Use of Bounded Wildcards

We can use bounded wildcards, for various works for example copying a `LinkedList` from `source` to `target`.

```java
public static <? extends T, T> void copy(LinkedList<?> source, LinkedList<T> target){
  //...
}
```

### Reflection

The feature of reflection in Java provides the ability to inspect and manipulate the behavior of classes, objects, and their members at runtime, enabling us to examine the current state of a process.

**Two components involved in reflection**

- **Introspection**

  It allows a program to observe it's own current state

- **Intercession**

  It allows a program to modify or alter it's own state and interpretation

We can check whether an object is an instance of a particular class, by the following code:

```java
Fruit apple = new Apple();
//...
if (apple instanceof Apple){
  //...
}
```

However, we can only perform this check if we know beforehand which type we want to compare our object against. When encountering such situations, we can make use of _Introspection_ to determine the class to which an object belongs.

Presented here is a straightforward function called `checkEqual`, which accepts two objects as arguments and returns `true` if they are instances of the same class, and `false` otherwise.

We cannot make use of `instanceof` in cases like these, because we don't know which class to compare our object against. We can import the reflection package for Introspection of our objects.

We can extract the class information of any object by using the method `getClass()`, which is available in the reflection package. This gives us an object of type `Class` that encodes the class information of the object on which the `getClass()` method was invoked.

```java
import java.lang.reflect.*;
//...
public static boolean checkEqual(Object o1, Object o2){
  if(o1.getClass() == o2.getClass()){
    return true;
  }else{
    return false;
  }
}
```

This method gets the class information for `o1` and `o2`, and then returns `true` if both of them are having the same information and `false` otherwise.

##### Creating Class object

To make complete use of `Class` objects, we should store them in a variable of type `Class`. We can create `Class` objects primarily using two ways.

- Getting the class information of a particular object

  ```java
  Class c1 = obj.getClass();
  ```

- Creating class information for a particular class using it's name

  ```java
  Class c2 = Class.forName("Fruit");
  ```

##### Using the Class object

It is possible to create new instances of the class to which the object `obj` belongs, using the following code.

```java
Object o = c1.newInstance(); // creates a new instance of class which obj belongs to
Object newFruit = c2.newInstance(); // creates a new instance of Fruit class
```

We can use this `Class` object to get more information about the class such as `constructors`, `methods` and `fields`. We have additional classes such as `Constructor`, `Method` and `Field` to introspect them further.

Now, in order to extract the information about `constructor`, `method` and `field` that are present in the class that `obj` belongs to, we can make use of methods like `getConstructors`, `getMethods` and `getFields`.

We can store the results of these methods in an array of their respective types.

```java
Class c = obj.getClass();
Constructor[] constructorArr = c.getConstructors();
Method[] methodArr = c.getMethods();
Field[] fieldArr = c.getFields();
```

These methods return the public `constructors`, `methods` and `fields` respectively. In order to get the public and private details together, we can use methods like `getDeclaredConstructors`, `getDeclaredMethods` and `getDeclaredFields`.

We can introspect them further for details such as parameters that a constructors takes, etc using the methods present in their respective classes.

```java
Class params[] = constructorArr[0].getParameterTypes();
//Code to get the list of parameters that the first constructor takes
```

Similarly, we can invoke methods, set values of fields, and do many more things.

```java
//...
Class c = obj.getClass();
Method[] method = c.getMethods();
method[0].invoke(obj, args);
//This invoke methods[0] on obj with arguments args
Field[] field = c.getFields();
field[2].set(obj, value1);
//This sets the value of field[2] in obj to value1
Object o = field[1].get(obj);
//This gets the value of field[1] from obj
```

### Type Erasure

Java does not keep different versions of a generic class as separate types during runtime. Instead, at runtime all type variables are promoted to `Object` or the upper bound if any.

```java
LinkedList<T> --> LinkedList<Object>
LinkedList<T extends Shape> --> LinkedList<Shape>
```

Since, Java preserves no information about T during runtime, we cannot check if something is an instance of T.

```java
if (o instanceof T){
  //...
}
//This is incorrect
```

Now since all the versions of a particular generic class gets promoted to the same type during runtime, the following code will return `true`.

```java
o1 = new LinkedList<String>
o2 = new LinkedList<Date>
if(o1.getClass() == o2.getClass()){ //returns true
	//This will get executed
}
```

##### Incorrect Function Overloading

Due to type erasure we have to be careful while overloading methods which involves parameters related to type `T`. We cannot write two methods like this:

```java
public void printList(LinkedList<String> l){
  //...
}
public void printList(LinkedList<Integer> l){
  //...
}
```

Both these functions will have the same method signature after type erasure.

Type Erasure convert `LinkedList<T>` to `LinkedList<Object>` but basic types like `int`, `double`, `char`, etc are not compatible with `Object`, therefore we cannot use these types in place of generic types.

Therefore, we have wrapper classes for each type which is compatible with `Object`.

- byte &rarr; Byte
- short &rarr; Short
- int &rarr; Integer
- long &rarr; Long
- float &rarr; Float
- double &rarr; Double
- boolean &rarr; Boolean
- char &rarr; Character

We can convert between basic types and their corresponding Wrapper class as follows:

```java
int x = 10;
Integer wrap_x = Integer(x);
int unwrap_x = wrap_x.intValue();
```

There are similar methods like these for other types like `byteValue`, `doubleValue`, and so on.

**Autoboxing**

Java implicitly converts values between basic types and their corresponding wrapper types.

```java
int x = 10;
Integer wrap_x = x;
int unwrap_x = wrap_x;
```
