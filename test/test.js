// Requiring module
const assert = require('assert');
// We can group similar tests inside a describe block
describe("Basic Test Validation", () => {
before(() => {
    console.log( "Proceeding with executing complete Test Suit !!!" );
});
after(() => {
    console.log( "All Test Cases executed !!!" );
});
// We can add nested blocks for different tests
describe( "Test1", () => {
    beforeEach(() => {
    console.log( "executes before every test" );
    });
    it("launching home page is successful", () => {
    assert.equal(2 + 3, 5);
    });
    it("navigation to customer page is successful ", () => {
    assert.equal(2*3, 6);
    });
});
describe("Test2", () => {
    beforeEach(() => {
    console.log( "executes before every test" );
    });
    it("navigation to about us page is successful", () => {
    assert.equal(2 + 2, 4);
    });
    it("navigation to contacts page is successful", () => {
    assert.equal(2*4, 8);
    });
});
});
