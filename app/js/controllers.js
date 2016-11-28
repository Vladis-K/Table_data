app.controller("MainController", [ '$scope', '$http', function ($scope, $http) {

	$http.get('../files/snapshot.csv').then(

		function (response){
			var allData = response.data;
			//console.log(allData);
			var textRows = allData.split(/\r\n|\n/gm);
			//console.log (textRows );
			var i=0;
			var materials = textRows[i].split(",");
			//Table data
			var main = textRows.length;
			var insertedData = [];
			while (i < main){
				var additional = textRows[i].split(',');
				//console.log(additional);
				var matLength = materials.length;
				var addLength = additional.length;
				if (addLength == matLength){
					var resultRows = [];
					var k = 0;
					while (k < matLength) {
						resultRows.push(additional[k]);
						k++;
					}
					insertedData.push(resultRows);
				}
				i++;

			}
			return $scope.rows = insertedData;
		});


	$scope.uploadFile = function(){
		var f = document.getElementById('file').files[0];
		console.log ( f )
		var r = new FileReader();
		r.onload = function(e){
			$scope.loadedFile = e.target.result;
			console.log ( $scope.loadedFile );
				var textRowsNew = $scope.loadedFile.split(/\r\n|\n/gm);
				var i=0;
				var truncatedRow = textRowsNew[0].split(",");
				var containRow = [];
				while (i < textRowsNew.length){
					var containRowAdd = textRowsNew[i].split(',');
					if (truncatedRow.length ==  containRowAdd.length ){
						var resultRowsNew = [];
						var l = 0;
						while (l < truncatedRow.length) {
							resultRowsNew.push(containRowAdd[l]);
							l++;
						}
						containRow.push(resultRowsNew)
					}
					i++;
				}
				return $scope.rowsNew = containRow;
		};
		console.log ( r.readAsBinaryString(f) );
	};


	// Upload of table
	// 	$scope.getData = function(data) {
	// 		$http.get('./files/snapshot.csv').then($scope.processData);
	// 	};
	// 	$scope.processData = function(getResponse){
	// 		var getInfo = getResponse.data;
	// 		var textRowsNew = getInfo.split(/\r\n|\n/gm);
	// 		var i=0;
	// 		var truncatedRow = textRowsNew[0].split(",");
	// 		var containRow = [];
	// 		while (i < textRowsNew.length){
	// 			var containRowAdd = textRowsNew[i].split(',');
	// 			if (truncatedRow.length ==  containRowAdd.length ){
	// 				var resultRowsNew = [];
	// 				var l = 0;
	// 				while (l < truncatedRow.length) {
	// 					resultRowsNew.push(containRowAdd[l]);
	// 					l++;
	// 				}
	// 				containRow.push(resultRowsNew)
	// 			}
	// 			i++;
	// 		}
	// 		return $scope.rowsNew = containRow
	// 	}
	// };
	// console.log ( r.readAsBinaryString(f) );
	// }

}]);
