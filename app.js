/* @author Florian Fries (mail@flolefries.com) */
function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function(){
    $("form").on("submit", function(e){
        e.preventDefault();
        // matrices for request and response data
        var tracks = [];
        var results = [];
        var titles = [];
        var videoIDs = [];
        // divide tracklist into individual search terms
        $.each($("#search").val().replace(/%20/g, "+").split(/\n/), function(i, track){
            if(track){
                tracks.push(track);
            } else {
                tracks.push("");
            }
        });
        // var tracks = tracklist.split('\n');
        for(var i = 0; i < tracks.length; i++){
            // prepare the request
            var request = gapi.client.youtube.search.list({
                part: "snippet",
                type: "video",
                q: tracks[i],
                maxResults: 1,
                order: "relevance"
            });
            // execute the request save results
            request.execute(function(response){
                results.push(response.items[0]);
                // check if results found
                if (response.pageInfo.totalResults < 1){
                    titles.push("No Results");
                    videoIDs.push("null");
                    // add results to page
                    $("#results").append("No Results for : "+ tracks[i] +"<br>");
                } else {
                    titles.push(response.items[0].snippet.title);
                    videoIDs.push(response.items[0].id.videoId);
                    // add results to page
                    // $("#results").append(response.items[0].snippet.title+" "+"<br>");  
                    // $("#results").append("<iframe class= 'video w100' width='640' height='300' src='www.youtube.com/embed/"+response.items[0].id.videoId+"></iframe>")
                    console.log(response.items[0].id.videoId)
                    $("#results").append("<div class='embed-responsive embed-responsive-16by9'><iframe class='embed-responsive-item' src='https://www.youtube.com/embed/"+response.items[0].id.videoId+"' allowfullscreen></iframe></div>");
                }
            });
        }
    });
});

function init(){
    gapi.client.setApiKey("AIzaSyDNssDRqc5ZYi3TDbm3QAxa_iBa24DKIuc");
    gapi.client.load("youtube", "v3", function(){
    // youtube api is ready
    });
}