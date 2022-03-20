/////////////////////////////////////
///////////// 密码校验区 /////////////
////////////////////////////////////
//
// 参考: https://www.html.cn/archives/8100
//

/**
 * 至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符
 */
const r001_01 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
const r001_01_2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/
const r001_02_3 =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/

/**
 * 至少8-16个字符，至少1个大写字母，1个小写字母和1个数字,不能包含特殊字符（非数字字母）
 */
const r001_02 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/

/**
 * 至少8-16个字符，至少1个字母，1个数字和1个特殊字符
 */
const r001_03 =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/
