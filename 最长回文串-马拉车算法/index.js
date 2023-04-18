// gen by chatgpt
function longestPalindromicSubstring(str) {
  // 预处理字符串
  const processedStr = `#${str.split('').join('#')}#`;

  // 初始化数组
  const len = processedStr.length;
  const radius = new Array(len).fill(0);

  let center = 0; // 当前回文串中心
  let right = 0; // 当前回文串右边界

  // 开始扫描
  for (let i = 1; i < len - 1; i++) {
    // 根据回文性质推导出 radius[i] 的初始值
    if (right > i) {
      radius[i] = Math.min(right - i, radius[2 * center - i]);
    }

    // 针对 i 为中心位置，尝试扩展半径
    while (processedStr[i + radius[i] + 1] === processedStr[i - radius[i] - 1]) {
      radius[i]++;
    }

    // 更新当前回文串中心和右边界
    if (i + radius[i] > right) {
      center = i;
      right = i + radius[i];
    }
  }

  // 找到最长回文子串的起始位置和长度
  let start = 0;
  let maxLen = 0;
  for (let i = 1; i < len - 1; i++) {
    if (radius[i] > maxLen) {
      start = Math.floor((i - radius[i]) / 2);
      maxLen = radius[i];
    }
  }

  return str.slice(start, start + maxLen);
}