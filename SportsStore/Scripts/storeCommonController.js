//var authenticateUrl = "/authenticate";

//var authenticate = function (successCallback) {
//    sendRequest(authenticateUrl, "POST", {
//        "grant_type": "password",
//        username: $scope.username,
//        password: $scope.password
//    }, function (data) {
//        $scope.authenticated = true;
//        setAjaxHeaders({
//            Authorization: "bearer " + data.access_token
//        });
//        if (successCallback)
//        {
//            successCallback();
//        }
//    })
//}