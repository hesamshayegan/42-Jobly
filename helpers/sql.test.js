
const { sqlForPartialUpdate } = require("./sql");


describe("sqlForPartialUpdate", function() {
    test("works: 1 item", function() {
        const result = sqlForPartialUpdate(
            { firstName: "Aliya"},
            { firstName: "firstName", age: "age"});
        expect(result).toEqual({
            setCols: "\"firstName\"=$1",
            values: ["Aliya"]
        })
        
    })

    test("works: 2 items", function () {
        const result = sqlForPartialUpdate(
            { firstName: "Aliya", age: 32},
            { age: "age" });
        expect(result).toEqual({
            setCols: "\"firstName\"=$1, \"age\"=$2",
            values: ["Aliya", 32]
        })
    })
})