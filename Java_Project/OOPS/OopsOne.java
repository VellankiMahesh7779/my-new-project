/**
 * OopsOne
 */
class A{
    A getA(){
        return this;
    }
     void msg(){
        System.out.println("kiran vellanki");
    }}
public class OopsOne {
public static void main(String[] args) {
    new A().getA().msg();;
}
    
}