<img src="../assets/logo.png" width=30% />

<hr>
<span style="display:flex; justify-content: space-between;">
	<a href="../index.html">Home</a>   <a href="../week-3/summary.html">Week-2</a>    <a href="../week-5/summary.html">Week-5</a>    
</span> 
<hr>

# Java - Week 4

[Toc]

# Week 4

## Grouping together classes in Java

In object-oriented programming, related classes like `Circle`, `Square`, and `Rectangle` can extend a base class `Shape` to group shared behavior. To ensure consistency, the `Shape` class can define a `public double perimeter()` method. A default implementation, such as `public double perimeter() { return -1.0; }`, relies on subclasses to override it but risks incorrect behavior if they don't, making this approach dependent on programmer discipline.

### Abstract Classes

A better solution is to make the `perimeter()` method abstract in the `Shape` class by defining it as `public abstract double perimeter();`. This ensures every subclass, such as `Circle`, `Square`, and `Rectangle`, provides a concrete implementation. Since abstract classes cannot be instantiated, the `Shape` class must also be declared abstract using `public abstract class Shape`. This design enforces consistency and eliminates reliance on programmer discipline.

Although abstract classes cannot be instantiated directly, variables of their type can be declared. For example, you can create an array `Shape shapearr[] = new Shape[3];` and populate it with subclass objects: `shapearr[0] = new Circle(...);`, `shapearr[1] = new Square(...);`, and `shapearr[2] = new Rectangle(...);`. Iterating through the array and calling `shapearr[i].perimeter()` invokes the appropriate implementation for each subclass, demonstrating polymorphism and ensuring flexible, reusable code.

### Summary of Abastract Class and what to keep in mind

It is a **Partial Implementation** of class

Syntax:-

```java
abstract class ClassName {
    // the body
}
```

What are **abstract methods**:

- They dont have a body
- It cannot be private
- It cannot be static
- It cannot be final
- They **must** be overriden in the ChildClass

Example Code:

```java
abstract class Class1 {
    abstract int func1();
    abstract void func2(int arg1, String arg2);

    int func3() {
        System.out.println("This is concrete method in abstract class");
    }
}
```

### Generic functions

Abstract classes define shared properties and behaviors for related classes, enabling reusable and flexible code. When an abstract class implements the `Comparable` interface, it enforces comparison logic in its subclasses, allowing sorting of objects that extend the abstract class. This ensures consistency and promotes code reuse across different object types.

### Example

Let's say **Payment** is an abstract class with two instance variables and one abstract method **process()** and one concrete method **print**.
And two classes **CreditCard** and **UPI** extending abstract class.

```java
abstract class Payment {
    double amount;
    static final int MAX = 10;

    Payment(double amount) {
        this.amount = amount;
    }

    abstract void process();

    void print() {
        System.out.println("Amount paid" + amount);
    }
}


class CreditCard extends Payment {

    CreditCard(double amt) {
        super(amt);
    }

    void process() {
        System.out.println("Processing Payment through a Credit Card");
    }
}

class UPI extends Payment {
    UPI(double amt) {
        super(amt);
    }

    void process() {
        System.out.println("Processing Payment through UPI");
    }
}

public class Test {
    public static void main(String[] args) {
        Payment p1 = new CreditCard(5000);
        Payment p2 = new UPI(4000);

        p1.process(); // Through Credit CArd
        p1.print(); // print

        p2.process(); // UPI
        p2.print(); // print
    }
}
```

### Multiple Inheritance in Java

Java does not support multiple inheritance with classes to avoid ambiguity and complexity. However, it allows classes to extend a single class and implement multiple interfaces, enabling a form of multiple inheritance for flexibility in design.

### Sorting Circle Objects

Consider the need to sort `Circle` objects using generic functions in `SortFunctions`. Since `Circle` already extends the `Shape` class, it cannot extend another class like `Comparable`. This limitation arises because Java does not support multiple inheritance. However, by using interfaces, we can achieve the desired functionality.

