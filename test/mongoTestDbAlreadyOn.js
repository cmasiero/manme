const assert = require('assert')


describe('Mongodb Test - mongo must be on!', function () {

    // It avoids execution
    let skip = false

    before(function () {

        if (skip) this.skip();

        // Check mondo instance


    })

    after(function () {

        if (skip) this.skip();

    });

    it('Delete many', function (done) {
        this.timeout(10000)
        const dao = require('../dao/mongodao')
        dao.deleteMany("notes", {}, function (error, result) {
            if (error) {
                console.log("ERROR: " + error)
                assert.fail("Test failed")
            }
            let t = JSON.parse(result);
            console.log("Delete many - elements removed: " + t.n)
            assert.equal(t.n > 1, true, "Must remove 1 or more elements!")
            done()
        });

    })

    it('Insert many', function (done) {

        this.timeout(20000)
        // Read file
        var fs = require('fs');
        var mydata = JSON.parse(fs.readFileSync('./test/file-json/documents_data.json', 'utf8'));

        const dao = require('../dao/mongodao')
        dao.insertMany("notes", mydata, function (error, result) {
            if (error) {
                console.log("ERROR: " + error)
                assert.fail("Test failed")
            }
            assert.equal(result.insertedCount, 4, "documents_data.json contains 3 documents!")
            done()
        });

    })

    it('Insert one', function (done) {

        // Read file
        var mydata = { "name": "doc with file", "note": "note insert one" }

        // Read file
        var pathFile1 = './test/file-repository-source/text1.txt';
        var pathFile2 = './test/file-repository-source/text2.txt';

        const dao = require('../dao/mongodao')
        dao.insertOne("notes", mydata, [pathFile1, pathFile2], function (error, result) {
            if (error) {
                console.log("ERROR: " + error)
                assert.fail("Test failed")
            }
            let t = JSON.parse(result);
            assert.equal(t.ok, 1, "One element must be inserted!")
            done()
        });

    })


    it('Update many', function (done) {

        const dao = require('../dao/mongodao')
        dao.updateMany("notes", { $or: [{ "name": "name 1" }, { "name": "name 2" }] }, { "name": "name updated many" }, function (error, result) {
            if (error) {
                console.log("ERROR: " + error)
                assert.fail("Test failed")
            }

            let t = JSON.parse(result);
            assert.equal(t.nModified, 2, "Two element must be changed!")
            done()
        });

    })


    it('Update one', function (done) {

        const dao = require('../dao/mongodao')
        dao.updateOne("notes", { "name": "name 3" }, { $set: { "name": "name updated" } }, function (error, result) {
            if (error) {
                console.log("ERROR: " + error)
                assert.fail("Test failed")
            }
            let t = JSON.parse(result);
            assert.equal(t.nModified, 1, "One element must be inserted!")
            done()
        });

    })

    // it('Update one with files', function (done) {
    //     // Read file
    //     var pathFile3 = './test/file-repository-source/text3.txt';

    //     const dao = require('../dao/mongodao')
    //     let filter = { "name": "doc with file" }
    //     dao.updateOne("notes", filter , { $set: filter }, [pathFile3], ["text1.txt", "text2.txt"], function (error, result) {
    //         if (error) {
    //             console.log("ERROR: " + error)
    //             assert.fail("Test failed")
    //         }
    //         let t = JSON.parse(result);
    //         assert.equal(t.nModified, 1, "One element must be inserted!")
    //         done()
    //     });

    // })

    it('Find one', function (done) {

        const dao = require('../dao/mongodao')
        dao.findOne("notes", { "name": "name 4" }, function (error, result) {
            if (error) {
                console.log("ERROR: " + error)
                assert.fail("Test failed")
            }
            assert.equal(result.name, "name 4", "Must find the same name!")
            done()
        });

    })

    it('Find', function (done) {

        const dao = require('../dao/mongodao')
        dao.find("notes", { "type": "file" }, function (error, array) {
            if (error) {
                console.log("ERROR: " + error)
                assert.fail("Test failed")
            }

            array.forEach(function (value) {
                console.log(value.name);
            });

            assert.equal(array.length >= 1, true, "Must contains 1 or more elements")
            done()

        });

    })


})
