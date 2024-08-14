// ==UserScript==
// @name         中文评论混淆器，简单绕过评论审核
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  混淆中文评论并输出到控制台，并弹窗提示
// @author       Your Name
// @match        *://*.bilibili.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 创建按钮
    const button = document.createElement('button');
button.textContent = '评论反和谐';
button.style.position = 'fixed';
button.style.top = '150px';
button.style.left = '10px';
button.style.zIndex = '1000';
button.style.padding = '10px 20px';
button.style.backgroundColor = '#008CBA';
button.style.color = 'white';
button.style.border = 'none';
button.style.borderRadius = '5px';
button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
button.style.cursor = 'pointer';
button.style.fontSize = '16px';
button.style.transition = 'background-color 0.3s';
button.addEventListener('mouseover', () => {
    button.style.backgroundColor = '#007B9E';
});
button.addEventListener('mouseout', () => {
    button.style.backgroundColor = '#008CBA';
});
document.body.appendChild(button);


    // 扩展的替换表
    const replacementMap = {
        '你': 'ni',
    '好': 'hao ',
    '是': '是',
    '的': 'de ',
    '我': 'wo ',
    '们': 'men ',
    '在': 'zai ',
    '穿': '串',
    '调': '眺',
    '年': '撵',
    '知': '☞',
    '中': '钟',
    '甜': '添',
    '这': '這',
    '有': '有',
    '不': 'bu',
    '爱': '愛',
    '人': '人',
    '和': '和',
    '中': 'zhong ',
    '国': '國',
    '大': '大',
    '小': '小',
    '天': 'tian ',
    '地': '地',
    '一': 'yi ',
    '二': '二',
    '三': 'san ',
    '四': '四',
    '五': '五',
    '六': 'liu ',
    '七': '七',
    '八': 'ba',
    '九': '九 ',
    '十': '十',
    '学习': '學習',
    '工作': '工作',
    '生活': '生活',
    '朋友': '朋友',
    '家': '家',
    '学校': '學校',
    '老师': '老師',
    '学生': '學生',
    '电脑': '電腦',
    '手机': '手機',
    '书': '書',
    '水': '水',
    '火': '火',
    '山': '山',
    '河': '河',
    '海': '海',
    '风': '風',
    '雨': '雨',
    '电': '電',
    '车': '車',
    '飞机': '飛機',
    '船': '船',
    '猫': '貓',
    '狗': '狗',
    '鸟': '鳥',
    '鱼': '魚',
    '树': '樹',
    '花': '花',
    '草': '草',
    '太阳': '太陽',
    '月亮': 'moon ',
    '星星': '星星',
    '天空': '天空',
    '地球': '地球',
    '城市': '城市',
    '村庄': '村莊',
    '国家': '國-jia ',
    '中国的': '美团吧',
    '中国': '美团',
    '语言': '語言',
    '文化': '文化',
    '历史': '歷史',
    '未来': '未來',
    '过去': '過去',
    '现在': '現在',
    '时间': '時間',
    '空间': '空間',
    '音乐': '音樂',
   '语言': 'language ',
    '文化': 'culture ',
    '历史': 'history ',
    '未来': 'future ',
    '过去': 'past ',
    '现在': 'now ',
    '时间': 'time ',
    '空间': 'space ',
    '音乐': 'music ',
    '电影': 'movie ',
    '电视': 'television ',
    '新闻': 'news ',
    '工程师': '工程師',
    '科学家': '科學家',
    '艺术家': '藝術家',
    '作家': '作家',
    '音乐家': '音樂家',
    '演员': '演員',
    '导演': '導演',
    '厨师': '廚師',
    '司机': '司機',
    '工人': 'worker',
    '农民': '農民',
    '商人': '商人',
    '老板': '老闆',
    '经理': 'HR',
    '秘书': '秘書',
    '同事': '同事',
    '客户': '客戶',
    '顾客': '顧客'
        // 可以根据需要继续添加
    };

   // 定义不可见字符和随机字符
    const invisibleChars = ['\u200B', '\u200C', '\u200D']; // 零宽度字符
    const randomChars = ['--夹着求积分--', '--求积分夹着--'];

    //可用混淆字符串 ['*', '#', '&', '--忽略数学求导数--', '--忽略求导--'];

    // 混淆函数
    function obfuscateText(text) {
        const chars = text.split('');
        return chars.map(char => replacementMap[char] || char).join('');
    }

    // 随机逆序函数
    function reverseRandomSegment(text) {
        const length = text.length;
        if (length < 2) return text;

        const start = Math.floor(Math.random() * (length - 1));
        const end = start + Math.floor(Math.random() * (length - start));

        const before = text.slice(0, start);
        const toReverse = text.slice(start, end + 1);
        const after = text.slice(end + 1);

        return before + randomChars[Math.floor(Math.random() * randomChars.length)] + toReverse.split('').reverse().join('') + randomChars[Math.floor(Math.random() * randomChars.length)] + after;
    }

    // 插入不可见字符
    function insertInvisibleChars(text) {
        const chars = text.split('');
        return chars.map(char => char + (Math.random() < 0.3 ? invisibleChars[Math.floor(Math.random() * invisibleChars.length)] : '')).join('');
    }

    // 按钮点击事件
    button.addEventListener('click', () => {
        const userInput = prompt('请输入要混淆的文本:');
        if (userInput) {
            let obfuscated = obfuscateText(userInput);
            obfuscated = reverseRandomSegment(obfuscated);
            const finalResult = insertInvisibleChars(obfuscated);
            console.log('混淆后的文本:', finalResult);
            alert('加密通话：' + finalResult);
        }
    });
})();