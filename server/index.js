const express = require('express');
const app = express();
const router = require('./router');
//引入中间件
const bodyParser = require('body-parser');

// 请求体解析中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);

app.listen(8090, () => console.log('服务器运行在==>http://127.0.0.1:8090'));
