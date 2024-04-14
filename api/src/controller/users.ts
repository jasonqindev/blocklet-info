import { Request, Response } from 'express';
import Users from '../models/users';
import { successData, failData, validationUser } from '../utils';

class UserController {
  async find(_: Request, res: Response) {
    const users = await Users.find();
    res.json(successData(users));
  }

  async findById(req: Request, res: Response) {
    const user = await Users.findById(req.params.id);
    if (!user) {
      res.status(404).json(failData(404, '用户不存在！'));
    }
    res.json(successData(user));
  }

  async create(req: Request, res: Response) {
    const { email, phone, name } = req.body;
    const validated = validationUser(name, email, phone);
    if (validated) {
      res.status(400).json(failData(400, validated));
    }
    const repeatedUser = await Users.findOne({ email });
    if (repeatedUser) {
      res.status(404).json(failData(404, '邮件已被使用，请更换邮箱尝试！'));
    }
    await new Users(req.body).save();
    res.json(successData());
  }

  async update(req: Request, res: Response) {
    const { email, phone, name } = req.body;
    const id = req.params.id;

    const validated = validationUser(name, email, phone);
    if (validated) {
      res.status(400).json(failData(400, validated));
    }

    const user = await Users.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      res.status(404).json(failData(404, '用户不存在！'));
    }

    res.json(successData(user));
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    const user = await Users.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json(failData(404, '用户不存在！'));
    }
    res.json(successData());
  }
}

module.exports = new UserController();
