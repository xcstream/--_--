
// setInterval(function(){
//     socket.emit('api', {tick : i++});
// },3000)

io().on('connection', function(socket){
    console.log('connected')

    //reg handler
    socket.on('resp', function(msg){
        console.log('resp: ' + msg);
    });

    socket.emit('api', {
        action: 'login',
        userid: 293819223,
        token: 12323123,
    })

});

var vm = new Vue({
    el:"#app",
    mounted:function () {
    },
    data:{
        activeIndex:1,
        title:"12356"
    },
    methods:{
        handleOpen:function () {

        },
        handleClose:function () {

        },
        handleSelect:function (x) {
            this.activeIndex = x
        }
    }
})

