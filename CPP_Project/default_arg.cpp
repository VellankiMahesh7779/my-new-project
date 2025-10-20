#include <iostream>
#include <string>
using namespace std;

// Function declaration: sum of 2 or 3 integers, z defaults to 0
int sum(int, int, int=0);
// Function declaration: greet with optional prefix (defaults to "Mr")
string greet(string name, string surname, string prefix="Mr");

int main(){
    // Call sum with 3 arguments
    cout << "Sum of x, y, z: " << sum(1,2,3) << endl;
    // Call sum with 2 arguments (z defaults to 0)
    cout << "Sum of x, y, z: " << sum(2,3) << endl;
    cout << "Sum of x, y, z: " << sum(3,4) << endl;
    // Call greet with default prefix
    greet("Mahesh","Vellanki");
    // Call greet with custom prefix
    greet("Captain", "MS Dhoni","Sir");
    // Example: would print prefix, name, surname
    //cout << prefix << name << surname << endl;
    return 0;
}

// Function definition: returns sum of x, y, z
int sum(int x, int y, int z){
    return x + y + z;
}

// Function definition: prints and returns greeting string
string greet(string name, string surname, string prefix){
    cout << prefix << " " << name << " " << surname << endl;
    return prefix + name + surname;
}