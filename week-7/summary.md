<img src="https://javaiitmbs.github.io/assets/logo.png" width=30% />
<style> 
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style> 
<hr>
<span style="display:flex; justify-content: space-between;">
    <a href="https://javaiitmbs.github.io/week-6/summary.html">Week 6</a>
    <a href="https://javaiitmbs.github.io/index.html">Home</a>
    <a href="https://javaiitmbs.github.io/week-8/summary.html">Week 8</a>
</span> 
<hr>

## Errors And Exceptions

Errors and exceptions are an inevitable part of programming. While we aim for correctness, errors can occur due to various reasons, such as invalid user input, resource limitations, or coding mistakes.

### Types of Errors in Java

1. **External Errors**: These include issues like incorrect user input, unavailable resources, or hardware malfunctions. For example:
   - Typing an incorrect file name.
   - Trying to print to a printer that is out of paper.
   - Writing to a disk that is full.

2. **Coding Mistakes**: Errors resulting from flaws in the code, such as:
   - Accessing an array out of bounds.
   - Using an invalid key in a hash table.
   - Performing illegal arithmetic operations, such as division by zero.

3. **Resource Limitations**: Situations where external resources are depleted, such as:
   - Memory shortages.
   - Disk space running out.

### Signaling Errors

One way to signal an error is to return an invalid value, such as `-1` to indicate the end of a file or `null` to represent the absence of a valid result. However, this approach has limitations, as it may not always be possible when there is no clearly defined invalid value.

This limitation brings to the topic of Exception handling.

To handle these situations effectively, Java employs the concept of exceptions, which allow programmers to signal and manage abnormal conditions in the code. Exception handling provides a structured approach to gracefully manage these errors, ensuring that the program does not crash unexpectedly.

## Exception Handelling in Java

Java provides a structured mechanism to handle errors gracefully using **exceptions**. This ensures that errors do not lead to program crash but allow recovery or meaningful failure notifications.

1. **Throwing an Exception:**
   - Code that detects an error generates/throws an exception object.
   - The exception contains details about the type and nature of the error.

2. **Catching an Exception:**
   - The calling code "catches" the exception and takes corrective actions.
   - Alternatively, the exception can propagate back up the calling chain.

3. **Graceful Interruption:**
   - Instead of crashing, the program terminates gracefully or continues execution after addressing the issue.

**Example:** Throwing and Catching Exceptions

```java
public class ExceptionExample {

    // Method to demonstrate throwing an exception
    public static int divide(int a, int b) throws ArithmeticException {

        // Check for division by zero
        if (b == 0) {

            // Throw an ArithmeticException with a meaningful message
            throw new ArithmeticException("Division by zero is not allowed.");
        }

        // Perform division if no exception occurs
        return a / b;
    }

    public static void main(String[] args) {

        try {

            // Attempt to divide numbers, expecting a successful result
            System.out.println("Result: " + divide(10, 2));

            // Attempt to divide by zero, which will throw an exception
            System.out.println("Result: " + divide(10, 0));

        } catch (ArithmeticException e) {

            // Catch the exception and handle it gracefully
            System.out.println("Error: " + e.getMessage());

        } finally {

            // Optional: The `finally` block executes regardless of exceptions
            System.out.println("Division operation completed.");
        }
    }
}
```

**Output:**

```
Result: 5
Error: Division by zero is not allowed.
Division operation completed.
```

**Code Explanation:**

- Throwing an Exception:
  - The divide method checks if the denominator `b` is zero.
  - If `b == 0`, it throws an `ArithmeticException` with a custom message.
  - This demonstrates how Java detects and raises errors.

- Catching an Exception:
  - The `try` block in main attempts to execute code that might `throw` an exception.
  - If an exception is thrown, the `catch` block catches it and prints a meaningful error message instead of crashing.

- Graceful Interruption:
  - Instead of terminating abruptly, the program catches the exception and provides an error message.
  - The program continues execution after handling the exception.

- Finally Block:
  - The `finally` block is optional and always executes, even if no exception is thrown. It is useful for cleanup operations.

## Java's Classification of Erros

### Error Hierarcy in Java

```
Throwable
    |
    |-- Error (Unrecoverable JVM-level issues)
    |
    |-- Exception
        |
        |-- RuntimeException (Unchecked exceptions)
        |
        |-- Checked Exceptions
```

Java organizes errors into a hierarchy under the parent class `Throwable`. The main categories are:

#### Error

Errors represent severe issues that are usually beyond the control of the programmer. They indicate problems that typically arise in the Java Virtual Machine (JVM) itself and are unlikely to be recoverable during runtime.

**Key Characteristics:**

- Errors are unchecked, meaning they are not required to be declared or handled in the program.
- Typically used for conditions that the program **cannot recover** from or correct.
- Subclasses of the `Error` class.

**Examples of Errors:**

1. **OutOfMemoryError:** Thrown when the JVM runs out of memory.
2. **StackOverflowError:** Occurs when the call stack exceeds its limit, usually due to infinite recursion.
3. **VirtualMachineError:** Represents serious errors like JVM crashes or internal issues.

**Code Example:**

```java
public class ErrorExample {
    public static void main(String[] args) {
        // Example of a StackOverflowError
        causeStackOverflow();
    }

    public static void causeStackOverflow() {
        // Recursive call without termination
        causeStackOverflow();
    }
}
```

#### Exception

Exceptions represent conditions that a program should handle gracefully. They are recoverable, and handling them appropriately allows the program to continue executing.

**Key Characteristics:**

- Exceptions are further divided into **checked** and **unchecked** exceptions.
- Subclasses of the `Exception` class.

##### RuntimeException/Unchecked Exception

Unchecked exceptions occur due to programming mistakes that could have been avoided with proper input validation or checks. The compiler does not enforce handling or declaring these exceptions.

**Key Characteristics:**

● Unchecked exceptions extend the `RuntimeException` class.
● They usually indicate **logical or programming errors**.
● Do not need to be declared using the `throws` keyword.

**Examples of Unchecked Exceptions:**

1. **ArithmeticException:** Thrown during mathematical errors (e.g., division by zero).

