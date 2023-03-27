/*
@PersonalInfoRoute.js
Copyright ( 2021 Jalasoft 2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information You shall not
disclose such Confidential Information and shall use it only ins
accordance with the terms of the license agreement you entered into
with Jalasoft
*/

const express = require('express');
const router = express.Router();
const PersonalInfoController = require('../controllers/PersonalInfoController.js');
const personalInfoController = new PersonalInfoController();

router.get(
    '/AllUsersInfo',
    personalInfoController.getAllInfo
);

router.put(
    '/AddInfo/:id',
    personalInfoController.addPersonalInfo
);
router.put(
    '/updateInfo/:id',
    personalInfoController.updatePersonalInfo
);
router.delete(
    '/remove/:id',
    personalInfoController.removePersonalInfo
);

module.exports = router;