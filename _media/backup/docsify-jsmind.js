var defaultOptions = {
  "name": "docsify-jsmind",
  "author": "jxrory",
  "version": "0.1",
}

function showJsMind(id, data, meta) {
  var mind = {
    // 3 data formats were supported ...
    // see Documents for more information
    "meta": meta,
    "format": "node_array",
    "data": data
  };
  var options = {
    container: id,
    theme: 'primary',
    editable: false
  };
  var jm = new jsMind(options);
  jm.show(mind);
}

function plugin(hook, vm) {
  var userOptions = vm.config.mind;

  hook.init(function () {
    // 初始化完成后调用，只调用一次，没有参数。
  });

  hook.beforeEach(function (content) {
    // 每次开始解析 Markdown 内容时调用
    // ...
    // console.log(content);
    return content;
  });

  hook.afterEach(function (html, next) {
    // 解析成 html 后调用。
    // beforeEach 和 afterEach 支持处理异步逻辑
    // ...
    // 异步处理完成后调用 next(html) 返回结果
    // console.log(html);
    next(html);
  });

  hook.doneEach(function () {
    console.log(userOptions);
    // 每次路由切换时数据全部加载完成后调用，没有参数。
    // ...
    const minds = document.querySelectorAll('.lang-mind');
    console.log(minds);
    if (minds.length > 0) {
      minds.forEach((m, index) => {
        m.setAttribute('id', 'jsmind_c' + index);
        const m0j = eval("(" + m.innerText + ")");
        m.innerText = '';
        showJsMind('jsmind_c' + index, m0j, userOptions);
      });
    }
  });

  hook.mounted(function () {
    // 初始化并第一次加载完成数据后调用，只触发一次，没有参数。
  });

  hook.ready(function () {
    // 初始化并第一次加载完成数据后调用，没有参数。
  });
}

// Docsify plugin options
window.$docsify['mind'] = Object.assign(defaultOptions, window.$docsify['mind']);
window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins);
