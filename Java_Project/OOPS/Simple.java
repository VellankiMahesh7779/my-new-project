// Encapsulation: 
// -------------
//  ->it refers to the bundiling data with methods that can operate on that data within the calss.
//  ->Ecentially, it is idea of hiding the data within the class. preventing anything outside that
//    class from directly interating with it.
//  ->however, we can interat with other objects with the help of getters and setters.
// Example:
// --------
abstract class phone{
    private float charge;
   private String name;
  private  String type;
   private boolean working;

   public void setName(String name){
    this.name=name;
}
//getter
public String getName(){
    return name;
}
public void setCharge(float charge){
    this.charge=charge;
}
//getter
public float getCharge(){
    return charge;
}
    
}

class Simple extends phone{
   private  int age;
   private  String name;
   private  int cls;
    
     public Simple(){
         System.out.println("hey there!!");
     }
    
    //setter
    public void setName(String name){
        this.name=name;
    }
    //getter
    public String getName(){
        return name;
    }
    //setter
    public void setAge(int age){
        this.age=age;
    }
    //getter
    public int getAge(){
        return age;
    }
    public void setCls(int cls){
        this.cls=cls;
    }
    public int getCls(){
        return cls;
    }
    @Override
    public void setCharge(float charge){
         
    }
    

    public static void main(String[] args) {
        //s->instance of the class--> Object
        Simple s=new Simple();
        //accessing data
        s.setName("kiran vellanki");
        String name=s.getName();
        s.setAge(21);
        int age=s.getAge();
        s.setCls(15);
        s.setCharge(30);

      
        
        System.out.println("name: "+name+" \nage: "+age+" \nclass: "+s.getCls()+" "+s.getCharge());

    }
}