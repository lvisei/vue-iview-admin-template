# 部署

完成开发并且在开发环境验证之后，部署到服务器。

## 构建

先执行下面的命令

```bash
npm run build
```

也可以执行以下命令，查看打包分析

```bash
npm run build:r
```

打包完成后，`build` 命令会打包所有的资源，包含 JavaScript, CSS, web fonts, images, html 等。你可以在 `dist/` 目录下找到这些文件。

> 如果有使用 HTML5 History 请查看 [后端配置例子](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)。

## 本地验证

发布之前，可以通过 `serve` 做本地验证，

```
npm install -g serve
# -s 参数的意思是将其架设在 Single-Page Application 模式下
# 这个模式会处理即将提到的路由问题
serve -s dist
```

## 部署

接下来，我们可以把静态文件上传到服务器，如果使用 Nginx 作为 Web server，你可以在 `ngnix.conf` 中这样配置：

```
server
	{
		listen       80;
        # 指定可访问的域名
		server_name vue-iview-admin-temp.ywbang.top;
        # 编译后的文件存放的目录
		root  /home/www/vue-iview-admin-template/dist;

        # 因为前端使用了 HTML5 History，所以将路由 fallback 到 index.html
		location / {
				index  index.html;
				try_files $uri $uri/ /index.html;
		}
	}
```

重启 Web server，访问 [https://vue-iview-admin-temp.ywbang.top](https://vue-iview-admin-temp.ywbang.top) 。

```bash
nginx -s reload
```

类似的，如果你使用 Caddy 作为 Web server，你可以在 `Caddyfile` 中这样配置：

```
vue-iview-admin-temp.ywbang.top {
        gzip
        root /home/www/vue-iview-admin-template/dist
}
```
