import java.util.*;
class Sum{
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int n1=0,n2=0,n3=0,n4=0,n5=0;
       try {
            System.out.print("Enter num 1: ");
            n1=sc.next().charAt(0);
            System.out.print("Enter num 2: ");
            n2=sc.next().charAt(0);
            System.out.print("Enter num 3: ");
            n3=sc.next().charAt(0);
            System.out.print("Enter num 4: ");
            n4=sc.next().charAt(0);
            System.out.print("Enter num 5: ");
            n5=sc.next().charAt(0);
            
           n1=doCheck(n1, 0);
            
          
            n2=doCheck(n2, 0);
            
            n3=doCheck(n3, 0);
            n4=doCheck(n4, 0);
            n5=doCheck(n5, 0);
        } catch (Exception e) {
           System.out.println();
        }finally{System.out.println("sum : "+(n1+n2+n3+n4+n5));}
        }
        private static int doCheck(int c,int n){
            
            if(Character.isAlphabetic(c)){
                c=0;
            }else{
            c-='0';
                System.out.println("num 1 : "+c);
            }
            
            return c;

        }
}