$(function() {
    $.ajax({
        url: '/api/articles',
        success: function(data) {
             var hometemplate  =  $("#hometemplate").html();
             var template = Handlebars.compile(hometemplate);
             var html;
             $.each(data, function(index,value){
                html = template(value);
                $('.row').append(html);
             });
             // $('.row').append(html).append(template(data[1])).append(template(data[2]));
        }
    });
});

