import java.net.http.HttpRequest;

public class MaxHeap {
    int heap[];
    int size;
    int maxSize;
    final int FRONT = 1;

    public MaxHeap(int maxSize) {
        this.maxSize = maxSize;
        this.size = 0;
        heap = new int[maxSize + 1];
        heap[0] = Integer.MAX_VALUE;
    }

    private int parent(int pos) {
        return pos / 2;
    }

    private int leftChild(int pos) {
        return pos * 2;
    }

    private int rightChild(int pos) {
        return (pos * 2) + 1;
    }

    private boolean isLeaf(int pos) {
        if (pos > size / 2)
            return true;
        return false;
    }

    private void swap(int pos1, int pos2) {
        int temp = heap[pos1];
        heap[pos1] = heap[pos2];
        heap[pos2] = temp;
    }

    private void insert(int val) {
        if (size >= maxSize)
            return;

        heap[++size] = val;
        int cur = size;
        while (heap[cur] > heap[parent(cur)]) {
            swap(cur, parent(cur));
            cur = parent(cur);
        }
    }

    private int remove() {
        int pop = heap[FRONT];
        heap[FRONT] = heap[size--];

        heapify(FRONT);
        return pop;
    }

    private void heapify(int pos) {
        if (!isLeaf(pos)) {
            int swapPos = pos;
            if (heap[rightChild(swapPos)] > heap[leftChild(swapPos)]) {
                swapPos = rightChild(swapPos);
            } else {
                swapPos = leftChild(swapPos);
            }
            if (heap[(pos)] < heap[leftChild(pos)] || heap[parent(pos)] < heap[(pos)]) {
                swap(pos, swapPos);
                heapify(swapPos);
            }
        }
    }

    private void print() {
        for (int i = 1; i <= size / 2; i++) {
            System.out.print("Parent: " + heap[i] + ", ");

            System.out.print("Left child: " + heap[i * 2] + ", ");

            System.out.print("Right child: " + heap[2 * i + 1]);

            System.out.println();
        }
    }

    public static void main(String[] args) {
        MaxHeap maxHeap = new MaxHeap(15);
        maxHeap.insert(1);
        maxHeap.insert(10);
        maxHeap.insert(5);
        maxHeap.insert(20);
        maxHeap.print();
        System.out.println(maxHeap.remove());
        maxHeap.insert(7);
        maxHeap.print();

    }
}
