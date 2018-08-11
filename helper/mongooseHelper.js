const { ObjectId } = require('mongodb');
let validator = require('./validator');
let resources = require('../res/res.json');
let myUtils = require('./utils');

let aggregate = (collectionObj, queryPipeline, collectionName) => {
	let mongooseAggregate = collectionObj.aggregate(queryPipeline);

	let docSuccess = myUtils.makeResponseObj(200, collectionName + resources.db_fetch_success, null, resources.success_response_obj);
	let docError = myUtils.makeResponseObj(400, resources.db_fetch_fail, null, resources.fail_response_obj);

	return mongooseAggregate.then((result) => {
		if (!validator.nullUndefinedValidate(result)) {
			return docError;
		}

		docSuccess.data = result;
		return docSuccess;
	}).catch((error) => {
		docError.error = error;
		return docError;
	})
}

/**
 * Finds a single document and select specified fields
 * 
 * @param {mongoose.Schema} collectionObj 
 * @param {*} queryObj 
 * @param {*} selectQuery 
 * @param {string} collectionName 
 */
let findOneAndSelect = (collectionObj, queryObj, selectQuery, collectionName) => {
	if (!validator.objectArrayNullUndefinedValidate([collectionObj, queryObj, selectQuery, collectionName], [collectionName])) {
		return myUtils.rejectPromise(400, resources.db_fetch_fail)
	}

	let fetchDocument = collectionObj.findOne(queryObj, selectQuery);

	let fulfillPromise = myUtils.fulfillPromise(fetchDocument, 200, collectionName + resources.db_fetch_success, null, resources.success_response_obj,
		400, resources.db_fetch_fail, null, resources.fail_response_obj);

	return fulfillPromise;
}

/**
 * Finds a single document and return whole document (no fields selection)
 * 
 * @param {mongoose.Schema} collectionObj 
 * @param {*} queryObj 
 * @param {string} collectionName 
 */
let findOne = (collectionObj, queryObj, collectionName) => {
	if (!validator.objectArrayNullUndefinedValidate([collectionObj, queryObj, collectionName], [collectionName])) {
		return myUtils.rejectPromise(400, resources.db_fetch_fail)
	}

	let fetchDocument = collectionObj.findOne(queryObj);

	let fulfillPromise = myUtils.fulfillPromise(fetchDocument, 200, collectionName + resources.db_fetch_success, null, resources.success_response_obj,
		400, resources.db_fetch_fail, null, resources.fail_response_obj);

	return fulfillPromise;
}

/**
 * Finds document by Id and return whole document (no fields selection)
 * 
 * @param {mongoose.Schema} collectionObj 
 * @param {string} idString 
 * @param {string} collectionName 
 */
let findOneById = (collectionObj, idString, collectionName) => {
	if (!validator.mongodbObjectIdValidate(idString)) {
		return myUtils.rejectPromise(400, resources.mongodb_invalid_id);
	}

	let fetchDocument = findOne(collectionObj, { '_id': ObjectId(idString) }, collectionName);

	return fetchDocument;
}

let findOneByIdAndSelect = (collectionObj, idString, selectQuery, collectionName) => {
	if (!validator.mongodbObjectIdValidate(idString)) {
		return myUtils.rejectPromise(400, resources.mongodb_invalid_id);
	}

	let fetchDocument = this.findOneAndSelect(collectionObj, { '_id': ObjectId(idString) }, selectQuery, collectionName);

	return fetchDocument;
}

/**
 * Finds mulitple documents and select specified fields of queried documents
 * 
 * @param {mongoose.Schema} collectionObj 
 * @param {*} queryObj 
 * @param {*} selectQuery 
 * @param {string} collectionName 
 */
let findBulkAndSelect = (collectionObj, queryObj, selectQuery, collectionName) => {
	if (!validator.objectArrayNullUndefinedValidate([collectionObj, queryObj, selectQuery, collectionName], [collectionName])) {
		return myUtils.rejectPromise(400, resources.mongodb_invalid_id);
	}

	let fetchDocument = collectionObj.find(queryObj, selectQuery);

	let fulfillPromise = myUtils.fulfillPromise(fetchDocument, 200, collectionName + resources.db_fetch_success, null, resources.success_response_obj,
		400, resources.db_fetch_fail, null, resources.fail_response_obj);

	return fulfillPromise;
}

