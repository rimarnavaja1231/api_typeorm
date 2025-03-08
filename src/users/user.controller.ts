import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { Role } from "../helpers/role";
import { validateRequest } from "../middleware/validate-request";
import { userService } from "./user.service";

const router = express.Router();

// Routes
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createSchema, create);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

// Route functions
function getAll(req: Request, res: Response, next: NextFunction) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getById(req: Request, res: Response, next: NextFunction) {
  userService
    .getById(Number(req.params.id))
    .then((user) => res.json(user))
    .catch(next);
}

function create(req: Request, res: Response, next: NextFunction) {
  userService
    .create(req.body)
    .then(() => res.json({ message: "User created successfully" }))
    .catch(next);
}

function update(req: Request, res: Response, next: NextFunction) {
  userService
    .update(Number(req.params.id), req.body)
    .then(() => res.json({ message: "User updated successfully" }))
    .catch(next);
}

function _delete(req: Request, res: Response, next: NextFunction) {
  userService
    .delete(Number(req.params.id))
    .then(() => res.json({ message: "User deleted successfully" }))
    .catch(next);
}

// Schema validation functions
function createSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    title: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().valid(Role.Admin, Role.User).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  });

  validateRequest(req, next, schema);
}

function updateSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    title: Joi.string().empty(""),
    firstName: Joi.string().empty(""),
    lastName: Joi.string().empty(""),
    role: Joi.string().valid(Role.Admin, Role.User).empty(""),
    email: Joi.string().email().empty(""),
    password: Joi.string().min(6).empty(""),
    confirmPassword: Joi.string().valid(Joi.ref("password")).empty(""),
  }).with("password", "confirmPassword");

  validateRequest(req, next, schema);
}

export default router;
