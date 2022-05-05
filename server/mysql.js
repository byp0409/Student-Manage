//连接数据库  1.安装mysql 2.创建连接
const mysql = require('mysql');

//创建数据库连接
const client = mysql.createConnection({
  host: 'localhost', //数据域名 地址
  user: 'root', //用户名
  password: 'admin123',
  database: 'ms',
  port: '3306',
  // 允许同时执行多条sql语句
  multipleStatements: true,
  // 配置时区
  dateStrings: true,
});
//封装数据库操作语句 sql语句 参数数组arr，用在sql语句中的?占位符里  sucdess查询成功的回调  fail查询失败的回调
function sqlFn(sql, arr, success, fail) {
  // 数据库连接.query(sql语句,接收的数据,function(){响应结果})
  client.query(sql, arr, function (error, result) {
    if (error) {
      console.log('数据库语句错误' + error);
      fail(error);
      return;
    }
    success(result);
  });
}

module.exports = sqlFn;
