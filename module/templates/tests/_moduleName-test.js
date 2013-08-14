
YUI.add("<%= name %>-test", function (Y) {

    var suite = new Y.Test.Suite({
        name: "<%= name %> Test Suite"
    }),
        testCase = new Y.Test.Case({

            name: "<%= name %> first test case",
            testGeneration: function () {

                Y.log("test",'debug');

                var instance = new Y.<%= _.capitalize(name) %>({
                });

                Y.Assert.isObject(instance);

            }
        });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "<%= name %>"]
});
