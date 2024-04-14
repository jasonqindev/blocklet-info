# Blocklet 测试题

## 前端

#### 介绍

前端主要功能是，在页面中实现了用户的用户名、邮箱、手机号的显示，并且可以对这些字段进行修改。并且在输入过程中和提交表单阶段都对表单数据进行了校验。 (数据库中已经预创建了一个用户， 并用这个用户的ID来进行读取和删除操作)

**InputField组件验证介绍：**

支持传入多个验证规则。

在当前input失去焦点后，会立马对input字段进行规则校验，如果有错，则提示错误信息，并保存当前的校验规则。

当用户在提示错误的input中修改时，会一直都用户的最新input值进行校验，直到通过当前校验规则后，错误提示消失。

```typescript
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
```

#### 目录结构

前端项目相关的都放在了/src文件夹下

```bash
component/  						# 封装的组件
	Button/          			# 用于提交表单的Button
		Button.module.css
		Button.tsx
	Icon/									# 用于提交表单请求过程中的loading效果
		Spin.tsx
	Input/								# 带有表单验证的Input组件
		InputField.module.css
		InputField.tsx
context/
	user-context.tsx			# context用于全局共享user信息
pages/
	home.tsx							# 用户信息页面
services/
	http.ts								# 封装了axios请求
	user.ts								# 获取用户信息，和修改用户信息接口封装
styles/
	app.css
	home.module.css
types/
	icon.ts
	index.d.ts
```

## 后端

#### 介绍

后端主要功能是，连接远程mongoDB数据库，对外暴露API请求，来操作用户的读取、新增、修改、更新、删除的操作。

#### 目录结构

后端项目相关的都放在了/api/src文件夹下

```bash
controller/  						# 业务层处理
	users.ts							# 在这里处理具体的用户的读取、新增、修改、更新、删除的操作并将结果以json形式返回
models/
	users.ts							# 创建users的数据模型，并规定字段
routes/
	index.ts							# routes文件夹下存放了对外开放的api接口地址
utils/
	config.ts							# config文件中存放了数据库连接相关数据
	index.ts							# index文件中存放了封装的通用函数，比如成功请求、失败请求
index.ts
```

遵守RestfulAPI规范定义了如下几个接口：

- 获取全部用户：/api/users **get**
- 创建用户：/api/users **post**
- 获取特定用户：/api/users/:id. **get**
- 更新用户：/api/users/:id **put**
- 删除用户：/api/users/:id **delete**
