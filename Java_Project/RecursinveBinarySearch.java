import java.util.Arrays;

public class RecursinveBinarySearch {
    public static void main(String[] args) {
        int arr[]=new int[]{1,2,3,4,54,3,22,4345,455,3,56,3,54,5,45,6,56,56,4,34,6,5,0,54,54,5,655,6};
        int target=655;
        Arrays.sort(arr);
        int index=binarySearch(arr,target,0,arr.length-1);
        System.out.println(index);
    }

    private static int binarySearch(int[] arr, int target, int start, int end) {
       
        if (start<=end) {
            int mid=start+(end-start)/2;
            if(arr[mid]==target){
                return mid;
            }
            if(arr[mid]>target){
                return binarySearch(arr, target, start, mid-1);
            }
            if(arr[mid]<target){
                return binarySearch(arr, target, mid+1, end);
            }
        }
        return -1;
    }
}