2. **NullPointerException:** Occurs when trying to use an object reference that is `null`.

3. **ArrayIndexOutOfBoundsException:** Accessing an array element with an invalid index.

**Code Example:**

```java
public class UncheckedExceptionExample {

    public static void main(String[] args) {

        int[] numbers = {1, 2, 3};

        try {
            // Attempt to access an invalid index
            System.out.println(numbers[5]);

        } catch (ArrayIndexOutOfBoundsException e) {

            // Handle the unchecked exception
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Output:**

```
Error: Index 5 out of bounds for length 3
```

##### Checked Exception

Checked exceptions represent exceptional conditions that the program should anticipate and handle. The Java compiler enforces that these exceptions must be declared using the throws keyword or handled using a `try-catch` block.

**Key Characteristics:**

- Checked exceptions extend the `Exception` class (excluding `RuntimeException`).
- Designed for situations where recovery is expected or required.
- Often result from external issues like file handling, database access, or user input.

**Examples of Checked Exceptions:**

1. **IOException:** Issues with input/output operations, such as file handling.
2. **SQLException:** Errors related to database access.
3. **FileNotFoundException:** Raised when a file cannot be located.

**Code Example:**

```java
import java.io.*;

public class CheckedExceptionExample {
    public static void main(String[] args) {
        try {
            readFile("example.txt");
        } catch (IOException e) {
            System.out.println("An error occurred: " + e.getMessage());
        }
    }

    // Method that throws a checked exception
    public static void readFile(String fileName) throws IOException {
        FileReader file = new FileReader(fileName);
        BufferedReader br = new BufferedReader(file);

        String line;
        while ((line = br.readLine()) != null) {
            System.out.println(line);
        }

        br.close();
    }
}
```

**Output:**

```
An error occurred: example.txt (No such file or directory)
```

**Code Explanation:**

- `FileReader` and `BufferedReader` are used to read a file.

- `FileReader` may throw an `IOException` if the file doesn't exist or can't be accessed.

- The `readFile` method declares throws `IOException`, meaning the caller must handle it.

- In `main()`, we use a `try-catch` block to handle the `IOException`.

Since `IOException` is a Checked Exception, the compiler **forces us to handle or declare it**.

**User-Defined Checked Exception:**

Java allows programmers to create their own checked exceptions. This is useful when custom rules or constraints need to be enforced.

Note: This is also an example of **Custom Exception**.

**Code Example:**

```java
// Custom exception class extending Exception (checked exception)
class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message); // Pass the message to the parent Exception class
    }
}

public class UserDefinedCheckedException {
    // Method that throws a user-defined checked exception
    public void validateAge(int age) throws InvalidAgeException {
        if (age < 18) {
            // Throw custom checked exception if age is less than 18
            throw new InvalidAgeException("Age must be 18 or older.");
        }
        System.out.println("Age validation passed. You are eligible.");
    }

    public static void main(String[] args) {
        UserDefinedCheckedException example = new UserDefinedCheckedException();

        try {
            // Test with invalid age
            example.validateAge(16);
        } catch (InvalidAgeException e) {
            // Handle the exception
            System.out.println("Caught Exception: " + e.getMessage());
        }

        try {
            // Test with valid age
            example.validateAge(20);
        } catch (InvalidAgeException e) {
            System.out.println("Caught Exception: " + e.getMessage());
        }
    }
}
```

**Output:**

```
Caught Exception: Age must be 18 or older.
Age validation passed. You are eligible.
```

**Code Explanation:**

1. Custom Exception (`InvalidAgeException`)

- This class extends `Exception`, making it a **checked exception** (must be handled using `try-catch` or declared using `throws`).

- It has a constructor that takes a message and passes it to the parent `Exception` class.

2. `UserDefinedCheckedException` Class

- Contains the `validateAge(int age)` method, which checks if the provided age is **less than 18**.

- If the condition is met, it **throws an** `InvalidAgeException` with a custom message.

3. Main Method (`main`)

- Creates an instance of `UserDefinedCheckedException`.

- Calls `validateAge(16)`, which throws an exception because 16 is less than 18. This exception is caught and handled.

- Calls `validateAge(20)`, which passes the check and prints a success message.

| Aspect                   | Checked Exceptions                                  | Unchecked Exceptions                           |
| ------------------------ | --------------------------------------------------- | ---------------------------------------------- |
| **Declaration**          | Must be declared using `throws`.                    | No need to declare.                            |
| **Compiler Enforcement** | Enforced by the compiler.                           | Not enforced by the compiler.                  |
| **Use Case**             | Anticipated conditions; recoverable.                | Programming errors; logical flaws.             |
| **Examples**             | `IOException`, `SQLException`.                      | `ArithmeticException`, `NullPointerException`. |
| **Inheritance**          | Extends `Exception` class (not `RuntimeException`). | Extends `RuntimeException` class.              |

## Basics of Exception Handelling

Exception handling in Java revolves around three main constructs:

1. **`try` Block**: Encapsulates code that may generate an exception.
2. **`catch` Block**: Handles the exception if it occurs.
3. **`finally` Block**: Executes cleanup code regardless of whether an exception was thrown.

```java
try {
    // Code that might throw an exception
}
catch (ExceptionType1 e) {
    // Handle specific exception
}
catch (ExceptionType2 e) {
    // Handle another type of exception
}
finally {
    // Cleanup code
}
```

### Catching Exceptions

#### Single Exception

Handle a specific type of exception.

```java
// Demonstrating a single checked exception using IOException
import java.io.IOException;

