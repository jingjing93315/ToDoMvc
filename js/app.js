(function(angular) {
    'use strict';

    /*
    MyTodoMvc module
    应用程序主要应用模块
     */
    var myApp = angular.module('app', ['ngRoute', 'app.controllers.main']);
    //路由配置
    myApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/:status?', {
                controller: 'TodoController',
                templateUrl: 'main_tmpl'
            })
            .otherwise({ redirectTo: '/' });
    }]);
    //注册一个主要的控制器,属于某个模块,用于网往视图中暴露数据


})(angular)
