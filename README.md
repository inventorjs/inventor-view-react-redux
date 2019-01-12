# inventor-view-react-redux 视图引擎
将视图渲染逻辑从核心框架独立出来，提供更高的灵活性，提供多样试图的支持。如以后需要支持(ejs, vue等)，只需要新开发一套试图引擎，并且在业务配置文件配置相应的视图引擎就可以，提供足够的灵活性。

## Features

- inventor-view-react-redux/server 提供 server 端渲染功能，实现核心 response.render 方法
- inventor-view-react-redux/web  提供 web 端渲染功能，并且提供打包文件的入口模版


## Installing

```bash
$ npm install inventor-view-react-redux
```

## Example
以下示例已经封装在核心框架内部，业务代码开发人员不需要关心具体细节，对外暴露的接口是透明的。

### server

```js
    import ViewEngine from 'inventor-view-react-redux/server'

    const engine = new ViewEngine({
        appPath: ..., // 引用模块的路径
        commonPath: ..., // 公共模块的路径
        vendorPath: ..., // 第三方模块的路径
    })

    // 渲染应用页面
    engine.render('appName', {})

    // 获取渲染的内容字符串
    const html = engine.renderString('appName', {})
```

### web
```js
    import ViewEngine from 'inventor-view-react-redux/web'

    const engine = new ViewEngine()

    // 渲染客户端内容
    engine.render()

    // 获取应用入口模版(用于 inventor-dev 自动生成打包入口代码)
    const entryTpl = engine.getEntryTpl({ appPath, webPath })

```