/**
 * OopsSample
 */
import java.util.*;
public class OopsSample {

    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int n1=0,n2=0,n3=0,n4=0,n5=0;
      try {
          n1='a';
          try {
              n2=sc.nextInt();
              try {
                  n3='a';
              } catch (Exception e) {
                  
              }
          } catch (Exception e) {
           
                System.out.println(n2);
            
          }
      } catch (Exception e) {
        
      }finally{
        System.out.println(n1);
    };
    System.out.println(n1+n2+n3);
    }
}