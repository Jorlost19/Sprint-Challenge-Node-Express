const express = require('express');
const router = express.Router();
const dbActions = require('../data/helpers/actionModel');

router.get('/', (req, res) => {
  dbActions
    .get()
    .then(actions =>
      actions.length
        ? res.json(actions)
        : res.json({
            message:
              "We don't have any action for you right now, please try again later!"
          })
    )
    .catch(err =>
      res.status(500).json({
        error: 'We have an unexpected error while retrieving your actions!'
      })
    );
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  dbActions
    .get(id)
    .then(action =>
      action.id
        ? res.json(action)
        : res
            .status(404)
            .json({ error: 'There is no action with the specified ID' })
    )
    .catch(err =>
      res
        .status(500)
        .json({ error: 'Something went wrong retrieving your action!' })
    );
});

router.post('/', (req, res) => {
  const action = req.body;
  dbActions
    .insert(action)
    .then(action =>
      dbActions
        .get(action.id)
        .then(action =>
          action
            ? res.json(action)
            : res
                .status(404)
                .json({ error: 'There is no action with the specified ID' })
        )
    )
    .catch(err =>
      res
        .status(500)
        .json({ error: 'Something went wrong adding your action!' })
    );
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const action = req.body;
  dbActions
    .update(id, action)
    .then(action =>
      action
        ? dbActions.get(id).then(action => res.json(action))
        : res
            .status(404)
            .json({ error: 'There is no action with the specified ID!' })
    )
    .catch(err =>
      res
        .status(500)
        .json({ error: "Something went wrong updating your action's info" })
    );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  dbActions
    .remove(id)
    .then(count =>
      count
        ? res.json({ message: 'action successfully deleted!' })
        : res.status(404).json({
            error: "We couldn't find any action with the specified ID!"
          })
    )
    .catch(err =>
      res
        .status(500)
        .json({ error: 'Something went wrong deleting that action!' })
    );
});

module.exports = router;
