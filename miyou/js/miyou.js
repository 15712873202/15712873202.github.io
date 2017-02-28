/*******************************/
var app = angular.module('miyou',['ng','ngRoute']);

//声明一个控制器 parentCtrl
app.controller('parentCtrl',
	['$scope','$location',
		function ($scope,$location) {
			$scope.goTo = function (arg) {
				$location.path(arg);
			}
		}]);


app.config(function ($routeProvider) {
	$routeProvider
		.when('/start',{
			templateUrl:'tpl/start.html',
			controller:'startCtrl'
		})
		.when('/search',{
			templateUrl:'tpl/search.html',
			controller:'searchCtrl'
		})
		.when('/detail',{
			templateUrl:'tpl/detail.html',
			controller:'detailCtrl'
		})
		.when('/detail/:hid',{
			templateUrl:'tpl/detail.html',
			controller:"detailCtrl"
		})
		.when('/order',{
			templateUrl:'tpl/order.html',
			controller:'orderCtrl'
		})
		.otherwise({redirectTo:'/start'});

});



//start页面声明一个控制器startCtrl
app.controller('startCtrl',
	['$scope','$http',
		function ($scope,$http) {

			//获得人气精选目的地的数据信息
			$http.get('data/destination.php')
				.success(function (data1) {
					//console.log(data1);
					$scope.desList = data1;
				});

			//获得热门自由行的数据信息
			$http.get('data/free.php')
				.success(function (data2) {
					//console.log(data2);
					$scope.freeList = data2;
				});
		}]);



/*********************************/
//search页面声明一个控制器searchCtrl
app.controller('searchCtrl',
	['$scope','$http',
		function ($scope,$http) {

			//变量判定加载更多按钮的显示状况
			$scope.hasMore = true;
			$scope.noMore = false;

			//更多好玩处的信息
			getInfo();
			function getInfo(){
			$http.get('data/hotmore_page.php?start=0')
				.success(function (data3) {
					//console.log(data3);
					$scope.hotList = data3;
				});
			}

			//加载更多--更多好玩
			$scope.loadMore = function () {
				 $http.get('data/hotmore_page.php?start='+$scope.hotList.length)
				 	.success(function (data4) {
						 //console.log(data4);
						 if(data4.length < 6){
							$scope.hasMore = false;
							$scope.noMore = true;
						 }
						 $scope.hotList = $scope.hotList.concat(data4);
					 });
			 }

			//搜索--更多好玩
			$scope.search=function(){
				$scope.$watch('kw', function () {
					//console.log($scope.kw);
					if($scope.kw){
						$http.get('data/hotmore_kw.php?kw='+$scope.kw)
							.success(function (data5) {
								//console.log(data5);
								$scope.hasMore = false;
								$scope.noMore = false;
								$scope.hotList = data5;
							})
					}else{
						getInfo();
						$scope.hasMore = true;
					}
				});
			}
		}]);




/*********************************/
//detail页面声明一个控制器detailCtrl
app.controller('detailCtrl',
	['$scope','$routeParams','$http',
		function ($scope,$routeParams,$http) {
			//console.log($routeParams.hid);
			//加载详情消息
			$http.get('data/hotmore_detail.php?hid='+$routeParams.hid)
				.success(function (data7) {
					//console.log(data7[0]);
					$scope.dList = data7[0];
				});

			//加入订单
			$scope.addOrder=function(hid){
				$http.post('data/order_add.php?hid='+hid)
					.success(function () {
						alert('加入订单成功');
					});
			}
		}]);



/*******************************/
//order页面声明一个控制器orderCtrl
app.controller('orderCtrl',
	['$scope','$http',
		function ($scope,$http) {

			//获得我的订单的数据信息
			$http.get('data/order_get.php')
				.success(function (data6) {
					//console.log(data6);
					$scope.getList = data6;
				});

			//改变订单预约份数
			$scope.plus=function(i,hid){
				$scope.getList[i].count++;
				$http.post('data/order_update.php?hid='+hid+'&count='+$scope.getList[i].count)
					.success(function(txt){
						if(txt=='succ'){
							console.log('操作成功')
						}
					});
			}
			$scope.minus=function(i,hid){
				$scope.getList[i].count--;
				if($scope.getList[i].count<=1){
					$scope.getList[i].count=1;
				}
				$http.post('data/order_update.php?hid='+hid+'&count='+$scope.getList[i].count)
					.success(function(txt){
						if(txt=='succ'){
							console.log('操作成功')
						}
					});
			}

			//取消当前订单
			$scope.deleteOrder= function (index,oid) {
				//console.log(oid);
				$http.post('data/order_delete.php?oid='+oid)
					.success(function(data7){
						if(data7=='succ'){
							$scope.getList.splice(index,1);
						}
					});
			}

			//计算总价
			$scope.totalPrice = function () {
				var totalNum = 0;
				angular.forEach($scope.getList,
					function (value,key) {
						//console.log(value,key);
						totalNum+=parseInt(value.price*value.count);
					})
				return totalNum;
			}
		}]);