### Interfaces in Java

An interface in Java is similar to an abstract class but contains no concrete methods. It specifies a set of methods that a class must implement. For example, the `Comparable` interface can be defined as follows:

```java
public interface Comparable {
    public abstract int cmp(Comparable s);
}
```

A class that implements an interface is required to define all the methods declared in that interface.

### Implementing the Comparable Interface

To make the `Circle` class sortable, we can implement the `Comparable` interface alongside extending the `Shape` class. Here’s how it is done:

```java
public class Circle extends Shape implements Comparable {
    public double perimeter() {
        // Implementation for calculating perimeter
        return 2 * Math.PI * radius;
    }

    public int cmp(Comparable s) {
        // Comparison logic for sorting, e.g., based on radius
        if (this.radius > ((Circle) s).radius) return 1;
        if (this.radius < ((Circle) s).radius) return -1;
        return 0;
    }
}
```

### Interface in more detail

An interface in Java is like a blueprint where all the methods are abstract and have no implementation. A class that implements an interface must provide code for all its methods. Unlike classes, a class can implement multiple interfaces, allowing it to inherit different functionalities without any conflicts. Interfaces describe specific abilities or roles of a class, making them easy to use and understand. Other classes only need to know what the interface can do, not how it works, which helps keep the code simple and flexible.

In programming, there are cases where a function or algorithm needs limited information about the objects it operates on. For example, a generic `quicksort` function works for any datatype that supports comparisons. Instead of dealing with all properties of a datatype, it only needs the ability to compare two objects. This focused capability can be expressed using an interface like `Comparable`.

### Using Comparable for Quicksort

The `Comparable` interface is used to define the comparison behavior for objects. The `quicksort` algorithm, which can sort any array of `Comparable` objects, relies solely on this capability. By declaring the input type as `Comparable[]`, we ensure that the algorithm only interacts with objects that implement the `cmp` method, ignoring all other details of the objects.

### Comparable Interface

### Example

Here is how `quicksort` can be implemented using the `Comparable` interface:

```java
interface Comparable {
    // Compares this object with another Comparable object
    public abstract int cmp(Comparable s);
}
class Myclass implements Comparable {
    private double size;
    public Myclass(double size) {
        this.size = size;
    }
    // Implementing the cmp method for comparison
    public int cmp(Comparable s) {
        if (s instanceof Myclass) {
            Myclass other = (Myclass) s;
            if (this.size < other.size) {
                return -1;
            } else if (this.size == other.size) {
                return 0;
            } else {
                return 1;
            }
        }
        return 0;
    }
    public double getSize() {
        return size;
    }
}

class SortFunctions {
    public static void quicksort(Comparable[] a) {
        quicksort(a, 0, a.length - 1);
    }
    private static void quicksort(Comparable[] a, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(a, low, high);
            quicksort(a, low, pivotIndex - 1); // Sort the left part
            quicksort(a, pivotIndex + 1, high); // Sort the right part
        }
    }
    private static int partition(Comparable[] a, int low, int high) {
        Comparable pivot = a[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (a[j].cmp(pivot) < 0) {
                i++;
                // Swap a[i] and a[j]
                Comparable temp = a[i];
                a[i] = a[j];
                a[j] = temp;
            }
        }
        Comparable temp = a[i + 1];
        a[i + 1] = a[high];
        a[high] = temp;

        return i + 1;
    }
}
public class Main {
    public static void main(String[] args) {
        Myclass[] arr = {
            new Myclass(3.5),
            new Myclass(1.2),
            new Myclass(4.7),
            new Myclass(2.6),
            new Myclass(0.9)
        };
        System.out.println("Before sorting:");
        for (Myclass m : arr) {
            System.out.println(m.getSize());
        }
        SortFunctions.quicksort(arr);
        System.out.println("\nAfter sorting:");
        for (Myclass m : arr) {
            System.out.println(m.getSize());
        }
    }
}
```

