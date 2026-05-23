abstract class FruitsCategory{
    abstract String color(String color);
    abstract String shape(String shape);
    abstract float cost(float cost);
    abstract float getCost();
    abstract float setCost(float cost);
    
    
}
class Banana extends FruitsCategory{
float cost;
    @Override
    String color(String color) {
        return color;
    }

    @Override
    String shape(String shape) {
        return shape;
    }

    @Override
    float cost(float cost) {  
        this.cost=cost;
        return cost;
    }

    @Override
    float getCost() {
        // TODO Auto-generated method stub
        return this.cost;
    }

    @Override
    float setCost(float cost) {
        // TODO Auto-generated method stub
        this.cost=cost;
        return cost;
      
        
    }  
}
class Apple extends Banana{
float cost;
    @Override
    String color(String color) {
       
        return color;
    }

    @Override
    String shape(String shape) {
      
        return shape;
    }

    @Override
    float cost(float cost) {
       this.cost=cost;
        return cost;
    }
    @Override
    float getCost() {
        // TODO Auto-generated method stub
        return this.cost;
    }

    @Override
    float setCost(float cost) {
        // TODO Auto-generated method stub
        this.cost=cost;
        return cost;
      
        
    }  
    
    void compare(){
        String compare=(this.setCost(cost(cost))>super.setCost(super.cost(cost)))?"Apple is costly than banana":"Banana is costly than Apple";
        System.out.println(this.cost+" "+super.cost);
        System.out.println("compare: "+compare);
    }
    
}
class Fruits {
    public static void main(String[] args) {
        FruitsCategory fruitsCategory;
        fruitsCategory=new Banana();
     String color=   fruitsCategory.color("yellow");
      String shape=  fruitsCategory.shape("cylinder");

       float cost= fruitsCategory.cost(60);
       fruitsCategory.getCost();
       fruitsCategory.setCost(cost);
       System.out.println(color+" "+shape+" "+cost);
       FruitsCategory fruitsCategory2=new Apple();
       fruitsCategory2=new Apple();
       float cost2=fruitsCategory2.cost(400);
       fruitsCategory2.setCost(cost2);
     System.out.println( fruitsCategory.color("red")+" "+ fruitsCategory.shape("round")+" "+cost2);
      
       

       Apple apple=new Apple();
       apple.compare();

        
    }

}