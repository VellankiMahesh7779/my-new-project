#include <iostream>
#include <string>
using namespace std;
int main()
{
    int i;
    string cars[4]={"volvo","Bmw","Tesla","Ford"};
    for(i=0;i<4;i++){
    cout<<i<<".\n"<<"name of the car="<<cars[i]<<"\n";
}
    return 0;
}