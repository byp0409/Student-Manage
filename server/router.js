const express = require('express');
const router = express.Router();
const sqlFn = require('./mysql');
// 密钥模块
const jwt = require('jsonwebtoken');
const config = require('./secert');

// 通过id获取用户信息，查询个人信息
router.get('/getUserInfo', (req, res) => {
  let Sno = req.query.Sno;
  let sql = 'SELECT * FROM userinfo WHERE Sno=?';
  sqlFn(sql, [Sno], result => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({
        status: 204,
        msg: '暂无数据',
      });
    }
  });
});

// 登录
router.post('/login', (req, res) => {
  let { Sno, password, identity } = req.body;
  let arr = [Sno, password];
  let sql = 'SELECT * FROM account WHERE Sno=? AND password= ?';
  sqlFn(sql, arr, result => {
    if (result.length > 0) {
      // 权限等级
      let identity = result[0].identity;
      // 生成token
      let token = jwt.sign(
        {
          // 携带权限等级和账号
          identity,
          Sno,
        },
        // 密钥
        config.jwtSecert,
        {
          // 7天有效
          expiresIn: '7days',
        }
      );
      // 返回结果
      res.send({
        status: 200,
        data: token,
      });
    } else {
      res.send({
        status: 204,
        msg: '登录失败',
      });
    }
  });
});

// 修改密码
// 用户身份校验？？
router.get('/modify/password', (req, res) => {
  let { Sno, newpassword } = req.query;
  let arr = [newpassword, Sno];
  // 选出该用户
  let sql = 'UPDATE account SET password= ? WHERE Sno=?';
  sqlFn(sql, arr, result => {
    // affectedRows修改的行数
    console.log(result);
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: '修改成功',
      });
    } else {
      res.send({
        status: 204,
        msg: '修改失败',
      });
    }
  });
});

// 管理员注册账号
router.post('/register', (req, res) => {
  let { Sno, Sname, Ssex, Sage, Stel, identity } = req.body;
  let arr = [Sno, Sname, Ssex, Sage, Stel, Sno, identity];
  // 执行多条语句需要开启multipleStatements   是否有最优解????
  let sql =
    'INSERT INTO userinfo VALUES (NULL,?,?,?,?,?);INSERT INTO account (Sno,identity) VALUES (?,?)';
  sqlFn(
    sql,
    arr,
    result => {
      // 插入成功
      if (result[0].affectedRows && result[1].affectedRows) {
        res.send({
          status: 200,
          msg: '添加成功',
        });
      }
    },
    fail => {
      res.send({
        status: 202,
        msg: '添加失败，用户名已被占用',
      });
    }
  );
});

// 查看全部学生信息
router.get('/allUserInfo', (req, res) => {
  let sql = 'SELECT * FROM userinfo';
  sqlFn(sql, null, result => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({
        status: 204,
        msg: '暂无学生数据',
      });
    }
  });
});

// 删除学生   多表删除？？
router.delete('/deleteUser', (req, res) => {
  let Sno = req.body.Sno;
  let arr = [Sno, Sno];
  let sql = 'DELETE FROM userinfo WHERE Sno= ?;DELETE FROM account WHERE Sno= ?';
  sqlFn(sql, arr, result => {
    if (result[0].affectedRows > 0) {
      res.send({
        status: 200,
        msg: '删除成功',
      });
    } else {
      res.send({
        status: 204,
        msg: '删除失败',
      });
    }
  });
});

// 修改个人信息，根据权限做出判定
router.get('/modify/userinfo', (req, res) => {
  let { Sname, Sno, Ssex, Sage, Stel, identity } = req.query;
  let arr = [];
  let sql = '';
  // 鉴权，管理员可修改姓名、性别、年龄、电话号
  if (identity == 1) {
    sql = 'UPDATE userinfo SET Sname=?,Ssex=?,Sage=?,Stel=? WHERE Sno=?';
    arr = [Sname, Ssex, Sage, Stel, Sno];
  } else if (identity == 0) {
    sql = 'UPDATE userinfo SET Sage=?,Stel=? WHERE Sno=?';
    arr = [Sage, Stel, Sno];
  }
  // console.log(arr);
  sqlFn(sql, arr, result => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: '修改成功',
      });
    } else {
      res.send({
        status: 204,
        msg: '修改失败',
      });
    }
  });
});
module.exports = router;
