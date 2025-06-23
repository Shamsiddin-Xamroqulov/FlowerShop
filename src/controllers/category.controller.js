import { globalError } from "shokhijakhon-error-handler";
import { db } from "../lib/connection.js";

class CategoryController {
  constructor() {
    this.CREATE = async (req, res) => {
      try {
        const { name, description, count, img_url } = req.body;

        if (!name || !description || !img_url) {
          return res.status(400).json({ message: "Majburiy maydonlar to‘liq emas!" });
        }

        const [result] = await db.execute(
          `INSERT INTO category (name, description, count, img_url) VALUES (?, ?, ?, ?)`,
          [name, description, count || 0, img_url]
        );

        return res.status(201).json({
          message: "Kategoriya muvaffaqiyatli yaratildi!",
          id: result.insertId,
        });
      } catch (err) {
        return globalError(err, res);
      }
    };

    this.GET_ALL = async (req, res) => {
      try {
        const [categories] = await db.execute(`SELECT * FROM category`);
        return res.json(categories);
      } catch (err) {
        return globalError(err, res);
      }
    };

    this.GET_ONE = async (req, res) => {
      try {
        const { id } = req.params;
        const [rows] = await db.execute(`SELECT * FROM category WHERE id = ?`, [id]);

        if (rows.length === 0) {
          return res.status(404).json({ message: "Kategoriya topilmadi" });
        }

        return res.json(rows[0]);
      } catch (err) {
        return globalError(err, res);
      }
    };

    this.UPDATE = async (req, res) => {
      try {
        const { id } = req.params;
        const { name, description, count, img_url } = req.body;

        const [check] = await db.execute(`SELECT * FROM category WHERE id = ?`, [id]);
        if (check.length === 0) {
          return res.status(404).json({ message: "Kategoriya topilmadi" });
        }

        await db.execute(
          `UPDATE category SET name = ?, description = ?, count = ?, img_url = ? WHERE id = ?`,
          [name, description, count, img_url, id]
        );

        return res.json({ message: "Kategoriya yangilandi" });
      } catch (err) {
        return globalError(err, res);
      }
    };

    this.DELETE = async (req, res) => {
      try {
        const { id } = req.params;

        const [check] = await db.execute(`SELECT * FROM category WHERE id = ?`, [id]);
        if (check.length === 0) {
          return res.status(404).json({ message: "Kategoriya topilmadi" });
        }

        await db.execute(`DELETE FROM category WHERE id = ?`, [id]);
        return res.json({ message: "Kategoriya o‘chirildi" });
      } catch (err) {
        return globalError(err, res);
      }
    };
  }
}

export default new CategoryController();
