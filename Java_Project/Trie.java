
class TireNode {
    TireNode[] childrenNodes;
    boolean isWordEnd;

    public TireNode() {
        childrenNodes = new TireNode[26];
        for (int i = 0; i < childrenNodes.length; i++)
            childrenNodes[i] = null;

        isWordEnd = false;
    }
}

/**
 * Trie
 */
class TrieT {
    TireNode root;

    private void insert(String word) {
        int len = word.length();
        TireNode cur = root;
        for (int i = 0; i < len; i++) {
            int index = word.charAt(i) - 'a';
            if (cur.childrenNodes[index] == null)
                cur.childrenNodes[index] = new TireNode();
            cur = cur.childrenNodes[index];
        }
        cur.isWordEnd = true;
    }

    private boolean contains(String word) {
        int len = word.length();
        TireNode cur = root;
        int i = 0;
        for (; i < len; i++) {
            int index = word.charAt(i) - 'a';
            if (cur.childrenNodes[index] == null)
                return false;
            cur = cur.childrenNodes[index];

        }

        return i == len || cur.isWordEnd;
    }

    public static void main(String[] args) {

        TrieT t = new TrieT();
        t.root = new TireNode();
        t.insert("kiran");

        System.out.println(t.contains("kiran"));
    }

}