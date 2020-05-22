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

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}

const controllers = {
  hello: (req, res) => {
    res.json({ api: "courses!" });
  },
  get_courses: async (req, res, next) => {
    try {
      const text = await readFile(DATA_DIR, "utf-8");
      if (text) {
        return res.send(JSON.parse(text));
      } else {
        return res.status(404).send("The courses file is empty!");
      }
    } catch (err) {
      return next(err);
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
        return res.send(course);
      } else {
        return res.status(404).send("The courses.json file is empty!");
      }
    } catch (err) {
      return next(err);
    }
  },
  post_course: async (req, res, next) => {
    let courses = [];
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
      const text = await readFile(DATA_DIR, "utf-8");
      if (text) {
        courses = JSON.parse(text);
      } else {
        return res.status(404).send("The courses.json file is empty!");
      }
    } catch (err) {
      return next(err);
    }
    const course = {
      id: courses.length + 1,
      name: req.body.name,
    };
    courses.push(course);
    try {
      await writeFile(DATA_DIR, JSON.stringify(courses), "utf-8");
      return res.send(course);
    } catch (err) {
      return next(err);
      //return res.status(500).send("Server error writing courses.json file!");
    }
  },
  put_course: async (req, res, next) => {
    let course = {};
    let courses = [];
    try {
      const text = await readFile(DATA_DIR, "utf-8");
      if (text) {
        courses = JSON.parse(text);
        course = courses.find((x) => x.id === parseInt(req.params.id));
        if (!course)
          return res
            .status(404)
            .send(`The course with id:${req.params.id} was not found!`);
      } else {
        return res.status(404).send("The courses.json file is empty!");
      }
    } catch (err) {
      return next(err);
    }
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    course.name = req.body.name;
    try {
      await writeFile(DATA_DIR, JSON.stringify(courses), "utf-8");
      return res.send(course);
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = controllers;