public class SingleExceptionExample {
    public static void main(String[] args) {
        // Use a try-catch block to handle the IOException
        try {
            // Simulate an I/O operation that throws an exception
            throw new IOException("Simulated I/O error");
        } catch (IOException e) {
            // Handle the exception and display the error message
            System.out.println("Caught an IOException: " + e.getMessage());
        }
        // Program continues execution after handling the exception
        System.out.println("Program execution continues smoothly.");
    }
}
```

**Output:**

```
Caught an IOException: Simulated I/O error
Program execution continues smoothly.
```

**Code Explanation:**

1. Try Block:

- The `try` block contains code that may throw an exception. In this case, the `throw` statement deliberately throws an `IOException` with a custom error message: **"Simulated I/O error"**.

2. Throw Statement (`throw new IOException(...)`):

- The `throw` statement is used to create and throw an `IOException` object, simulating an error scenario.

3. Catch Block:

- The `catch` block is used to handle the exception. It catches the thrown `IOException` and stores it in the variable `e`.

- Inside the catch block, the `getMessage()` method of the exception object is used to retrieve and display the error message.

4. Program Continuation:

- After the exception is caught and handled, the program continues its execution with the subsequent statement: `System.out.println("Program execution continues smoothly.");`

#### Multiple Exception

Use multiple `catch` blocks for different exception types. The blocks are evaluated in sequence.

```java
// Demonstrating multiple catch blocks to handle specific and general exceptions

import java.io.FileNotFoundException;
import java.io.IOException;

public class MultipleExceptionsExample {
    public static void main(String[] args) {

        // Use a try-catch block to handle multiple exception types
        try {

            // Simulate a file-related error by throwing FileNotFoundException
            throw new FileNotFoundException("File not found error");

        } catch (FileNotFoundException e) {

            // Catch and handle the more specific exception (FileNotFoundException)
            System.out.println("Caught FileNotFoundException: " + e.getMessage());

        } catch (IOException e) {

            // Catch and handle the more general exception (IOException)
            System.out.println("Caught IOException: " + e.getMessage());

        }

        // Program continues execution after handling the exceptions
        System.out.println("Program execution continues smoothly.");
    }
}
```

**Note:** Arrange catch blocks from the most specific to the most general. For example, `IOException` should follow `FileNotFoundException`.

**Output:**

```
Caught FileNotFoundException: File not found error
Program execution continues smoothly.
```

**Code Explanation:**

1. Try Block:

- The `try` block contains code that throws a `FileNotFoundException`. This simulates a scenario where a specific I/O error occurs.

2. Multiple Catch Blocks:

- First Catch Block:
  - The `catch (FileNotFoundException e)` block catches the more specific exception.
  - This block is evaluated first since it matches the thrown exception type.

- Second Catch Block:
  - The `catch (IOException e)` block catches more general I/O-related exceptions.
  - If the `FileNotFoundException` block were absent, this block would handle the exception because F`ileNotFoundException` is a subclass of `IOException`.

3. Order of Catch Blocks:

- The catch blocks are arranged from the most specific (`FileNotFoundException`) to the most general (`IOException`).

- This order ensures the appropriate block handles the exception and prevents compilation errors.

4. Program Continuation:

- After handling the exception, the program resumes normal execution with the `System.out.println("Program execution continues smoothly.");` statement.

### Throwing Exceptions

Java allows developers to explicitly throw exceptions using the `throw` keyword. When a method can throw exceptions, it must declare them using the `throws` keyword in the method signature.

**Compiler Enforcement:** The Java compiler ensures that checked exceptions are either caught or declared in the calling code.

**Code Example:**

```java
// Class to demonstrate exceptions with the `throws` keyword
public class ThrowsKeywordExample {

    /**
     * This method validates a person's age for voting eligibility.
     * It uses the `throws` keyword to declare that it can throw an
     * IllegalArgumentException.
     *
     * @param age The age of the person.
     * @throws IllegalArgumentException if the age is less than 18.
     */
    public void validateAge(int age) throws IllegalArgumentException {
        // Check if the age is less than 18
        if (age < 18) {
            // Throw an IllegalArgumentException with a custom message
            throw new IllegalArgumentException("Age must be 18 or above to vote.");
        }
        // If no exception occurs, print a success message
        System.out.println("Age is valid for voting.");
    }

    public static void main(String[] args) {
        // Create an instance of the class
        ThrowsKeywordExample example = new ThrowsKeywordExample();

        // Test cases with different ages
        int[] testAges = {16, 20, 15, 25};

        for (int age : testAges) {
            try {
                // Validate the age using the method
                example.validateAge(age);
            } catch (IllegalArgumentException e) {
                // Handle the exception and print the error message
                System.out.println("Caught an exception: " + e.getMessage());
            }
        }
    }
}
```

**Output:**

```
Caught an exception: Age must be 18 or above to vote.
Age is valid for voting.
Caught an exception: Age must be 18 or above to vote.
Age is valid for voting.
```

**Code Explanation:**

- Declaring Exceptions with `throws`:
  - The `validateAge` method declares that it may throw an `IllegalArgumentException` using the `throws` keyword.

- Throwing Exceptions:
  - The `throw` statement is used inside the method to explicitly throw the exception when the condition (age < 18) is met.

- Catching Exceptions:
  - The `main` method uses a `try-catch` block to call the method and handle any exceptions that are thrown.

### Custom Exceptions

Custom exceptions can be created by extending the `Exception` class. This allows developers to define application-specific errors.

```java
// Custom exception class to handle negative values
class NegativeValueException extends Exception {
    // Constructor to initialize the exception with a custom message
    public NegativeValueException(String message) {
        super(message); // Pass the message to the parent Exception class
    }
}

// A class representing a simple linear list
public class LinearList {

    /**
     * Adds a value to the list.
     *
     * @param value The value to be added.
     * @throws NegativeValueException If the value is negative.
     */
    public void add(int value) throws NegativeValueException {
        // Check if the value is negative
        if (value < 0) {
            // Throw a custom exception for negative values
            throw new NegativeValueException("Negative value: " + value);
        }
        // Print a success message if the value is valid
        System.out.println("Value added: " + value);
    }

