

import java.util.Scanner;

public class CalculateTotalPay {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter name of the employee");
        String name = sc.next();

        System.out.println("Enter base pay of the employee");
        double basePay = sc.nextDouble();

        System.out.println("Enter number of hours worked by the employee");
        int hoursWorked = sc.nextInt();

        CalculateTotalPay calculateTotalPay = new CalculateTotalPay();
        double salary = calculateTotalPay.calculateHourlyWages(basePay, hoursWorked);

        System.out.println("Name :: " + name);
        System.out.println("Base pay :: " + basePay + "$");
        System.out.println("Hours worked :: " + hoursWorked);
        System.out.println();
        System.out.println("Salary of employee :: " + salary + "$");
        sc.close();

    }
double wages=0;
    // Function to calculate wage of employee by analysing base pay and hours worked by employee
    public double calculateHourlyWages(double basePay, int hoursWorked) {
//DecimalFormat d=new DecimalFormat("#.###");
if(hoursWorked>=45&&hoursWorked<=60){
    hoursWorked+=5;
}
wages=basePay*hoursWorked;
        return wages;
    }
     //mahivellanki557@gmail
    // Function to estimate if an employee has worked more than 40 hrs to get overtime pay
    public boolean calculateOnHourlyBasis(int hoursWorked) {
        if(hoursWorked>40)
        return true;
        else
        return false;
    }
    // Function to check if base pay is more than minimum wage    
    public boolean checkBasePay(double basePay) {
        boolean basePayMoreThanMinimumWage = true;
        return basePayMoreThanMinimumWage;
    }
}