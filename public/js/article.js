$(function(){
  var pathname = window.location.pathname;
  var id=pathname.substring(pathname.length-24);
  console.log(id);
  $.ajax({
    url:"/api/articles/"+id,
    success: function(data){
      console.log(data);
      var articleTemplate = $('#articleTemplate').html();
      var template = Handlebars.compile(articleTemplate);
      var html = template(data);
      $('.article').append(html);
    }
  });
});

