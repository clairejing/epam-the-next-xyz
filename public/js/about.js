$(function(){
  $.ajax({
    method:"GET",
    url:"/api/categories",
    success:  function(data){
      console.log(data);
      $.each(data,function(index,value){
         $("#categories").append("<li>"+value.name+"</li>");
      });
     }
  });
});