### Adding Methods to Interfaces in Java

Java interfaces have evolved to include new features, making them more versatile and functional. Earlier, interfaces could only have abstract methods, but now they can include **static methods** and **default methods**, which enhance their usability without breaking existing code.

---

### Static Methods in Interfaces

Static methods in interfaces allow defining utility or helper methods directly within the interface. These methods:

1. Cannot access instance variables or methods of implementing classes.
2. Are invoked directly using the interface name, rather than an instance of the implementing class.

### Example

```java
public interface Comparable {
    public static String cmpdoc() {
        String s;
        s = "Return -1 if this < s, ";
        s = s + "0 if this == s, ";
        s = s + "+1 if this > s.";
        return s;
    }
}
```

1. The static method `cmpdoc` provides documentation for the comparison logic.
2. It can be called directly using the interface name, like this:

```java
System.out.println(Comparable.cmpdoc());
```

---

### Default Methods in Interfaces

Default methods enable interfaces to provide a basic implementation of certain methods. This allows developers to:

1. Add new methods to interfaces without forcing all implementing classes to define them.
2. Provide a default behavior that implementing classes can optionally override.

### Example

```java
public interface Comparable {
    public default int cmp(Comparable s) {
        return 0;
    }
}
```

1. The `cmp` method here has a default implementation that always returns `0`.
2. If an implementing class does not override this method, it will inherit the default behavior.
3. If needed, an implementing class can override the method with its own logic:

```java
public class Circle implements Comparable {
    @Override
    public int cmp(Comparable s) {
        return -1;  // Example: Circle is "less than" other objects
    }
}
```

Default methods are invoked like regular instance methods using the object name:

```java
Circle c1 = new Circle();
Circle c2 = new Circle();
System.out.println(c1.cmp(c2));  // Calls the overridden method in Circle class
```

### Dealing with Conflicts in Java Interfaces

Java provides mechanisms to handle conflicts that can arise from the old problem of multiple inheritance, which is more prominent with the introduction of **default methods** in interfaces. These conflicts occur when a class inherits methods with the same name and signature from multiple sources. Java resolves these conflicts with specific rules, ensuring clarity and backward compatibility.

---

### Types of Conflicts

### 1. **Conflict Between Static and Default Methods**

When a static method in a class or interface conflicts with a default method in an interface, the subclass must provide a fresh implementation to resolve the conflict.

### 2. **Conflict Between a Class and an Interface**

If a method is inherited from both a class and an interface, the method in the **class "wins."** This is motivated by the principle of backward compatibility, as Java assumes that class methods are already well-defined and should take precedence over interface methods.

---

Consider the following scenario where a class (`Person`) and an interface (`Designation`) define methods with the same name and signature.

### Example

```java
// Class defines a method
public class Person {
    public String getName() {
        return "No name";
    }
}

// Interface defines a default method
public interface Designation {
    public default String getName() {
        return "No designation";
    }
}

// Class extends Person and implements Designation
public class Employee extends Person implements Designation {
    // No need to override getName()
    // Person's getName() method will be used
}
```

---

### Explanation

1. **Class Method Precedence**
   - In the `Employee` class, both `Person` (class) and `Designation` (interface) define a `getName()` method.
   - Java resolves this conflict by giving precedence to the class method (`Person.getName()`), as classes are considered the primary source of behavior in Java's object-oriented model.

2. **Default Method Ignored**
   - The default method `getName()` from `Designation` is ignored unless the subclass (`Employee`) explicitly overrides it.

3. **Output Example**
   - When the `getName()` method is called on an `Employee` object, it will invoke the method from the `Person` class:

   ```java
   Employee emp = new Employee();
   System.out.println(emp.getName());  // Output: "No name"
   ```

---

### Resolving Conflicts with Fresh Implementation

