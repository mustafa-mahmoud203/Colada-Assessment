import { Router } from "express";
import UserController from "../controllers/user";

class UserRouters {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();

    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get("/", this.userController.users.bind(this.userController));
  }
}
export default new UserRouters().router;
