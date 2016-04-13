var app = angular.module("DAPP", ["ngMaterial"]);

app.controller("indexController", ["$scope", function($scope) {
    $scope.changePage = function(page) {
        switch(page) {
            case "self-defined":
                $scope.page = "self-defined";
                break;
            case "ng-select":
                $scope.page = "ng-select";
                break;
            case "ng-include":
                $scope.page = "ng-include";
                break;
            default:
                $scope.page = "self-defined";
        }
        $scope.isSideNavOpen = false;
    }

    $scope.showInput = function(input) {
        alert("你输入的是："+input);
    }
}]);

// boolean scope
app.directive("scopeTrue", function() {
    return {
        restrict: "A",
        scope: true, // 默认为false，当为true时，指令中的作用域继承父作用域，类似于子controller与父controller的关系。
        link: function(scope, elem, attrs) {
            console.log("scope true: ", scope);
        }
    }
});

// object scope
app.directive("scopeObject", function() {
    return {
        restrict: "A",
        scope: { }, // 指令直接创建一个新的作用域对象
        template: "<div><input type='text' ng-model='testScopeObject'/></div>",
        link: function(scope, elem, attrs) {
            console.log("scope object: ", scope);
        }
    };
});

app.directive("bindStrategyAt", function() {
    return {
        restrict: "A",
        scope: {
            url: "@",
            text: "@linkText"
        },
        template: 'inner anchor <a href="{{ url }}" target="_blank">{{ text }}</a><br/>inner input <input type="text" ng-model="text">'
    };
});

app.directive("bindStrategyEqual", function() {
    return {
        restrict: "A",
        scope: {
            url: "@",
            text: "=linkText"
        },
        template: 'inner anchor <a href="{{ url }}" target="_blank">{{ text }}</a><br/>inner input <input type="text" ng-model="text">'
    };
});

app.directive("bindStrategyAnd", function() {
    return {
        restrict: "A",
        scope: {
            done: "&"
        },
        template: '<input type="text" ng-model="text"><md-button ng-click="done({input: text})">输入完毕</md-button>'
    };
});
/*
    注：
        1.  绑定的是函数
        2.  指令中的函数参数为object
        3.  在外面绑定函数时传参，为object的key
        4.  controller中对应函数的参数则为object的value
*/

// ng-select
app.controller('selectController', function($scope) {
    $scope.stringArray = ["AAA", "BBB", "CCC", "DDD", "EEE"];

    $scope.objectArray = [
        {id: 111, name: "AAA"},
        {id: 222, name: "BBB"},
        {id: 333, name: "CCC"},
        {id: 444, name: "DDD"},
        {id: 555, name: "EEE"},
    ];
});

app.controller("includeController", function($scope) {
    $scope.$watch("selected", function(newVal, oldVal) {
        console.log(newVal, oldVal);
    });
});
