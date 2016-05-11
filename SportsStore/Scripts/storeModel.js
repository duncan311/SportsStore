var app = angular.module('SportsStore', []);

app.controller('authenticateController', ['$scope', function ($scope) {
    $scope.orders = [];
    $scope.authenticated = false;
    $scope.username = null;
    $scope.password = null;
    $scope.error = "";
    $scope.showError = false;
  
    var authenticateUrl = "/authenticate";

    $scope.authenticate = function authenticate(successCallback) {
        $scope.username = 'Admin';
        $scope.password = 'secret';
        sendRequest(authenticateUrl, "POST", {
            "grant_type": "password",
            username: $scope.username,
            password: $scope.password
        }, function (data) {
            setAjaxHeaders({
                Authorization: "bearer " + data.access_token
            });
            if (successCallback) {
                successCallback();
            }
        });
    }
}]);


app.controller('productsController', ['$scope', function ($scope) {
    $scope.products = [];

    var productUrl = '/api/products/';
    
    $scope.getProducts = function () {
        sendRequest(productUrl, "GET", null, function (data) {
            $scope.products = [];
            $scope.products.push.apply($scope.products, data);
        })
    };

    $scope.deleteProduct = function (id) {
        sendRequest(productUrl + id, "DELETE", null, function () {
            $scope.products.remove(function (item) {
                return item.Id == id;
            });
        })
    };

    $scope.testDeleteProduct = function (id) {
        sendRequest(productUrl + id, "DELETE", null, function () {
            $scope.products.splice(id, 1);
        })
    };

    $scope.testChangeProduct = function () {
        var product = $scope.products[2];
        product.Price = product.Price + 1000;
        this.saveProduct(product);
    };

    $scope.saveProduct = function (product, successCallback) {
        var that = $scope;
        sendRequest(productUrl, "POST", product, function (that) {
            that.getProducts();
            if (successCallback) {
                successCallback();
            }
        })
    };
}]);

$(document).ready(function () {
    setDefaultCallbacks(function (data) {
        if (data) {
            console.log("---Begin Success---");
            console.log(JSON.stringify(data));
            console.log("---End Success---");
        }
        else {
            console.log("Success (no data)");
        }
        //$scope.gotError = false;
    },
    function (statusCode, statusText) {
        console.log("Error: " + statusCode + " (" + statusText + ")");
        //$scope.$apply(function (statusCode, statusText) {
        //    $scope.error = statusCode + " (" + statusText + ")";
        //    $scope.gotError = true;
        //});
    });
});