export function successData(data = null) {
  return {
    code: 200,
    data,
    message: 'response success',
  };
}

export function failData(code = 500, message = 'network busy, please try again later!') {
  return {
    code,
    message,
  };
}

export function validationUser(name: string, email: string, phone: string) {
  if (!name) {
    return '请输入用户名';
  }
  if (name.length < 2 || name.length > 15) {
    return '用户名需要满足大于1个字符，并且少于15个字符';
  }
  if (!email) {
    return '请输入邮件';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return '邮箱格式不正确';
  }
  if (!phone) {
    return '请输入手机号';
  }
  if (!/^1[3456789]\d{9}$/.test(phone)) {
    return '手机号格式不正确(仅支持中国手机号)';
  }
  return '';
}
