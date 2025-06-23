import {Router} from "express";
import categoryController from "../controllers/category.controller.js"
import {validateCategory} from "../middlewares/category.middlaware.js"

export const categoryRouter = Router();

categoryRouter.post("/create", validateCategory, categoryController.CREATE);
categoryRouter.get("/getAll", categoryController.GET_ALL);
categoryRouter.get("/getById/:id", categoryController.GET_ONE);
categoryRouter.put("/update/:id", categoryController.UPDATE);
categoryRouter.delete("/delete/:id", categoryController.DELETE);