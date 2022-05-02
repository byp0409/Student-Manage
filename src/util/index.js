// 导入token解析工具
import decode from 'jwt-decode';

export const identity = token => decode(token);
