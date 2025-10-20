// Include the input-output stream library for console operations
#include <iostream>
// Use the standard namespace to avoid prefixing std::
using namespace std;

// Function 1: Adds two integers
int add(int a, int b) {
    // Adds two int values and returns the result
    return a + b; // Return the sum of a and b
}

// Function 2: Adds two floating-point numbers
float add(float a, float b) {
    // Adds two float values and returns the result
    return a + b; // Return the sum of a and b
}

// Function 3: Adds three double-precision numbers
double add(double a, double b, double c) {
    // Adds three double values and returns the result
    return a + b + c; // Return the sum of a, b, and c
}

int main() {
    // Call the add() function with different argument types and counts

    int intResult = add(10, 20); // Call add(int, int) with 10 and 20, store result in intResult
    float floatResult = add(5.5f, 2.3f); // Call add(float, float) with 5.5 and 2.3, store result in floatResult
    double doubleResult = add(1.1, 2.2, 3.3); // Call add(double, double, double) with 1.1, 2.2, 3.3, store result in doubleResult

    // Output results
    cout << "Sum of two integers: " << intResult << endl; // Print the sum of two integers
    cout << "Sum of two floats: " << floatResult << endl; // Print the sum of two floats
    cout << "Sum of three doubles: " << doubleResult << endl; // Print the sum of three doubles

    return 0; // Indicate successful program termination
}