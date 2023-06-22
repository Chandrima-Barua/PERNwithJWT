const express = require('express');
const SampleController = express.Router();
const models = require('../models');
const { STATUSTEXT } = require('../config/settings');
const { canCreate, canViewAny, canView, canUpdate, canDelete } = require('../policies/SamplePolicy');

/*
* Shows all resources
*
* @method GET
*
*/

SampleController.get('/', async (req, res) => {
    if (!canViewAny(req.user)) {
        return res.status(403).send(STATUSTEXT.FORBIDDEN);
    }

    const users = await models.User.findAll()

    return res.status(200).send(users);
});

/*
* Shows a resource
*
* @method GET
* @param int id
*
*/

userRouter.get('/:id', async (req, res) => {
    const user = await models.Response.findByPk(req.params.id);

    if (!user) {
        return res.status(404).send({
            message: STATUSTEXT.NOTFOUND,
        });
    }

    if (!canView(req.user, user)) {
        return res.status(403).send(STATUSTEXT.FORBIDDEN);
    }

    return res.status(200).send(user);
});

/*
* Creates a resource
*
* @method POST
*
*/

userRouter.post('/create', (req, res) => {
    if (!canCreate(req.user)) {
        return res.status(403).send(STATUSTEXT.FORBIDDEN);
    }

    const data = {
        
    };

    models.User.create(data).then(user => {
        return res.status(201).send(user);
    }).catch(err => {
        return res.status(422).send({
            message: err.message || 'some error occurred while creating the model.'
        });
    });
});

/*
* Updates the resource
*
* @method PUT
* @param int id
*
*/

userRouter.put('/:id', async (req, res) => {
    const user = await models.User.findByPk(req.params.id);

    if (!user) {
        return res.status(404).send({
            message: STATUSTEXT.NOTFOUND,
        });
    }

    if (!canUpdate(req.user, user)) {
        return res.status(403).send(STATUSTEXT.FORBIDDEN);
    }

    if (typeof req.body.email !== 'undefined') {
        user.email = req.body.email;
    }

    //...

    await user.save();

    return res.status(200).send(user);
});

/*
* Deletes the resource
*
* @method DELETE
* @param int id
*
*/

userRouter.delete('/:id', async (req, res) => {
    const user = await models.User.findByPk(req.params.id);

    if (!user) {
        return res.status(404).send({
            message: STATUSTEXT.NOTFOUND,
        });
    }

    if (!canDelete(req.user, user)) {
        return res.status(403).send(STATUSTEXT.FORBIDDEN);
    }

    await user.destroy();

    return res.status(200).send(STATUSTEXT.DELETED);
});

module.exports = SampleController;