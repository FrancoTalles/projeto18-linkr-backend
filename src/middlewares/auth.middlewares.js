import db from "../config/database.connection.js";
import { newUserSchema } from "../schemas/auth.schemas.js";


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
}