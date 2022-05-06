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

// 修改密码  用户身份后端校验？？
router.get('/modify/password', (req, res) => {
  let { Sno, newpassword, password } = req.query;
  let arr = [newpassword, Sno, password];
  // 选出该用户
  let sql = 'UPDATE account SET password= ? WHERE Sno=? AND password=?';
  sqlFn(sql, arr, result => {
    // affectedRows修改的行数
    // console.log(result);
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

// 管理员注册账号  校验用户名唯一性
router.post('/register', (req, res) => {
  let { Sno, Sname, Ssex, Sage, Stel, identity } = req.body;
  let arr = [Sno, Sname, Ssex, Sage, Stel, Sno, identity];
  let sql =
    'INSERT INTO userinfo VALUES (NULL,?,?,?,?,?,NULL,NULL);INSERT INTO account (Sno,identity) VALUES (?,?)';
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

// 删除学生
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

// 发布任务
router.get('/releasetask', (req, res) => {
  let { Tname } = req.query;
  let sql = 'INSERT INTO task (Tname) VALUES (?);SELECT time FROM task WHERE Tname=?;';
  let arr = [Tname, Tname];
  if (Tname == '') {
    res.send({
      status: 400,
      msg: '不能发布空任务',
    });
  } else {
    sqlFn(sql, arr, result => {
      if (result[0].affectedRows > 0) {
        res.send({
          status: 200,
          msg: '添加成功',
        });
      } else {
        res.send({
          status: 204,
          msg: '添加失败',
        });
      }
    });
  }
});

// 获取任务
router.get('/gettask', (req, res) => {
  // 获取任务和学生总数量，计算用于计算百分比
  let sql = 'SELECT * FROM task ORDER BY tid desc;SELECT COUNT(*) FROM userinfo;';
  sqlFn(sql, null, result => {
    // 用户总数
    let usertotal = result[result.length - 1][0]['COUNT(*)'];
    // 所有任务
    let alltask = result[0];
    if (result.length > 0) {
      res.send({
        status: 200,
        usertotal,
        alltask,
      });
    } else {
      res.send({
        status: 204,
        msg: '查询失败',
      });
    }
  });
});

// 删除任务
router.delete('/deletetask', (req, res) => {
  let { tid } = req.body;
  let arr = [tid];
  sql = 'DELETE FROM task WHERE tid=?;';
  sqlFn(sql, arr, result => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: '删除成功',
      });
    } else {
      res.send({
        status: 204,
        msg: '为查询到数据',
      });
    }
  });
});

// 标记完成,更新完成度
router.post('/updatecomplete', (req, res) => {
  // 学号，姓名，任务id
  let { completes, tid } = req.body;
  // 数组序列化
  // let complete = JSON.stringify(completes);
  arr = [completes, tid];
  let sql = 'UPDATE task SET complete=? WHERE tid=?';
  sqlFn(sql, arr, result => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: '更新成功',
      });
    } else {
      res.send({
        status: 204,
        msg: '更新失败',
      });
    }
  });
});

// 获取某任务的完成情况
router.get('/getcomplete', (req, res) => {
  let { tid } = req.query;
  let arr = [tid];
  let sql = 'SELECT complete FROM task WHERE tid=?';
  sqlFn(sql, arr, result => {
    if (result.length > 0) {
      let string = result[0].complete;
      if (string == null) {
        res.send({
          status: 204,
          msg: '获取失败',
        });
      } else {
        let complete = string.split('|');
        res.send({
          status: 200,
          complete,
        });
      }
    }
  });
});

// 发布每周学习技术点
router.post('/releaseknowledge', (req, res) => {
  let { knowledge } = req.body;
  let arr = [knowledge];
  let sql = 'UPDATE userinfo SET Scase=?,Scase1=NULL';
  sqlFn(sql, arr, result => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: '发布成功',
      });
    } else {
      res.send({
        status: 204,
        msg: '发布失败',
      });
    }
  });
});

// 学生更新自己的学习情况
router.get('/updateknowledge', (req, res) => {
  let { Sno, Scase1 } = req.query;
  let arr = [Scase1, Sno];
  let sql = 'UPDATE userinfo SET Scase1=? WHERE Sno=?;';
  sqlFn(sql, arr, result => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: '更新成功',
      });
    } else {
      res.send({
        status: 204,
        msg: '更新失败',
      });
    }
  });
});

// 获取需要掌握的内容
router.get('/getaknowledge', (req, res) => {
  let { Sno } = req.query;
  let arr = [Sno];
  let sql = 'SELECT Scase FROM userinfo WHERE Sno=?';
  sqlFn(sql, arr, result => {
    if (result.length > 0) {
      let Scase = result[0].Scase;
      res.send({
        status: 200,
        Scase,
      });
    } else {
      res.send({
        status: 204,
        msg: '暂无该学生信息',
      });
    }
  });
});

// 获取某个学生的学习情况   弃用
router.get('/getstuknowledge', (req, res) => {
  let { Sno } = req.query;
  let arr = [Sno];
  let sql = 'SELECT Scase1 FROM userinfo WHERE Sno=?';
  sqlFn(sql, arr, result => {
    let stuscase = result[0].Scase1;
    if (result.length > 0 || result[0].Scase1 !== null) {
      res.send({
        status: 200,
        stuscase,
      });
    } else {
      res.send({
        status: 204,
        msg: '该学生尚未填写',
      });
    }
  });
});

module.exports = router;
