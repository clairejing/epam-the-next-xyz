$(function() {
    $.ajax({
        url: '/api/articles',
        success: function(data) {
             var hometemplate  =  $("#hometemplate").html();
             var template = Handlebars.compile(hometemplate);
             var html = template(data[0]);
             $('.row').append(html).append(template(data[1])).append(template(data[2]));
        }
    });
});

