import java.util.*;
public class AdjacentIncreasingSubarraysDetection {

    public boolean hasIncreasingSubarrays(List<Integer> nums, int k) {
        int n = nums.size();
        if (n < k * 2)
            return false;

        int j = 0;
        for (int i = k; i <= n - k; i++) {
            boolean found = true;

            for (int x = 0; x < k - 1; x++) {
                if (nums.get(j + x) >= nums.get(j + x + 1) || nums.get(i + x) >= nums.get(i + x + 1)) {
                    found = false;
                    break;
                }
            }
            j++;
            if (found)
                return true;
        }

        return false;

    }

}
