import java.util.Scanner;

/**
 * Sum2
 */
public class Sum2 {

    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        String s1=sc.next();
        String s2=sc.next();
        String s3=sc.next();
        String s4=sc.next();
        String s5=sc.next();
     System.out.println( doCheck(s1,0));
        doCheck(s2,0);
        doCheck(s3,0);
        doCheck(s4,0);
        doCheck(s5,0);
      
    }

    private static int doCheck(String s,int n) {
        boolean b=true;
        for (int i = 0; i < s.length(); i++) {
            if(s.charAt(i)-'0'>=48&&s.charAt(i)-'0'<=57){
                b=true;
            }else{
                n=0;
                return n;
            }
            
        }
    
             return Integer.parseInt(s);
        
       // return n;
    }
}