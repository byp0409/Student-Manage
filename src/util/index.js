// 导入token解析工具
import decode from 'jwt-decode';
export const token = tokenname => localStorage.getItem(tokenname);

// 解析权限
export const identity = token => decode(token).identity;
// 解析用户账户
export const account = token => decode(token).Sno;

// 手机号的表单验证
export const validatePhone = (rule, value, callback) => {
  if (value) {
    if (/^1/.test(value)) {
      if (/^1\d{10}$/.test(value)) {
        callback();
      } else {
        callback(new Error('请输入11位的手机号'));
      }
    } else if (/^0/.test(value)) {
      if (/^0\d{2,4}-?\d{6,9}$/.test(value)) {
        callback();
      } else {
        callback(new Error('请用0xxx-xxxxxxx格式'));
      }
    } else {
      callback(new Error('请输入11位手机号或0xxx-xxxxxxx格式座机号'));
    }
  } else {
    callback();
  }
};
