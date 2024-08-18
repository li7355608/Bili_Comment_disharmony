// ==UserScript==
// @name         中文评论混淆器，简单绕过评论审核
// @namespace    http://bilibili.com/
// @version      0.9
// @description  混淆中文评论并输出到控制台，并弹窗提示
// @author       Atri
// @match        *://*.bilibili.com/*
// @exclude      *://*.live.bilibili.com/*
// @exclude      *://*.space.bilibili.com/*
// @exclude      *://*.account.bilibili.com/*
// @exclude      *://*.member.bilibili.com/*
// @exclude      *://*.show.bilibili.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 创建按钮
    const button = document.createElement('button');
    button.textContent = '评论反和谐';
    Object.assign(button.style, {
        position: 'fixed',
        top: '150px',
        left: '10px',
        zIndex: '1000',
        padding: '10px 20px',
        backgroundColor: '#008CBA',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s'
    });

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
        '中': 'zhong ',
        '甜': '添',
        '这': '這',
        '有': 'you',
        '不': 'bu',
        '爱': '愛',
        '人': 'ren',
        '和': 'he',
        '国': '國',
        '大': 'da',
        '小': 'xiao',
        '天': 'tian ',
        '地': 'di',
        '一': 'yi ',
        '二': 'er',
        '三': 'san ',
        '四': 'si',
        '五': 'wu',
        '六': '6 ',
        '七': 'qi',
        '八': 'ba',
        '九': 'jiu ',
        '十': '10',
        '学习': '學習',
        '工作': 'gongzuo',
        '生活': 'shenghuo',
        '朋友': 'pengyou',
        '家': 'jia',
        '学校': 'xuexiao',
        '老师': 'laoshi',
        '学生': 'xuesheng',
        '电脑': 'diannao',
        '手机': 'shouji',
        '书': 'shu',
        '水': 'shui',
        '火': 'huo',
        '山': 'shan',
        '河': 'he',
        '海': 'hai',
        '风': 'feng',
        '雨': 'yu',
        '电': 'dian',
        '车': 'che',
        '飞机': 'feiji',
        '船': 'chuan',
        '猫': 'mao',
        '狗': 'gou',
        '鸟': 'niao',
        '鱼': 'yu',
        '树': 'shu',
        '花': 'hua',
        '草': 'cao',
        '太阳': 'taiyang',
        '月亮': 'moon ',
        '星星': 'star',
        '天空': 'Ari',
        '地球': 'diqiu',
        '城市': 'city',
        '村庄': 'cunzhuang',
        '国家': 'guo-jia ',
        '中国的': '美团吧',
        '中国': '美团',
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
        '工程师': 'gongchengshi',
        '科学家': 'kexuejia',
        '艺术家': 'yishujia',
        '作家': 'zuojia',
        '音乐家': 'yinyuejia',
        '演员': 'yanyuan',
        '导演': 'daoyan',
        '厨师': 'chushi',
        '司机': 'siji',
        '工人': 'worker',
        '农民': 'nongmin',
        '商人': 'shangren',
        '老板': 'laoban',
        '经理': 'HR',
        '秘书': 'mishu',
        '同事': 'tongshi',
        '客户': 'kehu',
        '顾客': 'guke'
    };

    // 定义不可见字符和随机字符
    const invisibleChars = ['\u200B', '\u200C', '\u200D']; // 零宽度字符
    const randomChars = ['[- 逆转裁判 -]', '[- 裁判逆转 -]', '[- 我要翻转 -]', '[- 天翻地覆 -]'];

    // 混淆函数
    function obfuscateText(text) {
        return text.split('').map(char => replacementMap[char] || char).join('');
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
        return text.split('').map(char => char + (Math.random() < 0.3 ? invisibleChars[Math.floor(Math.random() * invisibleChars.length)] : '')).join('');
    }

    // 创建自定义对话框
    function createCustomDialog(text) {
        const dialog = document.createElement('div');
        Object.assign(dialog.style, {
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: '1001',
            borderRadius: '8px',
            opacity: '0',
            transition: 'opacity 0.5s'
        });

        const message = document.createElement('p');
        message.textContent = '加密通话文本：' + text;
        dialog.appendChild(message);

        const copyButton = document.createElement('button');
        Object.assign(copyButton.style, {
            margin: '10px',
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        });
        copyButton.textContent = '一键复制';
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(text).then(() => {
                alert('加密的文本已复制到剪贴板');
                dialog.style.opacity = '0';
                setTimeout(() => document.body.removeChild(dialog), 500);
            });
        });

        const cancelButton = document.createElement('button');
        Object.assign(cancelButton.style, {
            margin: '10px',
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        });
        cancelButton.textContent = '关闭';
        cancelButton.addEventListener('click', () => {
            dialog.style.opacity = '0';
            setTimeout(() => document.body.removeChild(dialog), 500);
        });

        dialog.appendChild(copyButton);
        dialog.appendChild(cancelButton);

        document.body.appendChild(dialog);

        // 触发淡入效果
        setTimeout(() => {
            dialog.style.opacity = '1';
        }, 0);
    }

    // 按钮点击事件
    button.addEventListener('click', () => {
        const userInput = prompt('请输入要加密的文本:');
        if (userInput) {
            let obfuscated = obfuscateText(userInput);
            obfuscated = reverseRandomSegment(obfuscated);
            const finalResult = insertInvisibleChars(obfuscated);
            createCustomDialog(finalResult);
        }
    });
})();

