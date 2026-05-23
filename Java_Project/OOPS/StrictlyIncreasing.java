import java.util.Arrays;

class StrictlyIncreasing{
    public static void main(String[] args) {
        int arr[]=new int[]{10,9,2,5,3,7,101,18};
        System.out.println(doCount(arr));
    }

    private static int doCount(int[] arr) {
        int count=Integer.MIN_VALUE;
        int arr2[]=new int[arr.length];
        Arrays.fill(arr2, 1);
        for (int i = 0; i < arr2.length; i++) {
            for (int j = 0; j < i; j++) {
                if(arr[j]<arr[i]){
                    int a=arr[j];
                    int b=arr[i];
                    arr2[i]=Math.max(arr2[i], arr2[j]+1);
                }
                
            }
            
            
        }
        for (int j = 0; j < arr2.length; j++) {
                count=Math.max(count, arr2[j]);
        }
        return count;
    }
}