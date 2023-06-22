'use_strict';

/*
* Checks whether the user can create a model.
*
* @param User user
*
*/
function canCreate(user) {
    return false;
}

/*
* Checks whether the user can view any model.
*
* @param User user
*
*/
function canViewAny(user) {
    return false;
}

/*
* Checks whether the user can view a specific model.
*
* @param User user
* @param User model
*
*/
function canView(user, model) {
    return false;
}

/*
* Checks whether the user can update a specific model.
*
* @param User user
* @param User model
*
*/
function canUpdate(user, model) {
    return false;
}

/*
* Checks whether the user can delete a specific model.
*
* @param User user
* @param User model
*
*/
function canDelete(user, model) {
    return false;
}

module.exports = {
    canCreate,
    canViewAny,
    canView,
    canViewStatistics,
    canUpdate,
    canDelete,
};
