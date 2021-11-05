# 关于使用cancas中使用图片的问题

## 背景

在canvas中使用同一域名下的资源，是没什么安全性问题的，但是使用不同域下的资源，就有可能存在安全性问题，没处理好的话就会污染画布，导致资源依然能够在画布中使用，但是当在画布中调用一些方法的抛出安全错误。

这里主要以图片为例子去说明怎么解决这个问题

## canvas的安全性

参考：<https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_enabled_image>

## 如何在canvas中使用其他域的图片

主要分为三点：

### 1.img元素要设置crossorigin属性

参考：<https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img>

img元素默认是不开启CORS请求，设置了crossorigin属性，浏览器向浏览器加载图片的时候就会采取CORS模式。启用 CORS 的提跨域资源就可以在canvas正常使用，而不会污染画布了。

CORS模式加载的图片和img默认加载图片在请求头和响应头会有一些区别，比较明显的是请求头中会多origin字段，响应头中会多一Access-Control-Allow-Origin字段（前提是目标服务器设置了），其实就相当于img标签开启了CORS模式，对于加载的图片就多了CORS请求的一些配置，这些配置就会使得canvas认可了这些资源，可以正常使用了。

### 2.请求的图片允许跨域

在启用CORS请求跨域资源时，资源必须允许跨域，才能正常返回，后端设置，前端一般看响应头有没有Access-Control-Allow-Origin：*进行判断

### 3.使用js方式请求资源时，要注意浏览器缓存

满足第前两个条件一般就可以在canvas中正常使用其他域的图片了，但是有时候还会出现跨域问题，这个时候可以考虑浏览器缓存的问题，之前遇到一个问题就是，在一个页面中，页面中canvas需要使用的图片已经通过img标签加载过了，浏览器会默认缓存下来，当在canvas使用该图片的时候，由于地址一样，浏览器直接返回缓存的图片，如果缓存中的图片不是通过CORS请求或者响应头中不存在Access-Control-Allow-Origin，都会导致报错。

解决方法：

* img加载的图片加crossorigin属性

    ```html
    <img crossorigin="Anonymous" />
    ```

* js加载的图片地址加上一个时间戳，地址不一样了，浏览器就会重新请求新的资源，就不会去用缓存的。

    ```js
    image.src = url + '?time=' + new Date().valueOf();
    // 或者
    image.src = url + '?time=' + new Date().getTime();
    ```
