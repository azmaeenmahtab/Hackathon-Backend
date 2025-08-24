import {Router} from "express"
import { getAllStudentsController } from "./student.controller";

const studentRouter = Router();


studentRouter.get('/students-getAll', getAllStudentsController);

export  {studentRouter};