If the `Employee` class wants to define its own behavior for `getName()`, it can override the method explicitly.

### Overridden Example

```java
public class Employee extends Person implements Designation {
    @Override
    public String getName() {
        return "Employee name";
    }
}
```

### Output Example

```java
Employee emp = new Employee();
System.out.println(emp.getName());  // Output: "Employee name"
```

---

### Understanding Nested Objects and Inner Classes

When designing a `LinkedList`, its fundamental building block is the `Node`. A `Node` represents an individual element in the list and typically contains:

1. **Data**: The value stored in the node.
2. **Next Reference**: A pointer to the next node in the list.
3. (Optional) **Previous Reference**: In the case of a doubly linked list, a reference to the previous node.

### Why Should `Node` Be Private?

1. **Encapsulation**:
   - Encapsulation is a core principle of object-oriented programming. Keeping `Node` as a private class ensures that the internal workings of the `LinkedList` are hidden from the outside world. Users of the `LinkedList` class interact only with its public methods (`head`, `insert`, etc.), not with its internal structure (`Node`).

2. **Ease of Maintenance**:
   - If the `Node` structure needs to change (e.g., adding a `prev` field to convert the list into a doubly linked list), this change will not impact the interface of the `LinkedList`. The users of the `LinkedList` class will remain unaffected because they do not directly access `Node`.

3. **Improved Access Control**:
   - By making `Node` private, we ensure that only the `LinkedList` class has access to it. This prevents accidental misuse or modification of `Node` from outside the `LinkedList` class.

An inner class, like `Node`, can access all private components of its enclosing class (`LinkedList`). This relationship is beneficial when implementing methods like `insert`, which may require modifying private fields such as `size` or `first`. Suppose we want to enhance our `Node` to support a doubly linked list by adding a `prev` field. This change is straightforward and does not affect the public API of `LinkedList`.

### Full Implementation of `LinkedList` with a Private `Node` Class

Here’s a detailed implementation based on the above discussion:

```java
class LinkedList {
    private int size;       // Tracks the number of elements in the list
    private Node first;     // Reference to the first node in the list

    // Public method to retrieve the head of the list
    public Object head() {
        return (first != null) ? first.data : null; // Return data of the first node or null if empty
    }

    // Public method to insert a new element at the beginning of the list
    public void insert(Object newData) {
        Node newNode = new Node(newData); // Create a new node with the given data
        newNode.next = first;            // Point the new node's next to the current first node
        if (first != null) {
            first.prev = newNode;        // Update the previous reference of the current first node
        }
        first = newNode;                 // Update the first node reference to the new node
        size++;                          // Increment the size of the list
    }

    // Private inner class representing a Node
    private class Node {
        public Object data;  // Data stored in the node
        public Node next;    // Reference to the next node
        public Node prev;    // Reference to the previous node (for doubly linked list)

        // Constructor to initialize a Node with data
        public Node(Object data) {
            this.data = data;
            this.next = null;
            this.prev = null;
        }
    }

    // Optional: Method to get the size of the list
    public int getSize() {
        return size;
    }
}
```

---

### Interaction with state

Encapsulation is one of the fundamental principles of object-oriented programming (OOP). It involves:

1. **Hiding Internal Data**: The internal state of an object (its data fields) is kept private to prevent unauthorized or unintended access from external code.
2. **Providing Controlled Access**: Public methods, such as accessors (getters) and mutators (setters), regulate how the data can be accessed or modified. This control helps maintain the integrity of the object's state.

---

### **Advantages of Encapsulation**

1. **Data Integrity**:
   - By making the fields private and using methods to control access, you can enforce rules (e.g., validation) that ensure the object's data remains consistent and valid.

2. **Flexibility**:
   - You can modify the internal implementation without affecting external code that depends on the class, as long as the public interface remains the same.

