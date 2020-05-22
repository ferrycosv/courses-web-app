"use strict";

const fs = require("fs");
const path = require("path");
const Joi = require("joi");
const util = require("util");

const config = require("../config");
const DATA_DIR = path.join(__dirname, "/..", config.DATA_DIR, "/courses.json");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readDir = util.promisify(fs.readdir);

const controllers = {
  hello: (req, res) => {
    res.json({ api: "courses!" });
  },
  get_courses: async (req, res, next) => {
    try {
      const text = await readFile(DATA_DIR, "utf-8");
      if (text) {
        res.send(JSON.parse(text));
      } else {
        res.status(404).send("The courses file is empty!");
      }
    } catch (err) {
      next(err);
    }
  },
  get_course_by_id: async (req, res, next) => {
    try {
      const text = await readFile(DATA_DIR, "utf-8");
      if (text) {
        const course = JSON.parse(text).find(
          (x) => x.id === parseInt(req.params.id)
        );
        if (!course)
          return res
            .status(404)
            .send(`The course with id:${req.params.id} was not found!`);
        res.send(course);
      } else {
        res.status(404).send("The courses.json file is empty!");
      }
    } catch (err) {
      next(err);
    }
  },
};

module.exports = controllers;