    public static void main(String[] args) {
        // Create an instance of the LinearList class
        LinearList list = new LinearList();

        // Use a try-catch block to handle the custom exception
        try {
            // Attempt to add a negative value
            list.add(-10);
        } catch (NegativeValueException e) {
            // Handle the custom exception and display the error message
            System.out.println("Caught Exception: " + e.getMessage());
        }

        // Attempt to add a valid positive value
        try {
            list.add(15);
        } catch (NegativeValueException e) {
            System.out.println("Caught Exception: " + e.getMessage());
        }

        // Program continues execution smoothly after handling exceptions
        System.out.println("Program execution continues.");
    }
}
```

**Output:**

```
Caught Exception: Negative value: -10
Value added: 15
Program execution continues.
```

**Code Explanation:**

1. Custom Exception Class (`NegativeValueException`):

- The `NegativeValueException` class extends the `Exception` class, making it a checked exception.

- It has a constructor that accepts a custom error message, which is passed to the superclass (`Exception`).

2. Method Declaration with `throws`:

- The add method in the `LinearList` class declares that it may throw a `NegativeValueException`.

- This informs the calling code that it must handle this exception using a `try-catch` block.

3. Throwing the Custom Exception:

- Inside the `add` method, if the input value is negative, a `NegativeValueException` is thrown with an appropriate error message.

- For positive values, the method simply prints a success message.

4. Handling the Custom Exception:

- In the `main` method, the add method is called inside a `try-catch` block.

- If a `NegativeValueException` is thrown, the `catch` block handles it and displays the error message.

- A second `try-catch` block demonstrates how valid values are processed without any exceptions.

### Using `finally` for Cleanup

The `finally` block ensures that critical cleanup code runs regardless of whether an exception occurs.

**Code Example:**

```java
// Demonstrating the use of finally for resource cleanup

public class FinallyExample {
    public static void main(String[] args) {

        // Simulate a resource by using a custom resource object
        CustomResource resource = null;

        try {
            // Allocate the resource
            resource = new CustomResource();
            System.out.println("Resource initialized successfully.");

            // Simulate an operation that throws an exception
            int result = 10 / 0; // This will cause an ArithmeticException
            System.out.println("Operation result: " + result);

        } catch (ArithmeticException e) {

            // Handle the specific exception
            System.out.println("Error occurred: " + e.getMessage());

        } finally {

            // Ensure the resource is cleaned up, regardless of an exception
            if (resource != null) {
                resource.cleanup();
            }
            System.out.println("Cleanup completed in finally block.");
        }

        // Program continues after exception handling
        System.out.println("Program execution continues.");
    }
}

// A custom resource class to simulate resource management
class CustomResource {
    // Constructor to initialize the resource
    public CustomResource() {
        System.out.println("CustomResource allocated.");
    }

    // Method to release the resource
    public void cleanup() {
        System.out.println("CustomResource cleaned up.");
    }
}
```

**Output:**

```
CustomResource allocated.
Resource initialized successfully.
Error occurred: / by zero
CustomResource cleaned up.
Cleanup completed in finally block.
Program execution continues.
```

**Code Explanation:**

1. Custom Resource Simulation:

- The `CustomResource` class simulates a resource that needs manual cleanup (e.g., database connection, file handle).

- It provides a `cleanup` method to release resources explicitly.

2. The `try` Block:

- The `try` block initializes the resource and performs operations.

- Here, an arithmetic operation (`10 / 0`) is intentionally included to simulate an exception.

3. The `catch` Block:

- The `catch` block handles the `ArithmeticException` caused by the division by zero.

- It ensures that the error is logged, and the program does not crash.

4. The `finally` Block:

- The `finally` block ensures that the resource is cleaned up (via the `cleanup` method) regardless of whether an exception occurs.

- It runs unconditionally, even if no exception is thrown.

5. Use `finally`:

- The `finally` block is ideal for releasing resources such as file handles, database connections, or network sockets, ensuring no resource leaks.

## Exception Chaining

Java supports chaining exceptions to provide more context about an error. The Throwable class provides methods such as `getCause()` and `initCause()` to work with chained exceptions.

**Code Example:**

```java
// Demonstrating exception chaining in Java
public class ExceptionChainingExample {
    public static void main(String[] args) {

        try {

            // Outer try-catch block to catch and handle RuntimeException

            try {

                // Inner try-catch block to simulate and handle an underlying exception
                throw new IllegalArgumentException("Invalid input provided");

            } catch (IllegalArgumentException e) {

                // Wrap the original exception (cause) into a higher-level exception
                throw new RuntimeException("Processing failed due to invalid input", e);
            }

        } catch (RuntimeException e) {

            // Handle the chained RuntimeException and display its message
            System.out.println("Caught Exception: " + e.getMessage());

            // Retrieve and display the cause of the RuntimeException
            Throwable cause = e.getCause();
            if (cause != null) {
                System.out.println("Caused by: " + cause.getMessage());
            }
        }

        // Program execution continues after handling the exception
        System.out.println("Program execution continues.");
    }
}
```

**Output:**

```
Caught Exception: Processing failed due to invalid input
Caused by: Invalid input provided
Program execution continues.
```

**Code Explanation:**

1. Inner `try-catch` Block:

- The inner block simulates an error (e.g., invalid input) by throwing an `IllegalArgumentException`.

- This block catches the `IllegalArgumentException` and wraps it inside a `RuntimeException`, using exception chaining to preserve the original cause.

2. Outer `try-catch` Block:

- The outer block catches the `RuntimeException` thrown from the inner block.

- It retrieves the root cause (original exception) using the `getCause()` method of the `Throwable` class.

3. Exception Chaining:

- Chaining helps propagate the root cause of an error while adding additional context at higher levels.

- The `RuntimeException` message provides context ("Processing failed due to invalid input"), and its cause retains the original error details ("Invalid input provided").

**Methods Used:**

- `getMessage()`: Fetches the message of the exception.

- `getCause()`: Retrieves the cause of the current exception.

## Packages

In Java, a package serves as an organizational unit for grouping related classes and interfaces. Packages help prevent naming conflicts by allowing developers to create unique namespaces. They also facilitate better code organization and modularity.

### Using Packages

To use classes from a package, the `import` statement is employed:

```java
import java.math.BigDecimal; // Imports the BigDecimal class
import java.math.*; // Imports all classes in the java.math package
```

`*` imports all classes in the specified package but does not include sub-packages. For instance:

- `import java.math.*` imports all classes in java.math, but not
  `java.math.geometry`.

- Writing `import java.*` is not allowed.

### Benifits of Packages

1. **Namespace Management**:

- Prevents naming conflicts by creating unique namespaces.

- For example, two developers can have a class named `Employee` in different packages without conflict.

2. **Code Organization**:

- Packages group related classes, making code easier to navigate and maintain.

3. **Access Control**:

- Packages define access levels for classes and members.
- Visibility modifiers (`public`, `private`, `protected`, `default`) control which parts of the code are accessible from outside the package.

4. **Reusability and Modularity**:

- Packages allow for modular programming, enabling easy reuse of code components.

### Creating and Naming Packages

Developers can define custom packages by adhering to Java's naming conventions. The convention for package names follows the reverse of an organization's Internet domain name:

| Internet Domain           | Package Name              |
| ------------------------- | ------------------------- |
| `onlinedegree.iitm.ac.in` | `in.ac.iitm.onlinedegree` |

### Defining a Package

To include a class in a specific package, add a package declaration at the top of the `.java` file: Create a file named `Employee.java` inside a folder `in/ac/iitm/onlinedegree`.

```java
// File: in/ac/iitm/onlinedegree/Employee.java
package in.ac.iitm.onlinedegree;