3. **Simplified Maintenance**:
   - Encapsulation helps isolate changes. If you decide to change how data is stored or processed internally, you only need to update the class implementation, not the code that uses it.

4. **Improved Debugging**:
   - Encapsulation ensures that all changes to the data go through a single point (e.g., setter methods), making it easier to debug and track issues.

---

### **The `Date` Class Example**

The `Date` class represents a date with day, month, and year. By encapsulating its fields and using public methods to access and modify them, we ensure that invalid dates cannot be set.

Here’s the detailed implementation:

```java
class Date {
    // Private fields to store the day, month, and year
    private int day;
    private int month;
    private int year;

    // Getter methods to retrieve individual components of the date
    public int getDay() {
        return day;
    }

    public int getMonth() {
        return month;
    }

    public int getYear() {
        return year;
    }

    // Setter method to update the entire date at once
    public void setDate(int day, int month, int year) {
        if (isValidDate(day, month, year)) { // Validate the date combination
            this.day = day;
            this.month = month;
            this.year = year;
        } else {
            System.out.println("Invalid date: " + day + "/" + month + "/" + year);
        }
    }

    // Private method to validate the date
    private boolean isValidDate(int day, int month, int year) {
        // Check year validity
        if (year < 1) {
            return false;
        }

        // Check month validity
        if (month < 1 || month > 12) {
            return false;
        }

        // Determine the maximum number of days in the given month
        int maxDays;
        switch (month) {
            case 4: case 6: case 9: case 11:
                maxDays = 30; // April, June, September, November have 30 days
                break;
            case 2:
                // February: Check for leap year
                maxDays = (isLeapYear(year)) ? 29 : 28;
                break;
            default:
                maxDays = 31; // All other months have 31 days
        }

        // Check day validity
        return day >= 1 && day <= maxDays;
    }

    // Helper method to determine if a year is a leap year
    private boolean isLeapYear(int year) {
        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    }
}
public class Main {
    public static void main(String[] args) {
        Date date = new Date();

        // Set a valid date
        date.setDate(15, 8, 2023);
        System.out.println("Date: " + date.getDay() + "/" + date.getMonth() + "/" + date.getYear());

        // Set an invalid date
        date.setDate(31, 4, 2023); // April has only 30 days
        // The program will print an error message for the invalid date
    }
}
```

---

### **Controlled interaction with Object**

Imagine you have a system where people can check how many seats are available on a train for a specific date. But we don’t want bots (automated programs) to spam the system by making a lot of requests and slowing it down for everyone else. So, we need to:

1. Make sure only logged-in users can check train availability.
2. Limit how many queries a user can make after logging in (e.g., 3 queries per login).

---

### **How do we achieve this?**

We use **objects** to manage this process. Here's how it works:

#### **1. Logging In**

When a user logs in, we check if their username and password are correct:

- If correct, the system gives them an object called a **QueryObject**.
- This object allows them to check train seat availability.

If the login fails (e.g., wrong password), the user doesn’t get the object and can’t make any queries.

---

#### **2. Using the Query Object**

Once logged in, the user uses the **QueryObject** to check seat availability. This object:

- Talks to the database (called `BookingDB`) to get the number of available seats for a specific train on a specific date.
- Keeps track of how many times the user has queried the system.
- Stops working once the user reaches the query limit (e.g., 3 queries).

---

#### **3. Why Use an Interface?**

An **interface** is like a contract that describes what a class (like `QueryObject`) can do. In our case:

- The interface (`QIF`) says, "Any object that implements me must have a `getStatus` method to check train availability."
- This makes it easy for the main program to interact with the `QueryObject` because it only needs to know about the `QIF` interface, not the details of how `QueryObject` works.

---

#### **4. Limiting Queries**

To stop users from overusing the system:

- The `QueryObject` keeps a counter (`numqueries`) to track how many queries the user has made.
- If the user tries to make more queries than allowed (`QLIM`), the system tells them they’ve reached their limit.

