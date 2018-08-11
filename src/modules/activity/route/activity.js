/* npm modules */
let express = require('express');

/* local activity packages */
let activityLib = require('../controller/activity');
let routerMiddleware = require('../middleware/activity');

/* data variables */
let activityRouter = express.Router();

routerMiddleware.buildMiddleware(activityRouter);

/* Get the list of activities */
activityRouter.get('/', (req, res) => {
    activityLib.getAllActivities().then((response) => {
        res.status(response.code).json(response);
    }).catch((error) => {
        res.status(error.code).json(error);
    })
})

/* Edit the details of a activity */
activityRouter.put('/:activityId', (req, res) => {
    let updateInfo = {
        id: req.params.activityId,
        newValues: req.body.activityUpdateInfo
    }

    activityLib.updateactivity(updateInfo).then((response) => {
        res.status(response.code).json(response);
    }).catch((error) => {
        res.status(error.code).json(error);
    })
})

/* Add a activity to the list of activities */
activityRouter.post('/', (req, res) => {
    let activity = req.body.activity;

    activityLib.saveNewActivity(activity).then((response) => {
        res.status(response.code).json(response);
    }).catch((error) => {
        res.status(error.code).json(error);
    })
})

/* Delete a activity */
activityRouter.delete('/:activityId', (req, res) => {
    let activityId = req.params.activityId;

    activityLib.deleteActivity(activityId).then((response) => {
        res.status(response.code).json(response);
    }).catch((error) => {
        res.status(error.code).json(error);
    })
})

/* Get the details of a activity */
activityRouter.get('/:activityId', (req, res) => {
    let activityId = req.params.activityId;

    activityLib.getActivityById(activityId).then((response) => {
        res.status(response.code).json(response);
    }).catch((error) => {
        res.status(error.code).json(error);
    })
})

module.exports = {route: activityRouter, prefix: '/activity'};