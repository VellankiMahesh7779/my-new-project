#include <iostream>
using namespace std;

// Inline function to add two numbers
inline int add(int a, int b) {
    return a + b;
}

int main() {
    int x = 5, y = 10;

    // Call the inline function
    int sum = add(x, y);
    cout << "Sum: " << sum << endl;

    return 0;
}
/* What is an inline function?

An inline function is a function whose code is directly inserted (expanded) into the place where it’s called — instead of making a normal function call.

In other words:

When you call an inline function, the compiler replaces the call with the function’s actual code during compilation.*/