/**
 * Represents an Employee with a name.
 */
public class Employee {
    private String name; // Employee's name

    // Constructor to initialize the employee's name
    public Employee(String name) {
        this.name = name;
    }

    // Getter method for the employee's name
    public String getName() {
        return name;
    }
}
```

### Using a Package

Create a file `Main.java` in the root directory or another package.

```java
// File: Main.java
// Import the Employee class from the specified package
import in.ac.iitm.onlinedegree.Employee;

/**
 * Demonstrates the usage of packages in Java.
 */
public class Main {
    public static void main(String[] args) {
        // Create an Employee object
        Employee emp = new Employee("John Doe");

        // Access the public method of the Employee class
        System.out.println("Employee Name: " + emp.getName());
    }
}
```

**Output:**

```
Employee Name: John Doe
```

**Code Explanation:**

1. Package Declaration:

- The `package` statement at the top of `Employee.java` specifies that the class belongs to the `in.ac.iitm.onlinedegree` package.

2. Import Statement:

- The `import in.ac.iitm.onlinedegree.Employee;` statement in `Main`.java makes the `Employee` class accessible.

3. Folder Structure:

- By default, classes without a package declaration belong to an **anonymous package** shared by all classes in the same directory.

**Directory Structure:**

```
root/
├── in/
│   ├── ac/
│   │   ├── iitm/
│   │   │   ├── onlinedegree/
│   │   │   │   ├── Employee.java
├── Main.java
```

4. Visibility Modifiers:

- The Employee class and its `getName()` method are `public`, allowing them to be accessed from outside the package.

## Visibility Modifiers

Visibility modifiers in Java allow developers to control access to classes, methods, and variables. This ensures encapsulation, one of the core principles of object-oriented programming (OOP). Proper use of visibility modifiers leads to better code security, modularity, and maintainability.

### Types of Visibility Modifies:

#### Public:

- Members marked as public are accessible everywhere — inside the class, outside the class, and even in other packages.

- Used when a member needs to be globally accessible.

- **Example**: Frequently used in APIs or library methods designed for external use.

#### Private:

- Members marked as private are accessible only within the defining class.

- Promotes encapsulation by hiding the implementation details.

- Used to restrict direct access to sensitive data or internal logic.

- **Example**: Helper methods or internal state variables.

#### Default (Package-Private):

- If no modifier is specified, the member or class has package-private visibility.

- Accessible only within the same package.

- Useful for grouping related classes and providing access only to those in the same module.

#### Protected:

- Members marked as protected are accessible:
  - Within the same package.
  - In subclasses, even if they are in a different package.

- **Special Rule**: A subclass can make a protected member public in its implementation, thus expanding its visibility.

- **Use Case**: Useful in inheritance when designing extensible classes.

### Code Example: Visibility Modifiers:

1. Create the `VisibilityExample` Class

```java
// File: in/ac/iitm/onlinedegree/VisibilityExample.java
package in.ac.iitm.onlinedegree;

/**
 * Demonstrates different visibility modifiers.
 */
public class VisibilityExample {
    public int publicVar = 100; // Accessible everywhere
    private int privateVar = 200; // Accessible only within this class
    int packagePrivateVar = 300; // Accessible only within the same package
    protected int protectedVar = 400; // Accessible within package and in subclasses

    // Public method: accessible everywhere
    public void showPublic() {
        System.out.println("Public Variable: " + publicVar);
    }

    // Private method: accessible only within this class
    private void showPrivate() {
        System.out.println("Private Variable: " + privateVar);
    }

    // Package-private method: accessible only within the same package
    void showPackagePrivate() {
        System.out.println("Package-Private Variable: " + packagePrivateVar);
    }

    // Protected method: accessible within package and subclasses
    protected void showProtected() {
        System.out.println("Protected Variable: " + protectedVar);
    }

    public void demonstratePrivateAccess() {
        // Private members are accessible within the same class
        showPrivate();
    }
}
```

2. Create a Class in the Same Package

```java
// File: in/ac/iitm/onlinedegree/SamePackageAccess.java
package in.ac.iitm.onlinedegree;

/**
 * Demonstrates access levels within the same package.
 */
public class SamePackageAccess {
    public static void main(String[] args) {
        VisibilityExample example = new VisibilityExample();

        // Accessing public member
        example.showPublic();

        // Accessing package-private member
        example.showPackagePrivate();

        // Accessing protected member
        example.showProtected();

        // Accessing private member (will not compile if uncommented)
        // example.showPrivate(); // ERROR: Private members are not accessible
    }
}
```

3. Create a Class in a Different Package

```java
// File: DifferentPackageAccess.java
package different;

import in.ac.iitm.onlinedegree.VisibilityExample;

/**
 * Demonstrates access levels from a different package.
 */
