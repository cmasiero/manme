

let MongoClient = require('mongodb').MongoClient
let dburl = global.gConfig.dburl

const MONGO_IS_NOT_UP = "!!!!! Mongodb isn't up. !!!!!";


module.exports = {

    /**
     * 
     * @param {*} collectionName 
     * @param {*} filter 
     * @param {*} callback 
     */
    deleteMany: function (collectionName, filter, callback) {
        console.log("[deleteMany]");
        MongoClient.connect(dburl, { useNewUrlParser: true }, function (error, db) {
            try {
                var dbo = db.db(global.gConfig.dbname);
            } catch (error) {
                callback(Error(MONGO_IS_NOT_UP))
            }
            dbo.collection(collectionName).deleteMany(filter, function (error, result) {
                db.close()
                callback(error, result)
            });
        });
    },

    /**
        * Insert an array of jason doc 
        * @param {*} collectionName 
        * @param {*} multidoc 
        */
    insertMany: function (collectionName, multidoc, callback) {
        console.log("[insertMany]" + multidoc);
        MongoClient.connect(dburl, { useNewUrlParser: true }, function (error, db) {
            try {
                var dbo = db.db(global.gConfig.dbname);
            } catch (error) {
                callback(Error(MONGO_IS_NOT_UP))
            }
            dbo.collection(collectionName).insertMany(multidoc, function (error, document) {
                db.close()
                callback(error, document)
            });
        });
    },

    /**
     * 
     * @param {*} collectionName 
     * @param {*} doc 
     * @param {*} callback 
     */
    insertOne: function (collectionName, doc, pathFiles, callback) {
        console.log("[insertOne]" + doc);
        MongoClient.connect(dburl, { useNewUrlParser: true }, function (error, db) {
            try {
                var dbo = db.db(global.gConfig.dbname);
            } catch (error) {
                callback(Error(MONGO_IS_NOT_UP))
            }

            dbo.collection(collectionName).insertOne(doc, function (error, document) {

                if (error === null && pathFiles !== null) {

                    console.log("files " + pathFiles);
                    pathFiles.forEach(f => {
                        let fName = f.split("/").pop();

                        let source = global.gConfig.file_repository_source + fName
                        let destination = global.gConfig.file_repository + document.insertedId + "_" + fName

                        // Destination will be created or overwritten by default.
                        var fs = require('fs');
                        fs.createReadStream(source).pipe(fs.createWriteStream(destination));

                        var ObjectID = require('mongodb').ObjectID
                        let filter = { "_id": ObjectID(document.insertedId) }
                        let update = { $addToSet: { "path": destination, "fileName": fName } }
                        dbo.collection(collectionName).updateOne(filter, update, function (error, document) {
                            if (error) throw error
                        });

                    });
                }

                db.close()
                callback(error, document)
            });

        });
    },


    /**
     * 
     * @param {*} collectionName 
     * @param {*} filter 
     * @param {*} update 
     * @param {*} callback 
     */
    updateMany: function (collectionName, filter, update, callback) {
        console.log("[updateMany]");
        MongoClient.connect(dburl, { useNewUrlParser: true }, function (error, db) {
            try {
                var dbo = db.db(global.gConfig.dbname);
            } catch (error) {
                callback(Error(MONGO_IS_NOT_UP))
            }
            dbo.collection(collectionName).updateMany(filter, { $set: update }, { upsert: true })
                .then((result) => {
                    callback(null, result)
                })
                .catch((err) => {
                    callback(err)
                })
            db.close()
        });
    },

    /**
     * 
     * @param {*} collectionName 
     * @param {*} filter 
     * @param {*} update 
     * @param {*} callback 
     */
    updateOne: function (collectionName, filter, update, callback) {
        console.log("[updateOne]");
        MongoClient.connect(dburl, { useNewUrlParser: true }, function (error, db) {
            try {
                var dbo = db.db(global.gConfig.dbname);
            } catch (error) {
                callback(Error(MONGO_IS_NOT_UP))
            }
            dbo.collection(collectionName).updateOne(filter, update, { upsert: true })
                .then((document) => {
                    callback(null, document)
                })
                .catch((err) => {
                    callback(err)
                })
            db.close()
        });
    },

    /**
     * 
     * @param {*} collectionName 
     * @param {*} filter 
     * @param {*} callback 
     */
    findOne: function (collectionName, filter, callback) {
        console.log("[findOne]");
        MongoClient.connect(dburl, { useNewUrlParser: true }, function (error, db) {
            try {
                var dbo = db.db(global.gConfig.dbname);
            } catch (error) {
                callback(Error(MONGO_IS_NOT_UP))
            }
            dbo.collection(collectionName).findOne(filter, function (error, document) {
                db.close()
                callback(error, document)
            });
        });
    },

    /**
     * 
     * @param {*} collectionName 
     * @param {*} filter 
     * @param {*} callback 
     */
    find: function (collectionName, filter, callback) {
        console.log("[findMany]");
        MongoClient.connect(dburl, { useNewUrlParser: true }, function (error, db) {
            try {
                var dbo = db.db(global.gConfig.dbname);
            } catch (error) {
                callback(Error(MONGO_IS_NOT_UP))
            }
            dbo.collection(collectionName).find(filter).toArray(function (err, array) {
                db.close()
                callback(null, array)
            });
        });
    }


}

