

#### 1. Longest Palindromic Substring 

description:    

    Given a string s, find the longest palindromic substring in s.You may assume that the maximum length of s is 1000.

Example 1:

```
    Input: "babad"
    Output: "bab"
    Note: "aba"
    is also a valid answer.
```

Example 2:

```
    Input: "cbbd"
    Output: "bb"
```

solution:

```
    /**
     * @param {string} s
     * @return {string}
     */
    var longestPalindrome = function(s) {
        let mStart = 0;
        let mEnd = 0;
        let len = s.length;

        for (let i = 0; i < len; i++) {
            let left = i;
            let right = i;
            while (left > -1 && s[left] == s[i]) {
                left--;
            }
            while (right < len && s[right] == s[i]) {
                right++;
            }
            while (left > -1 && right < len && s[left] == s[right]) {
                left--;
                right++;
            }
            left += 1;
            right -= 1;
            if (right - left + 1 > mEnd - mStart) {
                mStart = left;
                mEnd = right;
            }
        }
        return s.substring(mStart, mEnd + 1);
    };
```

