$(document).ready(function() {
  
      var Snake=function(width,height,length,spd,direction){
    this.width=width||20;
    this.height=height||20;
    this.spd=spd||200;
    this.length=length||3;
    this.direction=direction||39;
    this.goX=0;
    this.goY=0;
    this.snakebody=[];
    this.foodbody=[];
    this.grade=0;
    this.init();
};
   
   Snake.prototype = {
    //判断是否吃到食物
    coincide:function(){
      for (var i = 0; i < this.snakebody.length;i++) {
      if(this.foodbody[0][0]==this.snakebody[i][0]&&this.foodbody[0][1]==this.snakebody[i][1])
      {
         return true; 
      }
    };
    return false;
    },
    //this绑定
    bind:function(fn,context){
      return function(){
        return fn.apply(context,arguments);
      }
    },
    //判断是否吃到自己
    eatself:function(point){
      if(point instanceof Array){
        for (var i = 0; i <this.snakebody.length-1; i++) {
           if(point[0]==this.snakebody[i][0]&&point[1]==this.snakebody[i][1]){
            return true;
           }
        };
      }
      return false;
    },
    //判断是否撞到墙
    hitwall:function(point){
    if(point instanceof Array){
      if(point[0]<0||point[1]<0||point[0]>this.height-1||point[1]>this.width-1){
        return true;
        }
    }
    return false;
    },
    //table布局
   map:function(){
     var table=document.createElement("table");
    $(".snakegame").append(table);
   for (var i = 0; i < this.height; i++) {
   
    var tr = document.createElement("tr");

      $("table").append(tr);
      for (var j = 0; j < this.width; j++) {
         var td = document.createElement("td");
        $("table tr:eq("+i+")").append(td);
      };
   };
   },
   //蛇身
    body:function(){
    var j;
   for (var i = 0 ; i <j; i++) {
       this.snakebody[i]=new Array();
      };
      this.snakebody.push([1,3]);
      this.snakebody.push([1,4]);
      this.snakebody.push([1,5]);
      this.snakebody.push([1,6]);
        this.snakebody.push([1,7]);
      this.color();
     },
    //蛇的颜色
     color:function(){
      $("table tr td").removeClass("snake snake_head");
      for (var i = 0; i < this.snakebody.length-1; i++) {
        $("table tr:eq("+this.snakebody[i][0]+") td:eq("+this.snakebody[i][1]+")").addClass("snake");
        $("table tr:eq("+this.snakebody[this.snakebody.length-1][0]+") td:eq("+this.snakebody[this.snakebody.length-1][1]+")").addClass("snake_head");
   };
 },
   //食物
  food:function(){
      var j;

      for (var i = 0; i < 1; i++) {
      this.foodbody[i]=new Array();
      }
    for ( i = 0; i < 1; i++) {
      this.foodbody[i][0]=Math.floor(this.width*Math.random());
      this.foodbody[i][1]=Math.floor(this.height*Math.random());
    };
    if(this.coincide()){
      this.food();
      return false;
    }
    $("table tr td").removeClass("food");
    $("table tr:eq("+this.foodbody[this.foodbody.length-1][0]+") td:eq("+this.foodbody[this.foodbody.length-1][1]+")").addClass("food");
  
  },
//键盘监听
   keydown:function(e){
    var e=event ||window.event;
    this.direction=e?e.keyCode:0;
},
    move:function(){
     var headery=this.snakebody[this.snakebody.length-1][0];
     var headerx=this.snakebody[this.snakebody.length-1][1];
     console.log(this.snakebody);
      switch(this.direction){
      case 39:
      if(this.goX!=-1){
          this.snakebody.push([headery,headerx+1]);
           this.goX=1;
           this.goY=0;
       }
       else{
         this.snakebody.push([headery,headerx-1]);
        this.direction=37;
       }
           break;
       
      case 40:
       if(this.goY!=1){
          this.snakebody.push([headery+1,headerx]);
           this.goY=-1;
           this.goX=0;
       }
       else{
          this.snakebody.push([headery-1,headerx]);
        this.direction=38;
       }
           break;
       
     case 38:
       if(this.goY!=-1){
          this.snakebody.push([headery-1,headerx]);
           this.goY=1;
           this.goX=0;
       }
       else{
         this.snakebody.push([headery+1,headerx]);
        this.direction=40;
       }
           break;
     case 37:
       if(this.goX!=1){
            this.snakebody.push([headery,headerx-1]);
           this.goX=-1;
           this.goY=0;
       }
       else{
         this.snakebody.push([headery,headerx+1]);
        this.direction=39;
       }
           break;
       }
       //吃到食物了
      if(this.coincide()){
          
          this.grade++;
           this.food();//生成新的食物；
      }
      else{
         this.snakebody.shift();
      }
      //撞墙了
      if(this.hitwall(this.snakebody[this.snakebody.length-1])){
        clearInterval(this.snakeTimer);
        msg="撞墙了，分数为"+this.grade+"";
             alert(msg);
             return false;
      }
      //吃到自己了
      if(this.eatself(this.snakebody[this.snakebody.length-1])){
         clearInterval(this.snakeTimer);
        msg="吃到自己了，分数为"+this.grade+"";
             alert(msg);
             return false;
      }
     
          this.color();
    },
   
    main:function(){
      this.snakeTimer = setInterval(this.bind(this.move,this),this.spd);
    },
    init:function(){
    this.map();
    this.body();
    this.food();
    this.main();
    document.onkeydown=this.bind(this.keydown,this);
  },
};

   
new Snake();
   
    

   

});