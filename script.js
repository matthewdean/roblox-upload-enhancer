var assetTypeId = document.getElementById("assetTypeId").value;

if (['2', '11', '12', '13'].indexOf(assetTypeId) >= 0) {
  document.getElementById("file").multiple = "multiple";
	document.getElementsByTagName("label")[0].innerText = "Find your image(s):";
	document.getElementById("container").removeChild(document.getElementById("name").parentNode);
	
	$('#upload-button').unbind('click');
	window.parent.scrolling = "yes";
	
	$('#upload-button').click(function() {
		var groupId = document.getElementById("groupId").value;
		var requestVerificationToken = document.getElementsByName("__RequestVerificationToken")[0].value;

		var files = document.getElementById("file").files;
		for (var i = 0; i < files.length; i++) {
			var data = new FormData();
			data.append("assetTypeId", assetTypeId);
			data.append("groupId", groupId);
			data.append("__RequestVerificationToken", requestVerificationToken);
			data.append("file", files[i], files[i].name);
			var fileNameWithoutExtension = files[i].name.split('.')[0]; // everything up to the first period
			data.append("name", fileNameWithoutExtension);
			
			$.ajax({
				type: 'POST',
				url: '/build/upload',
				data: data,
				contentType: false,
				processData: false,
				success: function(html) {
					var result = $(html).find('#upload-result');
					$('#upload-button').parent().append(result);
					$('#upload-button').parent().append('<br />');
				}
			});
		}
	});
}
