YUI.add("<%= moduleName %>-test", function(Y) {

    var suite, testCase;

    suite = new Y.Test.Suite({
        name: "<%= moduleName %> Test Suite"
    });

    testCase = new Y.Test.Case({

        name: "<%= moduleName %> test case",

        setUp: function () {},
        tearDown: function () {},

        "test <%= moduleName %> generation": function () {

            var instance = new Y.<%= _.capitalize(moduleName) %>({});

            Y.Assert.isObject(instance);

        }
    });

    suite.add(testCase);
    Y.Test.Runner.add(suite);

}, "", {
    requires: ["test", "<%= moduleName %>"]
});