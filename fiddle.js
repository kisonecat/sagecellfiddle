$(function() {
    $('#hello').text('hello');

    function displayHelp() {
	$("#sage").text("Could not load gist.");
	var url = window.location.href.replace(/\?.*/,'')
	$("#url").text(url);
	$("#usage").show();	
    }
    
    var id = window.location.href.slice(window.location.href.indexOf('?') + 1);
    var gistid = "cd54d03372dc893632a1aa5360219234";
    
    $.ajax({
	url: 'https://api.github.com/gists/'+id,
	type: 'GET',
	dataType: 'jsonp'
    }).success( function(gistdata) {
	console.log(gistdata);
	var files = gistdata.data.files;
	if (files === undefined) {
	    displayHelp();
	} else {
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
