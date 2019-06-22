# 练习原生js
 - [轮播图](#轮播图)
 - [万年历](#万年历)
 - [计算器](#计算器)
 - [node爬虫](#node爬虫)

## 轮播图
![图片](https://github.com/djping/practice/blob/master/imgs/slider.gif)
```
// 使用了data- 自定义属性， 为每张图设置一个独特的id
// 思路：根据按钮的值计算图片的索引，判断哪张图片的id等于索引， 则显示该图
```

## 万年历
 ![图](https://github.com/djping/practice/blob/master/imgs/calendar.gif)
 
 ```
  循序渐进实现万年历，先做了一个月的日历，然后一年的日历，最后万年历
 ```
## 计算器
 ![图](https://github.com/djping/practice/blob/master/imgs/calculator.gif)
 
## node爬虫
 ![图](https://github.com/djping/practice/blob/master/imgs/douban.gif)
```
//该demo对应douban.js
//爬取豆瓣电影top250
//使用了request库和cheerio库
//思路：使用request请求URL，cheerio处理网页，然后把数据传给movie类，使用JSON处理对象，最后写入文件中
//图片的下载：根据对象的每个图片URL，使用request.pipe即可下载图片

//使用前安装库：
npm install request cherrio

//命令行输入：
node douban.js
```
