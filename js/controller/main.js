/*
 * @Author: sk
 * @Date:   2016-02-18 11:17:50
 * @Last Modified by:   sk
 * @Last Modified time: 2016-02-18 12:21:01
 */
(function(angular) {
    'use strict';
    //要得到App模块  第一种方法
    //angular.module('MyTodoMvc').controller
    //因为当没有第二个参数时是获取模块，
    //但是要注意文件引用的先后顺序
    //第二种方法  创建一个独立的模块
    var controllers = angular.module('app.controllers.main', ['app.services.main'])
    controllers.controller('TodoController', [
        '$scope',
        '$routeParams',
        '$route',
        'MainService',
        function($scope, $routeParams, $route, MainService) {
            //文本框需要一个模型
            $scope.text = '';
            //任务列表需要一个
            //每一个任务的结构
            // {id:1,text:'学习',completed:true/false}
            $scope.todos = MainService.actions.get();
            //暴露行为
            $scope.actions = {};
            $scope.actions.add = function() {
                //获取文本框的值，加入数组中,数据列表是自动同步的
                //参数校验  界面逻辑
                if (!$scope.text) {
                    return false;
                }
                MainService.actions.add($scope.text);
                $scope.text = '';
            };
            //$scope.actions.remove = MainService.actions.remove;//这种 不太安全
            $scope.actions.remove = function(id) {
                //此处是界面逻辑
                MainService.actions.remove(id);
            }
            $scope.actions.clearCompleted = function() {
                var newTodos = MainService.actions.clearCompleted();
                $scope.todos = newTodos;
            };
            //是否有已经完成的
            $scope.actions.existCompleted = MainService.actions.existCompleted;
            var now = true;
            $scope.actions.toggleAll = MainService.actions.toggleAll;
            $scope.currentEditId = -1;
            //界面逻辑
            //业务可以被重用
            $scope.actions.editing = function(id) {
                $scope.currentEditId = id;
            };
            $scope.actions.save = function() {
                $scope.currentEditId = -1;
            };
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

        }
    ]);
})(angular)