/**
 * Finds mulitple documents and return whole documents (no fields selection)
 * 
 * @param {mongoose.Schema} collectionObj 
 * @param {*} queryObj 
 * @param {string} collectionName 
 */
let findBulk = (collectionObj, queryObj, collectionName) => {
	if (!validator.objectArrayNullUndefinedValidate([collectionObj, queryObj, collectionName], [collectionName])) {
		return myUtils.rejectPromise(400, resources.mongodb_invalid_id);
	}

	let fetchDocument = collectionObj.find(queryObj);

	let fulfillPromise = myUtils.fulfillPromise(fetchDocument, 200, collectionName + resources.db_fetch_success, null, resources.success_response_obj,
		400, resources.db_fetch_fail, null, resources.fail_response_obj);

	return fulfillPromise;
}

let findBulkByIdPath = (collectionObj, path, idString, collectionName) => {
	if (!validator.objectArrayNullUndefinedValidate([path, idString], [path, idString]) &&
		!validator.mongodbObjectIdValidate(idString)) {
		return myUtils.rejectPromise(400, resources.mongodb_invalid_id);
	}

	let id = ObjectId(idString);
	let query = { path: id }

	let fetchDocument = this.findBulk(collectionObj, query, collectionName);

	return fetchDocument;


}

let findBulkByIdPathConditional = (collectionObj, path, idString, queryObj, collectionName) => {
	if (!validator.objectArrayNullUndefinedValidate([path, idString, queryObj], [path, idString]) &&
		!validator.mongodbObjectIdValidate(idString)) {
		return myUtils.rejectPromise(400, resources.mongodb_invalid_id);

	}

	let id = ObjectId(idString);
	queryObj[path] = id

	let fetchDocument = this.findBulk(collectionObj, queryObj, collectionName);

	return fetchDocument;

}

/**
 * Inserts a new document
 * 
 * @param {*} newObj 
 * @param {string} collectionName 
 */
let insertDocument = (newObj, collectionName) => {
	if (!validator.objectArrayNullUndefinedValidate([newObj, collectionName], [collectionName])) {
		return myUtils.rejectPromise(400, resources.mongodb_invalid_id);

	}

	let insertDocument = newObj.save();

	let fulfillPromise = myUtils.fulfillPromise(insertDocument, 200, collectionName + resources.db_fetch_success, null, resources.success_response_obj,
		400, resources.db_fetch_fail, null, resources.fail_response_obj);

	return fulfillPromise;
}

/**
 * Updates a document
 * 
 * @param {mongoose.Schema} collectionObj 
 * @param {*} queryObj 
 * @param {*} updateFieldsObj 
 * @param {string} collectionName 
 */
let updateDocument = (collectionObj, queryObj, updateFieldsObj, collectionName) => {
	if (!validator.objectArrayNullUndefinedValidate([collectionObj, queryObj, updateFieldsObj, collectionName], [collectionName])) {
		return myUtils.rejectPromise(400, resources.mongodb_invalid_id);
	}

	let updateDocument = collectionObj.update(queryObj, { $set: updateFieldsObj }, { new: true });

	let fulfillPromise = myUtils.fulfillPromise(updateDocument, 200, collectionName + resources.db_fetch_success, null, resources.success_response_obj,
		400, resources.db_fetch_fail, null, resources.fail_response_obj);

	return fulfillPromise;
}

/**
 * Finds document by mongodb Id and update
 * 
 * @param {mongoose.Schema} collectionObj 
 * @param {string} idString 
 * @param {*} updateFieldsObj 
 * @param {string} collectionName 
 */
let updateDocumentById = (collectionObj, idString, updateFieldsObj, collectionName) => {

	if (!validator.mongodbObjectIdValidate(idString)) {
		return myUtils.rejectPromise(400, resources.mongodb_invalid_id);
	}

	let updateDocumentPromise = updateDocument(collectionObj, { '_id': ObjectId(idString) }, updateFieldsObj, collectionName)

	return updateDocumentPromise;
}

