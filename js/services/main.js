/*
 * @Author: sk
 * @Date:   2016-02-18 11:32:22
 * @Last Modified by:   sk
 * @Last Modified time: 2016-02-18 15:46:39
 */
(function(angular) {
    'use strict';
    //注册一个新的模块
    angular.module('app.services.main', [])
        .service('MainService', ['$window', function($window) {
            //构造函数
            //业务逻辑中必须出现在服务中（专门定义业务逻辑）
            var storage = $window.localStorage;
            //因为可能没有，所以设为空，然后再保存
            //如果有数据，则取出来的是字符串
            var todos = storage['my_todo_list'] ? JSON.parse(storage['my_todo_list']) : [];

            var that = this;
            this.actions = {};

            this.update = function() {
                storage['my_todo_list'] = JSON.stringify(todos);
            };
            //控制私有字段的访问权限
            this.actions.get = function() {
                return todos;
            };

            this.actions.add = function(text) {
                //获取文本框的值， 加入数组中,数据列表是自动同步的
                todos.push({
                    id: Math.random(),
                    text: text,
                    completed: false
                });
                that.update();
            };
            this.actions.remove = function(id) {
                for (var i = 0; i < todos.length; i++) {
                    if (todos[i].id === id) {
                        todos.splice(i, 1);
                        break;
                    }
                }
                that.update();
            };
            this.actions.clearCompleted = function() {
                var result = [];
                for (var i = 0; i < todos.length; i++) {
                    if (!todos[i].completed) {
                        result.push(todos[i]);
                    }
                }
                todos = result;
                //因为此时我们将todos指向了一个地址
                that.update();
                return todos;
            };
            //是否有已经完成的
            this.actions.existCompleted = function() {
                for (var i = 0; i < todos.length; i++) {
                    if (todos[i].completed) {
                        return true;
                    }
                }
                return false;
            };
            var now = true;
            this.actions.toggleAll = function() {
                for (var i = 0; i < todos.length; i++) {
                    todos[i].completed = now;
                }
                now = !now;
                that.update();
            };

            //更新
        }]);
})(angular)