---

### **How Does It Work Step-by-Step?**

1. A user tries to log in.
   - If the login is successful, they get a `QueryObject`.
   - If the login fails, they don’t get anything.

2. The user uses the `QueryObject` to check train seat availability.
   - Each time they query, the system checks if they’ve reached their limit.
   - If not, it shows the number of available seats.
   - If they’ve reached the limit, it tells them to log in again.

3. The system tracks everything to ensure fair usage.

---

### **Why Is This a Good Design?**

1. **Encapsulation**:
   - The `RailwayBooking` class handles login and controls access to the database.
   - The `QueryObject` class only focuses on querying the database.

2. **Security**:
   - Users can’t access the database directly. They must log in first.
   - The query limit ensures that no one can overload the system.

3. **Reusability**:
   - By using an interface (`QIF`), we can easily add new types of query objects in the future without changing the main program.

---

### Code Example

```java
import java.util.Date;
interface QIF {
    int getStatus(int trainNo, Date date);
}
// BookingDB: Simulates the train database
class BookingDB {
    public static int getAvailableSeats(int trainNo, Date date) {
        // Hardcoded seat availability for simplicity
        if (trainNo == 101) return 50;
        if (trainNo == 102) return 30;
        if (trainNo == 103) return 10;
        return 0; // No seats available for other train numbers
    }
}
// RailwayBooking: Manages login and QueryObject creation
class RailwayBooking {
    private BookingDB railwayDB = new BookingDB();
    // Simulates user login validation
    private boolean validLogin(String username, String password) {
        // Replace with actual login validation logic if needed
        return "user".equals(username) && "pass".equals(password);
    }
    public QIF login(String username, String password) {
        if (validLogin(username, password)) {
            return new QueryObject(); // Create a new QueryObject upon successful login
        }
        return null; // Login failed
    }
    // Private inner class implementing QIF
    private class QueryObject implements QIF {
        private int numQueries = 0; // Track the number of queries
        private static final int QLIM = 3; // Query limit per login
        public int getStatus(int trainNo, Date date) {
            if (numQueries >= QLIM) {
                System.out.println("Query limit reached. Please log in again.");
                return -1; // Indicates the query limit has been reached
            }
            numQueries++;
            int seatsAvailable = BookingDB.getAvailableSeats(trainNo, date);
            System.out.println("Available seats for Train " + trainNo + " on " + date + ": " + seatsAvailable);
            return seatsAvailable;
        }
    }
}
public class Main {
    public static void main(String[] args) {
        RailwayBooking system = new RailwayBooking();

        // Attempt login
        QIF queryObject = system.login("user", "pass");

        if (queryObject == null) {
            System.out.println("Login failed. Incorrect username or password.");
            return;
        }

        // Successful login: Perform train queries
        System.out.println("Login successful. Querying train seat availability...");

        // Query train seat availability
        queryObject.getStatus(101, new Date());
        queryObject.getStatus(102, new Date());
        queryObject.getStatus(103, new Date());
        queryObject.getStatus(104, new Date()); // This should exceed the query limit
    }
}
```

### **Imagine It Like This**

Think of a theme park:

1. You need a ticket (login) to enter the park.
2. After entering, you’re given a wristband (`QueryObject`) to ride the attractions.
3. The wristband has a limited number of rides (query limit). Once you use up all your rides, you need to buy a new ticket (log in again).

---

### Callback in Java

A **callback** is a way for one object (e.g., a `Timer`) to notify another object (e.g., `Myclass`) that something has happened. In this case:

- The `Timer` runs in parallel (using `Runnable`) and, when finished, it "calls back" the `Myclass` object to notify it.
- The `Myclass` decides what to do when the timer is done.

---

### **Step 1: A Timer Specific to `Myclass`**

Here’s how a simple timer tied specifically to `Myclass` works:

