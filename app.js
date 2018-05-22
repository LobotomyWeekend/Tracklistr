/* @author Florian Fries (mail@flolefries.com) */
function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function(){
    $("form").on("submit", function(e){
        e.preventDefault();
        // prepare the request
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 1,
            order: "relevance"
        });
        // execute the request
        request.execute(function(response){
            var results = response.result;
            $.each(results.items, function(index, item){
                $.get("tpl/item.html", function(data){
                    $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoId": item.id.videoId}]));
                });
            });
        });
    });
});

function init(){
    gapi.client.setApiKey("AIzaSyDNssDRqc5ZYi3TDbm3QAxa_iBa24DKIuc");
    gapi.client.load("youtube", "v3", function(){
        // youtube api is ready
    });
}