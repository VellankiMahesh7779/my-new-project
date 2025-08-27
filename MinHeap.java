import java.text.Normalizer.Form;
import java.util.Arrays;

public class MinHeap {
    int heap[];
    int size;
    int maxSize;
    static final int FRONT = 1;

    public MinHeap(int maxSize) {
        this.maxSize = maxSize;
        this.size = 0;
        heap = new int[maxSize + 1];
        Arrays.fill(heap, -1);
        heap[0] = Integer.MIN_VALUE;
    }

    private int parent(int pos) {
        return pos / 2;
    }

    private int leftChild(int pos) {
        return 2 * pos;
    }

    private int rightChild(int pos) {
        return (2 * pos) + 1;
    }

    private void swap(int pos1, int pos2) {
        int temp = heap[pos1];
        heap[pos1] = heap[pos2];
        heap[pos2] = temp;
    }

    private boolean isLeaf(int pos) {
        if (pos > size / 2)
            return true;

        return false;
    }

    private void insert(int val) {
        if (size >= maxSize)
            return;
        if (size >= maxSize)
            return;

        heap[++size] = val;

        int cur = size;
        while (heap[cur] < heap[parent(cur)]) {
            swap(cur, parent(cur));
            cur = parent(cur);
        }

    }

    private int remove() {

        int pop = heap[FRONT];

        heap[FRONT] = heap[size--];

        minHeapify(FRONT);
        return pop;
    }

    private void minHeapify(int pos) {
        if (!isLeaf(pos)) {
            int swapPos = pos;
            if (rightChild(swapPos) <= size)
                swapPos = heap[leftChild(swapPos)] < heap[rightChild(swapPos)] ? leftChild(swapPos)
                        : rightChild(swapPos);
            else
                swapPos = leftChild(swapPos);

            if (heap[pos] > heap[leftChild(pos)] || heap[pos] > heap[rightChild(pos)]) {
                swap(pos, swapPos);
                minHeapify(swapPos);
            }
        }
    }

    @Override
    public String toString() {
        return "MinHeap [heap=" + Arrays.toString(heap) + "]";
    }

    private void print() {
        for (int i = 1; i <= size / 2; i++) {
            System.out.printf("Parent : %d, left child: %d ,right child: %d ",
                    heap[i], heap[2 * i], heap[2 * i + 1]);
        }
    }

    public static void main(String[] args) {
        MinHeap minHeap = new MinHeap(10);
        minHeap.insert(1);
        minHeap.insert(21);
        minHeap.insert(9);
        minHeap.insert(5);
        minHeap.insert(0);

        System.out.println(minHeap.toString());
        minHeap.remove();
        System.out.println(minHeap.toString());
        minHeap.print();
    }
}
