const {ObjectId} = require('mongodb'); 

let mongodbObjectIdValidate = (id) => {
	return (ObjectId.isValid(id)) ? true : false
}

let mongodbObjectIdArrayValidate = (ids) => {
	return ids.map((id) => mongodbObjectIdValidate(id)).includes(false) ? false : true
}

let nullUndefinedValidate = (variable) => {
	return (variable != null && variable != undefined) ? true : false
}

let nullUndefinedValidateVariablesArray = (variables) => {
	for (var elem in variables) {
		if (!nullUndefinedValidate(elem)) {
			return false;
		}
	}

	return true;
}

let emptyStringValidate = (variable) => {
	return variable != '' ? true : false
}

let emptyStringValidateVariablesArray = (variables) => {
	for (var elem in variables) {
		if (!emptyStringValidate(elem)) {
			return false
		}
	}

	return true;
}

let nullValidate = (variable) => {
	return variable != null ? true : false
}

let undefinedValidate = (variable) => {
	return variable != undefined ? true : false
}

let successStatusValidate = (variable) => {
	return variable.status ? true : false
}

let objectArrayNullUndefinedValidate = (nullUndefinedValidateCandidates, emptyStringValidateCandidates) => {
	if (!nullUndefinedValidateVariablesArray(nullUndefinedValidateCandidates)) {
		return false; 
	}

	if (!emptyStringValidateVariablesArray(emptyStringValidateCandidates)) {
		return false
	}

	return true;
}

module.exports = {
	nullUndefinedValidate: nullUndefinedValidate,
	emptyStringValidate: emptyStringValidate,
	nullValidate: nullValidate,
	undefinedValidate: undefinedValidate,
	successStatusValidate: successStatusValidate,
	objectArrayNullUndefinedValidate: objectArrayNullUndefinedValidate,
	mongodbObjectIdValidate: mongodbObjectIdValidate,
	mongodbObjectIdArrayValidate: mongodbObjectIdArrayValidate

}
