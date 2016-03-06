$(function() {
    $.ajax({
        url: '/api/articles',
        success: function(data) {
            console.log(data);
            // $.each(data, function(i,item){
            //   $.each(item,function(name,value){
            //     console.log(name+ ':' +value);
            //   });
            // });
             var hometemplate  =  $("#hometemplate").html();
             // debugger
             var template = Handlebars.compile(hometemplate);
             var html = template(data[0]);
             console.log(html);
              // $('.row').append(html);
              // $('.row').append(template(data[1]));
             $('.row').append(html).append(template(data[1])).append(template(data[2]));
        }
    })
});