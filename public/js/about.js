$(function(){
  $.ajax({
    method:"GET",
    url:"/api/categories",
    success:  function(data){
      console.log(data);
      $.each(data,function(index,value){
       $("#categories").append("<a href='#' class='list-group-item'>"+"<span class='label label-default label-pill pull-xs-right'>"+value.count+"</span>"+value.name+"</a>");
       // $("#categories").append('<li class="list-group-item"><span class="label label-default label-pill pull-xs-right">'++"14</span>"+value.name+"</li>");
      });
     }
  });
});
