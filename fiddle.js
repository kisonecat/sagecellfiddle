function displayHelp() {
    $("#sage").text("Could not load gist.");
    var url = window.location.href.replace(/\?.*/,'');
    $("#url").text(url);
    $("#usage").show();	
}

$(function() {
    var id = window.location.href.slice(window.location.href.indexOf('?') + 1);

    $.ajax({
	url: 'https://api.github.com/gists/'+id,
	type: 'GET',
	dataType: 'jsonp'
    }).success( function(gistdata) {
	if (!(gistdata.data) || !(gistdata.data.files)) {
	    displayHelp();

	    if (gistdata.data) {
		$("#message").text(gistdata.data.message);
	    }
	} else {
	    var files = gistdata.data.files;
	    var filenames = Object.keys(files);
	    
	    var template = $("a", "#edit").attr('href');
	    $("a", "#edit").attr('href', template.replace('GISTID',id) );
	    $("#edit").show();

	    var cells = $("#cells");
	    
	    filenames.forEach( function(filename) {
		var content = files[filename].content;

		var header = $("<h3></h3>");
		header.text(filename);
		cells.append(header);
		
		var cell = $("<div></div>");
		cells.append(cell);
		
		var script = document.createElement('script');
		script.type = "text/x-sage";
		script.text = content; 
		cell.append(script);
		
		cell.uniqueId();
		sagecell.makeSagecell({"inputLocation": "#" + cell.attr('id') });		
	    });
	}
    }).error( function(e) {
	displayHelp();
    });
});