1. **How it works:**
   - The `Timer` class has a reference to its creator (`Myclass`), which is passed to it during construction.
   - When the timer finishes, it directly calls the `timerdone()` method on the `Myclass` object.

2. **Code:**

```java
class Myclass {
    // Method to start the timer
    public void f() {
        Timer t = new Timer(this); // Pass `this` (current object) to Timer
        t.start(); // Start the timer
    }

    // Method to be called when the timer is done
    public void timerdone() {
        System.out.println("Timer is done!");
    }
}

class Timer implements Runnable {
    private Myclass owner; // Reference to the owner (Myclass object)

    // Constructor to initialize the Timer with its owner (Myclass object)
    public Timer(Myclass o) {
        owner = o; // Remember who created this timer
    }

    // Method to start the timer and notify the owner when done
    public void start() {
        // Simulate some timer logic
        System.out.println("Timer started...");
        owner.timerdone(); // Notify the owner that the timer is done
    }

    @Override
    public void run() {
        // This method is required to implement Runnable but is not used in this case
        start();
    }
}

public class Main {
    public static void main(String[] args) {
        Myclass myObject = new Myclass(); // Create an instance of Myclass
        myObject.f(); // Start the process, which will start the timer
    }
}
```

3. **Problem:**  
   This approach only works for `Myclass`. If you want another class (e.g., `AnotherClass`) to use the `Timer`, you’d have to modify the `Timer` to know about `AnotherClass`.

---

### **Step 2: Making the Timer Generic with `Object`**

To make the timer more flexible:

- We change the owner to be a general `Object` instead of `Myclass`.
- When notifying, we **cast** the owner back to the expected type (`Myclass`) to call `timerdone()`.

**Code:**

```java
class Myclass {
    // Method to start the timer
    public void f() {
        Timer t = new Timer(this); // Pass `this` (current object) to Timer
        t.start(); // Start the timer
    }

    // Method to be called when the timer is done
    public void timerdone() {
        System.out.println("Timer is done!");
    }
}

class Timer implements Runnable {
    private Object owner; // A generic owner

    // Constructor to initialize the Timer with its owner (Myclass object)
    public Timer(Object o) {
        owner = o; // Remember who created this timer
    }

    // Method to start the timer and notify the owner when done
    public void start() {
        // Simulate some timer logic
        System.out.println("Timer started...");
        // Cast the owner back to Myclass and call the timerdone method
        ((Myclass) owner).timerdone();
    }

    @Override
    public void run() {
        // This method is required to implement Runnable but is not used in this case
        start();
    }
}

public class Main {
    // Main method to run the program
    public static void main(String[] args) {
        Myclass myObject = new Myclass(); // Create an instance of Myclass
        myObject.f(); // Start the process, which will start the timer
    }
}
```

**Problem:**  
Using `Object` makes the timer generic, but it requires casting, which can be risky. If the `owner` isn’t actually a `Myclass`, the program will throw a `ClassCastException`.

---

### **Step 3: Using Interfaces for Safety**

To solve the casting problem and ensure type safety, we use an **interface**:

- An interface acts as a **contract** that says, "Any class using the timer must have a `timerdone()` method."
- This way, the `Timer` knows that its owner will always have the `timerdone()` method, no matter what class it is.

---

#### **1. Define an Interface for the Callback**

The interface (`Timerowner`) specifies what the callback should look like:

```java
interface Timerowner {
    void timerdone(); // A method to be implemented by the owner
}
```

---

#### **2. Modify `Myclass` to Implement the Interface**

Now, `Myclass` implements the `Timerowner` interface, meaning it promises to provide the `timerdone()` method:

```java
class Myclass implements Timerowner {
    public void f() {
        Timer t = new Timer(this); // Pass `this` to Timer
        t.start(); // Start the timer
    }

    public void timerdone() {
        System.out.println("Timer is done!");
    }
}
```

---

#### **3. Modify `Timer` to Use the Interface**