/**
 * Deletes documents
 * 
 * @param {mongoose.Schema} collectionObj 
 * @param {*} queryObj 
 * @param {string} collectionName 
 */
let deleteDocument = (collectionObj, queryObj, collectionName) => {
	if (!validator.objectArrayNullUndefinedValidate([collectionObj, queryObj, collectionName], [collectionName])) {
		return myUtils.rejectPromise(400, resources.mongodb_invalid_id);
	}

	let deleteDocument = collectionObj.remove(queryObj);

	let fulfillPromise = myUtils.fulfillPromise(deleteDocument, 200, collectionName + resources.db_fetch_success, null, resources.success_response_obj,
		400, resources.db_fetch_fail, null, resources.fail_response_obj);

	return fulfillPromise;
}

/**
 * Deletes documents by Id
 * 
 * @param {mongoose.Schema} collectionObj 
 * @param {string} idString 
 * @param {string} collectionName 
 */
let deleteDocumentById = (collectionObj, idString, collectionName) => {
	if (!validator.mongodbObjectIdValidate(idString)) {
		return myUtils.rejectPromise(400, resources.mongodb_invalid_id);
	}

	let deleteDocumentPromise = deleteDocument(collectionObj, { '_id': ObjectId(idString) }, collectionName);

	return deleteDocumentPromise;
}

let deleteMultipleDocumentByIdConditional = (collectionObj, idStrings, query, collectionName) => {
	if (!validator.mongodbObjectIdArrayValidate(idStrings)) {
		return myUtils.rejectPromise(400, resources.mongodb_invalid_id);
	}

	var ids = idStrings.map((idString) => ObjectId(idString));

	query._id = { '$in': ids };

	let deletePromise = deleteDocument(collectionObj, query, collectionName);

	return deletePromise;
}

let deleteMultipleDocumentById = (collectionObj, idStrings, collectionName) => {
	if (!validator.mongodbObjectIdArrayValidate(idStrings)) {
		return myUtils.rejectPromise(400, resources.mongodb_invalid_id);
	}

	var ids = idStrings.map((orderId) => ObjectId(orderId));

	var query = { '_id': { '$in': ids } };

	let deletePromise = deleteDocument(collectionObj, query, collectionName);

	return deletePromise;
}

let deleteMulitpleByIdPath = (collectionObj, path, idString, collectionName) => {
	if (!validator.objectArrayNullUndefinedValidate([path, idString], [path, idString]) &&
		!validator.mongodbObjectIdValidate(idString)) {
		return myUtils.rejectPromise(400, resources.mongodb_invalid_id);
	}

	let id = ObjectId(idString);
	let query = { [path]: id }

	let fetchDocument = deleteDocument(collectionObj, query, collectionName);

	return fetchDocument;
}

let deleteMulitpleByIdPathConditional = (collectionObj, path, idString, queryObj, collectionName) => {
	if (!validator.objectArrayNullUndefinedValidate([path, idString, queryObj], [path, idString]) &&
		!validator.mongodbObjectIdValidate(idString)) {
		return myUtils.rejectPromise(400, resources.mongodb_invalid_id);
	}

	let id = ObjectId(idString);
	queryObj[path] = id

	let fetchDocument = deleteDocument(collectionObj, queryObj, collectionName);

	return fetchDocument;


}

module.exports = {
	findOneAndSelect: findOneAndSelect,
	findOne: findOne,
	findOneById: findOneById,
	findOneByIdAndSelect: findOneByIdAndSelect,
	findBulkAndSelect: findBulkAndSelect,
	findBulk: findBulk,
	findBulkByIdPath: findBulkByIdPath,
	findBulkByIdPathConditional: findBulkByIdPathConditional,
	insertDocument: insertDocument,
	updateDocument: updateDocument,
	updateDocumentById: updateDocumentById,
	deleteDocument: deleteDocument,
	deleteDocumentById: deleteDocumentById,
	deleteMultipleDocumentById: deleteMultipleDocumentById,
	deleteMultipleDocumentByIdConditional: deleteMultipleDocumentByIdConditional,
	deleteMulitpleByIdPath: deleteMulitpleByIdPath,
	deleteMulitpleByIdPathConditional: deleteMulitpleByIdPathConditional,
	aggregate: aggregate,
}