import db from "../config/database.connection.js";
import { newUserSchema, existingUserSchema } from "../schemas/auth.schemas.js";
import bcrypt from "bcrypt";

export async function checkSignUp(req, res, next) {
    const user = req.body;
    const { email } = req.body;
    try {
        const { error } = newUserSchema.validate(user, { abortEarly: false });
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(422).send(errors);
        };
        const checkExistingUser = await db.query(` SELECT * FROM "users" WHERE email=$1`, [email]);
        if (checkExistingUser.rows.length > 0) {
            return res.status(409).send("User alredy exists");
        };

    } catch (err) {
        return res.status(500).send(err.message);
    }
    res.locals.user = user;
    next();
};

export async function checkSignIn(req, res, next) {
    const user = req.body;
    const { email, password } = req.body;
    
    try {
        const { error } = existingUserSchema.validate(user, { abortEarly: false });
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(422).send(errors);
        };
        const checkExistingUser = await db.query(` SELECT * FROM "users" WHERE email=$1`, [email]);
        if (checkExistingUser.rows.length === 0) {
            return res.status(409).send("Incorrect information");
        };
        const checkPassword = bcrypt.compareSync(password, checkExistingUser.rows[0].password);

        if (checkPassword === false) {
            return res.status(401).send("Este usuário não está autorizado a fazer login");
        };
        res.locals.user = checkExistingUser.rows[0];
    } catch (err) {
        return res.status(500).send(err.message);
    }

    next();
}