public class DifferentPackageAccess extends VisibilityExample {
    public static void main(String[] args) {
        VisibilityExample example = new VisibilityExample();

        // Accessing public member
        example.showPublic();

        // Accessing package-private member (will not compile if uncommented)
        // example.showPackagePrivate(); // ERROR: Package-private members are not accessible outside the package

        // Accessing protected member through inheritance
        DifferentPackageAccess inherited = new DifferentPackageAccess();
        inherited.showProtected();

        // Accessing private member (will not compile if uncommented)
        // example.showPrivate(); // ERROR: Private members are not accessible
    }
}
```

**Output:**

For `SamePackageAccess` Class

```
Public Variable: 100
Package-Private Variable: 300
Protected Variable: 400
```

For `DifferentPackageAccess` Class

```
Public Variable: 100
Protected Variable: 400
```

**Code Explanation**

1. Public:

- Accessible in both `SamePackageAccess` and `DifferentPackageAccess`.

2. Private:

- Only accessible within the `VisibilityExample` class. Demonstrated by calling `showPrivate()` within a `public` method.

3. Package-Private:

- Accessible only in `SamePackageAccess` because it belongs to the same package as `VisibilityExample`.

4. Protected:

- Accessible in `SamePackageAccess` (same package).
- Accessible in `DifferentPackageAccess` only through inheritance.

## Assertions

In Java, when developing functions or methods, it is important to ensure that the input parameters meet certain expectations or constraints for the function to work correctly. If these constraints are violated, the behavior of the program can become unpredictable or erroneous.

To handle this, developers often rely on two primary mechanisms: **exceptions** and **assertions**.

1. Using Exceptions: Validates constraints and throws an exception when violated.

2. Using Assertions: Validates assumptions during development and testing but does not trigger during production runtime.

### Validating Constraints with Exceptions

For public functions that are accessed by external code, it is common to enforce parameter constraints using exceptions.

For example: If a negative value is passed to the function, an `IllegalArgumentException` is thrown. This approach ensures that the function's contract is upheld and communicates the error to the calling code.

```java
public class MyFunctionExample {
    // Method to calculate the square root of x, assuming x >= 0
    public static double myfn(double x) throws IllegalArgumentException {
        // Check if x is less than 0 and throw an exception if true
        if (x < 0) {
            throw new IllegalArgumentException("x < 0: Cannot calculate the square root of a negative number.");
        }
        // Return the square root of x if valid
        return Math.sqrt(x);
    }

    public static void main(String[] args) {
        // Test cases to demonstrate the behavior of myfn

        // Test case 1: Valid input (positive number)
        try {
            double result1 = myfn(16); // Expected output: 4.0
            System.out.println("Square root of 16: " + result1);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Test case 2: Valid input (0)
        try {
            double result2 = myfn(0); // Expected output: 0.0
            System.out.println("Square root of 0: " + result2);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Test case 3: Invalid input (negative number)
        try {
            double result3 = myfn(-4); // Should throw an exception
            System.out.println("Square root of -4: " + result3);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage()); // Expected error message
        }
    }
}
```

**Output**

```
Square root of 16: 4.0
Square root of 0: 0.0
Error: x < 0: Cannot calculate the square root of a negative number.
```

**Code Explanation**

1. Method `myfn(double x)`:

- Input Validation: The method first checks if `x` is less than 0. If it is, an `IllegalArgumentException` is thrown with a message explaining that negative numbers are not allowed for square root calculation.

- Square Root Calculation: If `x` is valid (i.e., non-negative), the method calculates the square root using `Math.sqrt(x)` and returns the result.

2. `main` Method:

- Test Case 1: It calls `myfn(16)`, which is a valid positive number, and prints the Square root of 16: 4.0.

- Test Case 2: It calls `myfn(0)`, where the result should be 0.0 (since the square root of 0 is 0).

- Test Case 3: It calls `myfn(-4)`, which triggers the exception since the input is negative. The exception is caught, and the error message is printed.

### Using Assertions for Internal Checks

Assertions provide a lightweight mechanism for validating assumptions during development. Unlike exceptions, assertions are typically used for internal, private methods where parameter constraints are assumed to be met by the developer's code.

**Code Example**

```java
public class AssertionExample {
    // Method to calculate the square root of x, assuming x >= 0 (checked with an assertion)
    public static double myfn(double x) {
        // Use assertion to ensure that x is non-negative
        assert x >= 0 : "x must be non-negative"; // Throws AssertionError if x < 0
        return Math.sqrt(x);
    }

