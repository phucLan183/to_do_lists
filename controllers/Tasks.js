const util = require('util');
const db = require('../common/database');
const query = util.promisify(db.query).bind(db);

const home = async (req, res) => {
  try {
    const date = new Date().toDateString()
    const categories = "SELECT * FROM categories"
    const categoryRows = await query(categories)
    const tasks = "SELECT tasks.id, tasks.title, tasks.description, tasks.completed, tasks.create_at, categories.icon FROM tasks LEFT JOIN categories ON tasks.cat_id = categories.id"
    const taskRows = await query(tasks)
    const total = `SELECT COUNT(*) AS total, SUM(IF(tasks.completed, 1, 0)) AS completed, SUM(IF(tasks.completed, 0, 1)) AS unfinish FROM tasks`
    const rows_total = await query(total)
    const percent = Math.ceil(rows_total[0].completed / rows_total[0].total * 100)
    res.render('main', {
      dateNow: date,
      categoryRows: categoryRows,
      taskRows: taskRows,
      rows_total: rows_total,
      percent: percent,
    })
  } catch (error) {
    console.log(error);
  }
}

const indexAdd = async (req, res) => {
  try {
    const categories = "SELECT * FROM categories"
    const categoriesRows = await query(categories)
    res.render('add', {
      categoryRows: categoriesRows
    })
  } catch (error) {
    console.log(error);
  }
}

const addNew = async (req, res) => {
  try {
    const task = {
      title: req.body.title,
      description: req.body.description,
      cat_id: req.body.cat_id,
    }
    const sql = `INSERT INTO tasks(title, description, cat_id) VALUES(${db.escape(task.title)}, ${db.escape(task.description)}, ${db.escape(task.cat_id)})`
    const rows = await query(sql)
    res.redirect('/')
  } catch (error) { 
    console.log(error);
  }
}

const edit = async (req, res) => {
  try {
    const task_id = req.params.id
    const sql_task = `SELECT tasks.title, tasks.description, tasks.cat_id, categories.name FROM tasks LEFT JOIN categories ON tasks.cat_id = categories.id WHERE tasks.id = ${db.escape(task_id)}`
    const rows_task = await query(sql_task)
    const sql_category = `SELECT categories.id, categories.name FROM categories`
    const rows_category = await query(sql_category)
    res.render('edit', {
      rows_task: rows_task,
      rows_category: rows_category,
    })
  } catch (error) {
    console.log(error);
  }
}

const update = async (req, res) => {
  try {
    const task_id = req.params.id
    const task = {
      title: req.body.title,
      description: req.body.description,
      cat_id: req.body.cat_id,
    }
    const sql = `UPDATE tasks SET title = ${db.escape(task.title)}, description = ${db.escape(task.description)}, cat_id = ${db.escape(task.cat_id)} WHERE id = ${db.escape(task_id)}`
    const rows = await query(sql)
    res.redirect('/') 
  } catch (error) {
    console.log(error);
  }
}

const remove = (req, res) => {
  const task_id = req.params.id
  res.render('delete', {
    id: task_id
  })
}

const obliterate = async (req, res) => {
  try {
    const task_id = req.params.id
    console.log(task_id);
    const sql = `DELETE FROM tasks WHERE id = ${db.escape(task_id)}`
    const rows = await query(sql)
    console.log(rows);
    res.redirect('/')
  } catch (error) {
    console.log(error);
  }
}

const complete = async (req, res) => {
  try {
    const task_id = req.params.id
    const sql = `UPDATE tasks SET completed='1' WHERE id=${db.escape(task_id)}`
    const rows = await query(sql)
    res.redirect('/')
  } catch (error) {
    console.log(error);
  }
}

const restore = async (req, res) => {
  try {
    const task_id = req.params.id
    const sql = `UPDATE tasks SET completed='0' WHERE id=${db.escape(task_id)}`
    const rows = await query(sql)
    res.redirect('/')
  } catch (error) {
    console.log(error);
  }
}

const category = async (req, res) => {
  try {
    const categoryId = req.params.categoryId
    const date = new Date().toDateString()
    const categories = "SELECT * FROM categories"
    const categoryRows = await query(categories)
    const tasks = `SELECT tasks.id, tasks.title, tasks.description, tasks.completed, tasks.create_at, categories.icon FROM tasks LEFT JOIN categories ON tasks.cat_id = categories.id WHERE tasks.cat_id = ${categoryId}`
    const taskRows = await query(tasks)
    const total = `SELECT COUNT(*) AS total, SUM(IF(tasks.completed, 1, 0)) AS completed, SUM(IF(tasks.completed, 0, 1)) AS unfinish FROM tasks WHERE tasks.cat_id = ${categoryId}`
    const rows_total = await query(total) 
    const percent = Math.ceil(rows_total[0].completed / rows_total[0].total * 100) || 0
    res.render('main', {
      dateNow: date,
      categoryRows: categoryRows,
      taskRows: taskRows,
      rows_total: rows_total,
      percent: percent,
      categoryId: categoryId,
    })
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  home: home,
  indexAdd: indexAdd,
  addNew: addNew,
  edit: edit,
  update: update,
  remove: remove,
  obliterate: obliterate,
  complete: complete,
  restore: restore,
  category: category,
}