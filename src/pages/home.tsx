import { ChangeEvent, useEffect, useState } from 'react';
import styles from '../styles/home.module.css';
import Button from '../components/Button/Button.js';
import InputField from '../components/Input/InputField';
import { useUser } from '../context/user-context';
import { updateUserService } from '../services/user';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [readOnly, setReadOnly] = useState(true);

  const { user, setUser } = useUser();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [user]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async () => {
    if (!user) return;
    if (name.length < 2 || name.length > 15) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    if (!/^1[3456789]\d{9}$/.test(phone)) return;

    try {
      setLoading(true);
      const res = await updateUserService({ ...user, name, email, phone });
      setUser(res.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.title}>Profile</div>

        <div className={styles.status}>
          <label htmlFor="status">{readOnly ? '只读' : '编辑'}</label>
          <input id="status" type="checkbox" checked={readOnly} onChange={() => setReadOnly(!readOnly)} />
        </div>

        <div className={styles.form}>
          <InputField
            label="用户名"
            id="username"
            name="name"
            value={name}
            onChange={handleNameChange}
            readOnly={readOnly}
            validations={[
              (val) => {
                if (!val) return '请输入用户名';
              },
              (val) => {
                if (val.length < 2 || val.length > 15) return '用户名需要满足大于1个字符，并且少于15个字符';
              },
            ]}
          />
          <InputField
            onChange={handleEmailChange}
            label="邮箱"
            id="email"
            value={email}
            readOnly={readOnly}
            validations={[
              (val) => {
                if (!val) return '请输入邮件';
              },
              (val) => {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return '邮箱格式不正确';
              },
            ]}
          />
          <InputField
            onChange={handlePhoneChange}
            label="手机号"
            id="phone"
            value={phone}
            readOnly={readOnly}
            validations={[
              (val) => {
                if (!val) return '请输入手机号';
              },
              (val) => {
                if (!/^1[3456789]\d{9}$/.test(val)) return '手机号格式不正确(仅支持中国手机号)';
              },
            ]}
          />
          <div className={styles.btnGroup}>
            <Button disabled={readOnly || !name || !email || !phone} isLoading={loading} onClick={handleSubmit}>
              提交
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