The `Timer` now expects its owner to be a `Timerowner`. This ensures that the owner has a `timerdone()` method, removing the need for risky casting:

```java
// Timer class that accepts a Timerowner and notifies the owner when done
class Timer implements Runnable {
    private Timerowner owner; // The owner must implement Timerowner
    public Timer(Timerowner o) {
        owner = o; // Remember the owner
    }

    // Method to start the timer and notify the owner when done
    public void start() {
        // Simulate some timer logic
        System.out.println("Timer started...");
        owner.timerdone(); // Call the owner's `timerdone()` method
    }

    @Override
    public void run() {
        // This method is required to implement Runnable but is not used in this case
        start();
    }
}
public class Main {
    public static void main(String[] args) {
        Myclass myObject = new Myclass(); // Create an instance of Myclass
        myObject.f(); // Start the process, which will start the timer
    }
}

```

### **Java Iterator**

An **Iterator** is a design pattern used to traverse a collection (like a list) without exposing its underlying structure. It simplifies accessing and iterating over elements, ensuring uniformity in how we access them.

---

### **Linear List Example**

We have a `LinearList` class, which can be implemented using an array or linked list internally. To interact with it, we need an iterator because the list's internal structure isn't exposed.

#### **LinearList Class**

```java
public class Linearlist {
    private Node head; // The start of the list

    private class Node {
        Object data;
        Node next;
    }

    public void append(Object o) {
        Node m;
        for (m = head; m != null && m.next != null; m = m.next) {}
        Node n = new Node(o);
        if (m != null) m.next = n;
    }
}
```

---

### **Iterator Interface**

The `Iterator` interface defines two key methods:

- **has_next()**: Checks if there are more elements.
- **get_next()**: Returns the next element.

```java
public interface Iterator {
    boolean has_next();
    Object get_next();
}
```

---

### **Implementing Iterator in `LinearList`**

The `Iter` class implements `Iterator`, starting at the list's head and moving through the nodes.

```java
// Define the Linearlist class
class Linearlist {
    private Node head; // Head of the linked list

    // Inner class to represent a node in the linked list
    private class Node {
        Object data; // Data in the node
        Node next;   // Reference to the next node

        Node(Object data) {
            this.data = data;
            this.next = null;
        }
    }

    // Method to append data to the linked list
    public void append(Object data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode; // If the list is empty, the new node becomes the head
        } else {
            Node temp = head;
            while (temp.next != null) {
                temp = temp.next; // Traverse to the last node
            }
            temp.next = newNode; // Append the new node at the end
        }
    }

    // Inner class to implement the Iterator interface for traversing the linked list
    private class Iter implements Iterator {
        private Node position = head;

        public boolean has_next() {
            return position != null; // Check if there is a next node
        }

        public Object get_next() {
            if (has_next()) {
                Object data = position.data;
                position = position.next; // Move to the next node
                return data;
            }
            return null; // Return null if no next node
        }
    }

    // Method to get a fresh iterator
    public Iterator get_iterator() {
        return new Iter();
    }
}

// Main class to test the Linearlist
class Main {
    public static void main(String[] args) {
        Linearlist l = new Linearlist(); // Create a new Linearlist instance
        l.append("Hello"); // Append "Hello" to the list
        l.append("World"); // Append "World" to the list

        // Get an iterator and iterate through the list
        Iterator i = l.get_iterator();
        while (i.has_next()) {
            System.out.println(i.get_next()); // Output: Hello, World
        }
    }
}

```

### **Using Multiple Iterators**

If needed, you can create multiple iterators to traverse the list at different points.

```java
Iterator i = l.get_iterator();
while (i.has_next()) {
    Object oi = i.get_next();
    Iterator j = l.get_iterator();
    while (j.has_next()) {
        Object oj = j.get_next();
        System.out.println(oi + " " + oj); // Print combinations
    }
}
```
