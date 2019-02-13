const assert = require('assert')

//const mongoDataFolder = "C:/mydata/workspace/vscode/electronApp/manme/mongodbData"
//const dburl = `mongodb://localhost:27017/`
//var MongoClient = require('mongodb').MongoClient

describe('Mongodb Test', function () {

    // It avoids execution
    let skip = true

    before(function () {

        if (skip) this.skip();

        // Start mongodb instance
        this.timeout(10000)
        var child = require('child_process').exec;
        child(`mongod --dbpath ${global.gConfig.mongoDataFolder}`,
            function (error, stdout, stderr) {
                assert.equal((error !== null), "mongodb on localhost not started!")
            });

        // Wait 5 seconds for complete start. 
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 5000);
        });

    })

    after(function () {

        if (skip) this.skip();

        // Kill mongodb server instance.
        const execSync = require('child_process').execSync;
        const output = execSync('taskkill /f /im mongod.exe', { encoding: 'utf-8' });
        console.log('Output was:\n', output);
    });

    it('Insert all test data', function(done){

        


    })


    // it('Insert data', function (done) {
    //     // Insert data
    //     MongoClient.connect(dburl, { useNewUrlParser: true }, function (err, db) {
    //         if (err) throw err;

    //         var dbo = db.db(global.gConfig.dbname);
    //         var myobj = { name: "Company Inc", address: "Highway 42" };
    //         dbo.collection("customers").insertOne(myobj, function (err, res) {
    //             assert.equal(err, null)
    //             db.close();
    //             done()
    //         });
    //     });
    // })

    // it('Get all customers', function (done) {
    //     this.timeout(10000)

    //     MongoClient.connect(dburl, { useNewUrlParser: true }, function (err, db) {
    //         if (err) throw err;
    //         var dbo = db.db(global.gConfig.dbname);

    //         dbo.collection("customers").find({}).toArray(function (err, result) {
    //             assert.equal(err, null)
    //             //console.log(result)
    //             result.forEach(function (arrayItem) {
    //                 var x = arrayItem.address;
    //                 // console.log(x);
    //             });
    //             db.close();
    //             done()
    //         });

    //     });
    // })

    // it('Select one', function (done) {
    //     const Example = require('../dao/mongodao')
    //     let example = new Example()
    //     example.selectOne("The query", risultato => {
    //         console.log("il risulato e' : " + risultato.name)
    //         done()
    //     });
        
    // })

})
