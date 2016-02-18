/*
 * @Author: sk
 * @Date:   2016-02-18 11:32:22
 * @Last Modified by:   sk
 * @Last Modified time: 2016-02-18 12:21:46
 */
(function(angular) {
    'use strict';
    //注册一个新的模块
    angular.module('app.services.main', [])
        .service('MainService', [function() {
            //构造函数
            //业务逻辑中必须出现在服务中（专门定义业务逻辑）
            var todos = [{
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

            this.actions = {};
            //控制私有字段的访问权限
            this.actions.get = function() {
                return todos;
            }
            this.actions.add = function(text) {
                //获取文本框的值， 加入数组中,数据列表是自动同步的
                todos.push({
                    id: Math.random(),
                    text: text,
                    completed: false
                });
            };
            this.actions.remove = function(id) {
                for (var i = 0; i < todos.length; i++) {
                    if (todos[i].id === id) {
                        todos.splice(i, 1);
                        break;
                    }
                }
            };
            this.actions.clearCompleted = function() {
                var result = [];
                for (var i = 0; i < todos.length; i++) {
                    if (!todos[i].completed) {
                        result.push(todos[i]);
                    }
                }
                todos = result;
                //因为此时我们将todos指向了一个新的地址
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
            };

            //更新
            this.actions.update = function(id, target) {

            }
            this.actions.save = function() {
                this.currentEditId = -1;
            };
        }]);
})(angular)
