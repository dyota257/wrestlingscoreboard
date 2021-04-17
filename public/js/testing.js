$('button').click(function() {
    
    if(this.id === 'victory') {
        
        victory('blue', 'fall');
    }

    if(this.id === 'prefill') {
        $(".popup input[name=matchID]").val("matchID")
        $(".popup input[name=mat]").val("mat")
        $(".popup input[name=tournament]").val("tournament")
        $(".popup input[name=red]").val("red")
        $(".popup input[name=blue]").val("blue")
        $(".popup input[name=winner]").val("winner")
        $(".popup input[name=class_points_red]").val("class_points_red")
        $(".popup input[name=class_points_blue]").val("class_points_blue")
        $(".popup input[name=age]").val("age")
        $(".popup input[name=gender]").val("gender")
        $(".popup input[name=style]").val("style")
        $(".popup input[name=weight]").val("weight")
        $(".popup input[name=time_start]").val("time_start")
        $(".popup input[name=time_end]").val("time_end")
        $(".popup input[name=time_clock]").val("time_clock")
    }



})