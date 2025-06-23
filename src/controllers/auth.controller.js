import { db } from "../lib/connection.js";
import { userValidator } from "../utils/validation.js";
import { hashPassword, verifyPassword } from "../lib/bcrypt.js";
import { signToken } from "../lib/jwt.js";

export class AuthController {
  static async register(req, res) {
    try {
      const { error, value } = userValidator.validate(req.body);
      if (error)
        return res.status(400).json({ message: error.details[0].message });

      const { first_name, last_name, phone, email, password, role_id } = value;

      const [existing] = await db.execute(
        "SELECT id FROM users WHERE email = ?",
        [email]
      );
      if (existing.length > 0)
        return res.status(409).json({ message: "User already exists" });

      const hashedPassword = await hashPassword(password);

      await db.execute(
        `INSERT INTO users (first_name, last_name, phone, email, password, role_id)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [first_name, last_name, phone, email, hashedPassword, role_id]
      );

      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ message: "Email and password required" });

      const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
      if (!users.length)
        return res.status(404).json({ message: "User not found" });

      const user = users[0];
      const isMatch = await verifyPassword(password, user.password);
      if (!isMatch)
        return res.status(401).json({ message: "Incorrect password" });

      const token = signToken({ id: user.id, role_id: user.role_id });

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone: user.phone,
          role_id: user.role_id,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
}
