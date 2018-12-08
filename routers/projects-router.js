const express = require('express');
const router = express.Router();
const dbProjects = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
  dbProjects
    .get()
    .then(projects =>
      projects.length
        ? res.json(projects)
        : res.json({
            message:
              "We don't have any project for you right now, please try again later!"
          })
    )
    .catch(err =>
      res.status(500).json({
        error: 'We have an unexpected error while retrieving your projects!'
      })
    );
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  dbProjects
    .get(id)
    .then(project =>
      project
        ? res.json(project)
        : res
            .status(404)
            .json({ error: 'There is no project with the specified ID!' })
    )
    .catch(err =>
      res.status(500).json({
        error: 'We have an unexpected error while retrieving your project!'
      })
    );
});

router.get('/:id/actions', (req, res) => {
  const { id } = req.params;
  dbProjects
    .getProjectActions(id)
    .then(projectActions =>
      projectActions.length
        ? res.json(projectActions)
        : res.json({ message: 'This project has no Action yet!' })
    )
    .catch(err =>
      res.status(500).json({
        error: "Something went wrong retrieving your project's Actions"
      })
    );
});

router.post('', (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: 'Add a valid Name!' });
  }
  dbProjects
    .insert({ name })
    .then(project =>
      dbProjects.get(project.id).then(project => res.status(201).json(project))
    )
    .catch(err =>
      res
        .status(500)
        .json({ error: 'Something went wrong trying to add the new project!' })
    );
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const project = req.body;
  dbProjects
    .update(id, project)
    .then(project =>
      project
        ? dbProjects.get(id).then(project => res.json(project))
        : res
            .status(404)
            .json({ error: 'There is no project with the specified ID!' })
    )
    .catch(err =>
      res
        .status(500)
        .json({ error: "Something went wrong updating your project's info" })
    );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  dbProjects
    .remove(id)
    .then(count =>
      count
        ? res.json({ message: 'project successfully deleted!' })
        : res.status(404).json({
            error: "We couldn't find any project with th specified ID!"
          })
    )
    .catch(err =>
      res
        .status(500)
        .json({ error: 'Something went wrong deleting that project!' })
    );
});

module.exports = router;