    public static void main(String[] args) {
        // Enabling assertions requires the JVM to be run with the -ea flag.
        // Example: java -ea AssertionExample

        // Test case 1: Valid input (positive number)
        try {
            double result1 = myfn(16); // Expected output: 4.0
            System.out.println("Square root of 16: " + result1);
        } catch (AssertionError e) {
            System.out.println("Assertion failed: " + e.getMessage());
        }

        // Test case 2: Valid input (0)
        try {
            double result2 = myfn(0); // Expected output: 0.0
            System.out.println("Square root of 0: " + result2);
        } catch (AssertionError e) {
            System.out.println("Assertion failed: " + e.getMessage());
        }

        // Test case 3: Invalid input (negative number)
        try {
            double result3 = myfn(-4); // Should throw AssertionError
            System.out.println("Square root of -4: " + result3);
        } catch (AssertionError e) {
            System.out.println("Assertion failed: " + e.getMessage()); // Expected error message
        }
    }
}
```

**Running the Program**

To run the program and ensure assertions are enabled, you must specify the `-ea` (enable assertions) flag when running the program. Here’s how you would run the program from the command line:

```
java -ea AssertionExample
```

**Output**

```
Square root of 16: 4.0
Square root of 0: 0.0
Assertion failed: x must be non-negative
```

**Code Explanation**

1. Method `myfn(double x)`:

- The method checks if x is non-negative using an assertion: `assert x >= 0` : "x must be non-negative";.

- If the value of `x` is less than 0, the condition fails, and an `AssertionError` is thrown with the optional message **"x must be non-negative"**.

- If the assertion passes (i.e., `x >= 0`), the square root of `x` is computed and returned using `Math.sqrt(x)`.

2. `main` Method:

- Test Case 1: Calls m`yfn(16)` which is valid (positive number) and prints the square root (4.0).

- Test Case 2: Calls `myfn(0)`, which is also valid (square root of 0 is 0.0).

- Test Case 3: Calls `myfn(-4)`, which is invalid (negative number). Since assertions are enabled **(with the `-ea` JVM flag)**, an `AssertionError`is thrown, and the message "x must be non-negative" is printed.

### Features of Assertions

1. **Abort on Failure:** When an assertion fails, an `AssertionError` is thrown, aborting the program.

2. **Diagnostic Information:** The error message and stack trace help identify the source of the failure.

3. **Not for Runtime Recovery:** Assertions are not meant to be caught or handled during runtime. They indicate programming errors that need to be fixed during development.

**Code Example**

```
public static double myfn(double x) {
    assert x >= 0 : "Invalid input: " + x;
    return Math.sqrt(x);
}
```

**Code Explanation**

If `x` is negative, the program terminates with an `AssertionError`, and the message `Invalid input: <value>` is displayed.

### Enabling and Disabling Assertions in Java

Assertions in Java can be enabled or disabled at runtime using JVM options, providing flexibility without needing to modify or recompile the code. This allows developers to control when and where assertions should be active, aiding in debugging and development while avoiding unnecessary overhead in production environments.

#### Runtime Configuration

Assertions are enabled or disabled at runtime using JVM options, without requiring code changes or recompilation.

- **Enable Assertions**

To enable assertions in Java, you can use the `-ea` or `-enableassertions` option with the JVM.

1.  Globally (for all classes in the program):

```
java -ea MyCode
```

This enables assertions for the entire application, including all classes.

2. For a Specific class:

```
java -ea:com.example.MyClass MyCode
```

This enables assertions only for the class `com.example.MyClass`. Replace `com.example.MyClass` with the fully qualified name of any class you want to target.

3. For a Package:

```
java -ea:com.example.package MyCode
```

This enables assertions for all classes within the `com.example.package` package.

- **Disable Assertions**

You can also disable assertions, either globally or for specific parts of the code, by using the `-da` or `-disableassertions` option.

1. Globally (for all classes):

```
java -da MyCode
```

This disables assertions throughout the entire application.

2. For a specific class:

```
java -da:com.example.MyClass MyCode
```

This disables assertions for the class `com.example.MyClass`, while leaving assertions enabled for other classes.

3. For a package:

```
java -da:com.example.package MyCode
```

This disables assertions for all classes within the `com.example.package` package.

#### Combining Options: Selective Enabling and Disabling

Java allows you to combine enabling and disabling assertions for specific parts of the application, offering more fine-grained control over which assertions are active.

For example:

```
java -ea:com.example.package
-da:com.example.package.MyClass MyCode
```

- Assertions are enabled for all classes within the `com.example.package` package.

- Assertions are disabled for the specific class `com.example.package.MyClass`.

This approach helps in cases where you want to test assertions in most of your code but exclude certain classes or packages from being checked.

### Summary of Options

| Option                        | Effect                                                           |
| ----------------------------- | ---------------------------------------------------------------- |
| `-ea` or `-enableassertions`  | Enable assertions globally or for specific classes or packages.  |
| `-da` or `-disableassertions` | Disable assertions globally or for specific classes or packages. |
| `-ea:package.name`            | Enable assertions for all classes in the specified package.      |
| `-ea:package.name.ClassName`  | Enable assertions for a specific class in a package.             |
| `-da:package.name`            | Disable assertions for all classes in the specified package.     |
| `-da:package.name.ClassName`  | Disable assertions for a specific class in a package.            |

### When to Use Assertions

- **Development and Debugging:**
  - Use assertions to validate assumptions and invariants during code development and testing.

  - Assertions should highlight unrecoverable, fatal errors that indicate programming bugs.

- **Production Code:**
  - Assertions are disabled by default in production to avoid runtime overhead.

## Assertions vs. Exceptions

| Feature              | Assertions                          | Exceptions                       |
| -------------------- | ----------------------------------- | -------------------------------- |
| **Purpose**          | Validate assumptions during testing | Handle runtime errors gracefully |
| **When Used**        | Development and debugging           | Production                       |
| **Runtime Behavior** | Disabled in production              | Always enabled                   |
| **Handling**         | Do not catch                        | Should be caught and handled     |

## Logging

Effective logging is essential for diagnosing issues and maintaining traceability in software systems. While print statements are a simple way to track program behavior, they lack flexibility, clutter the code, and are difficult to manage in complex systems. Logging provides a structured and configurable solution for generating diagnostic messages, enabling developers to monitor, debug, and audit their applications efficiently.

### The Need for Logging

Print statements have significant drawbacks:

- They must be manually added or removed.
- They produce unstructured output.
- Turning them on or off requires modifying the code.

Logging addresses these issues by:

- Organizing messages hierarchically by importance.
- Providing metadata (e.g., timestamps, context).
- Enabling external control via configuration files.

### Basics of Logging

The simplest way to log messages in Java is to use the global logger:

```java
import java.util.logging.Level;
import java.util.logging.Logger;

public class LoggingExample {
    public static void main(String[] args) {
        // Obtain the global logger
        Logger globalLogger = Logger.getGlobal();

        // Example 1: Default logging behavior
        System.out.println("Example 1: Default Logging Behavior");
        globalLogger.info("Default: Application started.");
        globalLogger.warning("Default: A potential issue detected.");
        globalLogger.severe("Default: Critical error occurred!");

        // Example 2: Suppress logging by setting level to OFF
        System.out.println("\nExample 2: Logging Suppressed");
        globalLogger.setLevel(Level.OFF); // Suppress all logs
        globalLogger.info("This log will not be shown.");
        globalLogger.warning("This log will not be shown either.");
        globalLogger.severe("Even severe logs are suppressed.");

        // Example 3: Customizing the log level
        System.out.println("\nExample 3: Custom Log Level");
        globalLogger.setLevel(Level.WARNING); // Log only WARNING and above
        globalLogger.info("This INFO log is suppressed.");
        globalLogger.warning("This WARNING log is displayed.");
        globalLogger.severe("This SEVERE log is displayed.");
    }
}
```

**Output**

- Example 1: Default logging Behaviour

```
Example 1: Default Logging Behavior
Jan 8, 2025, 10:30:15 PM LoggingExample main
INFO: Default: Application started.
Jan 8, 2025, 10:30:15 PM LoggingExample main
WARNING: Default: A potential issue detected.
Jan 8, 2025, 10:30:15 PM LoggingExample main
SEVERE: Default: Critical error occurred!
```

- Example 2: Logging Suppressed

```
Example 2: Logging Suppressed
(No logs are displayed.)
```

- Example 3: Custom Log Level

```
Example 3: Custom Log Level
Jan 8, 2025, 10:30:15 PM LoggingExample main
WARNING: This WARNING log is displayed.
Jan 8, 2025, 10:30:15 PM LoggingExample main
SEVERE: This SEVERE log is displayed.
```

**Code Explanation**

1. Obtaining the Global Logger:

- The global logger is accessed using `Logger.getGlobal()`.
- It is a pre-configured logger that can be used for basic logging without additional setup.

2. Logging Levels:

- Logging levels define the severity of a message:
  - `INFO`: General informational messages.
  - `WARNING`: Indications of potential problems.
  - `SEVERE`: Critical issues that need immediate attention.
  - `OFF`: Suppresses all logging.

3. Customizing the Logging Level:

- Use `globalLogger.setLevel(Level.<LEVEL>)` to set the minimum level of logs to display.
- Logs with severity below the set level are ignored.

4. Suppressing Logs:

- Setting the level to `Level.OFF` suppresses all logs, regardless of their severity.

### Custom Loggers

In Java, custom loggers allow you to organize and manage logging more effectively, especially in larger projects. Loggers can be structured hierarchically, similar to package names, providing fine-grained control over logging for specific parts of your application.

```java
import java.util.logging.Level;
import java.util.logging.Logger;

public class CustomLoggerExample {
    // Creating a custom logger
    private static final Logger parentLogger = Logger.getLogger("in.ac.iitm");
    private static final Logger childLogger = Logger.getLogger("in.ac.iitm.onlinedegree");

