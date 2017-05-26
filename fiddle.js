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
	console.log(gistdata);
	if (!(gistdata.data) || !(gistdata.data.files)) {
	    displayHelp();

	    if (gistdata.data) {
		$("#message").text(gistdata.data.message);
	    }
	} else {
	    var files = gistdata.data.files;
	    var filenames = Object.keys(files);
	    var content = files[filenames[0]].content;

	    var template = $("a", "#edit").attr('href');
	    $("a", "#edit").attr('href', template.replace('GISTID',id) );
	    $("#edit").show();
	    
	    var script = document.createElement('script');
	    script.text = content; 
	    document.getElementById("sage").appendChild(script);
	    
	    sagecell.makeSagecell({"inputLocation": "#sage"});
	}
    }).error( function(e) {
	displayHelp();
    });
});
