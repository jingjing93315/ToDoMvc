(function(angular) {
    'use strict';

    /*
    MyTodoMvc module
    应用程序主要应用模块
     */
    var myApp = angular.module('app', ['ngRoute']);
    //路由配置
    myApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/:status?', {
                controller: 'TodoController',
                templateUrl: 'main_tmpl'
            })
            .otherwise({ redirectTo: '/' });
    }]);
    //注册一个主要的控制器
    myApp.controller('TodoController', ['$scope', '$routeParams', '$route', function($scope, $routeParams, $route) {
        //文本框需要一个模型
        $scope.text = '';
        //任务列表需要一个
        //每一个任务的结构
        // {id:1,text:'学习',completed:true/false}
        $scope.todos = [{
            id: Math.random(),
            text: 'eat',
            completed: false
        }, {
            id: Math.random(),
            text: 'sleep',
            completed: false
        }, {
            id: Math.random(),
            text: 'play',
            completed: true
        }];
        //暴露行为
        $scope.actions = {};
        $scope.actions.add = function() {
            //获取文本框的值，加入数组中,数据列表是自动同步的
            if (!$scope.text) {
                return false;
            }
            $scope.todos.push({
                id: Math.random(),
                text: $scope.text,
                completed: false
            });
            $scope.text = '';
        };
        $scope.actions.remove = function(id) {
            for (var i = 0; i < $scope.todos.length; i++) {
                if ($scope.todos[i].id === id) {
                    $scope.todos.splice(i, 1);
                    break;
                }
            }
        };
        $scope.actions.clearCompleted = function() {
            var result = [];
            for (var i = 0; i < $scope.todos.length; i++) {
                if (!$scope.todos[i].completed) {
                    result.push($scope.todos[i]);
                }
            }
            $scope.todos = result;
        };
        //是否有已经完成的
        $scope.actions.existCompleted = function() {
            for (var i = 0; i < $scope.todos.length; i++) {
                if ($scope.todos[i].completed) {
                    return true;
                }
            }
            return false;
        };
        var now = true;
        $scope.actions.toggleAll = function() {
            for (var i = 0; i < $scope.todos.length; i++) {
                $scope.todos[i].completed = now;
            }
            now = !now;
        };
        $scope.currentEditId = -1;
        $scope.actions.editing = function(id) {
            $scope.currentEditId = id;
        };
        $scope.actions.save = function() {
            $scope.currentEditId = -1;
        };
        // //状态筛选
        // $scope.selector = {};
        // //点击事件不合适有Dom操作
        // //让$location也有一个执行$location的数据成员
        // $scope.$location = $location;
        // //因为watch只能监视属于$scope的成员
        // $scope.$watch('$location.path()', function(now, old) {
        //     //拿到锚点值
        //     //这样写就要求执行环境必须要有window对象
        //     switch (now) {
        //         case '/active':
        //             $scope.selector = { completed: false };
        //             break;
        //         case '/completed':
        //             $scope.selector = { completed: true };
        //             break;
        //         default:
        //             $scope.selector = {};
        //             break;
        //     }
        // });


        //路由实现
        $scope.selector = {};
        var status = $routeParams.status;
        switch (status) {
            case 'active':
                $scope.selector = { completed: false };
                break;
            case 'completed':
                $scope.selector = { completed: true };
                break;
            default:
                $route.updateParams({ status: '' });
                $scope.selector = {};
                break;
        }
        //自定义比较函数  默认filter过滤器使用的是模糊匹配
        $scope.equalCompare = function(source, target) {
            return source === target;
        }


    }]);

})(angular)