    public static void main(String[] args) {
        System.out.println("Custom Logger Example:");

        // Example 1: Default logging behavior of custom loggers
        System.out.println("\nExample 1: Default Logging Behavior");
        parentLogger.info("Parent logger: This is an informational message.");
        childLogger.info("Child logger: This is an informational message.");

        // Example 2: Setting log levels for the parent logger
        System.out.println("\nExample 2: Setting Parent Logger Level");
        parentLogger.setLevel(Level.WARNING); // Logs only WARNING and SEVERE for parent and its children
        parentLogger.info("Parent logger: This INFO message is suppressed.");
        parentLogger.warning("Parent logger: This WARNING message is displayed.");
        childLogger.info("Child logger: This INFO message is suppressed by the parent.");
        childLogger.severe("Child logger: This SEVERE message is displayed.");

        // Example 3: Setting log levels specifically for the child logger
        System.out.println("\nExample 3: Setting Child Logger Level");
        childLogger.setLevel(Level.INFO); // Logs INFO, WARNING, and SEVERE for the child logger
        parentLogger.warning("Parent logger: This WARNING message is displayed.");
        childLogger.info("Child logger: This INFO message is now displayed.");
        childLogger.warning("Child logger: This WARNING message is displayed.");
    }
}
```

**Output**

- Example 1: Default Logging Behavior

```
Example 1: Default Logging Behavior
Jan 8, 2025, 10:30:15 PM in.ac.iitm
INFO: Parent logger: This is an informational message.
Jan 8, 2025, 10:30:15 PM in.ac.iitm.onlinedegree
INFO: Child logger: This is an informational message.
```

- Example 2: Setting Parent Logger Level

```
Example 2: Setting Parent Logger Level
Jan 8, 2025, 10:30:15 PM in.ac.iitm
WARNING: Parent logger: This WARNING message is displayed.
Jan 8, 2025, 10:30:15 PM in.ac.iitm.onlinedegree
SEVERE: Child logger: This SEVERE message is displayed.
```

- Example 3: Setting Child Logger Level

```
Example 3: Setting Child Logger Level
Jan 8, 2025, 10:30:15 PM in.ac.iitm
WARNING: Parent logger: This WARNING message is displayed.
Jan 8, 2025, 10:30:15 PM in.ac.iitm.onlinedegree
INFO: Child logger: This INFO message is now displayed.
Jan 8, 2025, 10:30:15 PM in.ac.iitm.onlinedegree
WARNING: Child logger: This WARNING message is displayed.
```

**Code Explanation**

1. Creating Custom Loggers:

- Custom loggers are created using `Logger.getLogger("loggerName")`, where `loggerName` is a string representing the logger's name.
- The name should follow a hierarchical structure, like package names (e.g., `in.ac.iitm`).

2. Hierarchy of Loggers:

- Loggers are hierarchical, so settings applied to a parent logger (e.g., `in.ac.iitm`) also affect its child loggers (e.g., `in.ac.iitm.onlinedegree`).
- This allows centralized control over logging behavior.

3. Log Levels:

- You can set log levels (`INFO`, `WARNING`, `SEVERE`, etc.) independently for parent and child loggers.
- If a parent's level is more restrictive (e.g., `WARNING`), it suppresses lower-level logs from its children.

4. Logging Behavior:

- By default, loggers inherit the log level from their parent.
- Customizing log levels for specific loggers allows targeted control over which messages are displayed.

### Logging Levels

Java provides seven logging levels to categorize messages:

1. SEVERE
2. WARNING
3. INFO (default)
4. CONFIG
5. FINE
6. FINER
7. FINEST

You can control the level of logging:

```java
logger.setLevel(Level.FINE);
```

- Turn on all levels: `logger.setLevel(Level.ALL);`
- Turn off logging: `logger.setLevel(Level.OFF);`

### Advanced Configurations and Advantages of Logging

Logging behavior can also be controlled externally using a configuration file. This allows you to adjust logging levels or direct output without modifying the code.

**Advantages of Logging:**

- **Structured Messages**: Logs provide timestamps, function names, and hierarchical organization.

- **Configurability**: Messages can be filtered by importance or category.

- **External Control**: Logging properties can be modified through configuration files.

- **Handlers**: Logs can be processed by external programs, enabling advanced features like filtering or formatting.
