describe('Experiment', function () {

    // It avoids execution
    let skip = true

    // It avoids execution of spec.js
    before(function () {
        if (skip) this.skip();
    })

    it('Parameter from config.json', function (done) {
        // environment variables
        console.log("*** " + global.gConfig.config_id)
        done()
    })

    it('How to use class', function (done) {


        const Example = require('../dao/mongodao')
        let example = new Example()
        example.test("The query", risultato => {
            console.log("il risulato e' : " + risultato)
            done()
        });

    })

})