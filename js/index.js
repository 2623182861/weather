/*
* @Author: Administrator
* @Date:   2018-01-19 11:18:16
* @Last Modified by:   Administrator
* @Last Modified time: 2018-01-20 15:42:03
*/
// 请求太原天气情况
// 预先设置变量
var weather;
var city;
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原 ",
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		weather=obj.data.weather;
		console.log(weather);
	}
})
// 请求城市情况
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		city=obj.data;
		console.log(city);
	}
})
// 渲染数据
function updata(){

	// 渲染城市
	var cityName=document.getElementsByClassName("header")[0];
	cityName.innerHTML=weather.city_name;
	// 渲染当前气温
	var wendu=document.getElementsByClassName("wendu")[0];
	wendu.innerHTML=weather.current_temperature+"°";
	// 获取当前的天气状况
	var tianqi=document.getElementsByClassName("tianqi")[0];
	tianqi.innerHTML=weather.dat_condition;
	// 今天最高温和最低温
	var dat_high_temperature=document.getElementById("dat_high_temperature");
	dat_high_temperature.innerHTML=weather.dat_high_temperature;
	var dat_low_temperature=document.getElementById("dat_low_temperature");
	dat_low_temperature.innerHTML=weather.dat_low_temperature;
	var quality_level=document.getElementById("quality_level");
	quality_level.innerHTML=weather.quality_level;
	// 今天天气情况
	var dat_condition=document.getElementById("dat_condition");
	dat_condition.innerHTML=weather.dat_condition;
	// 今天的天气图片
	var dat_weather_icon_id=document.getElementById("dat_weather_icon_id");
	dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png);`;

	// 明天最高温和最低温
	var tomorrow_high_temperature=document.getElementById("tomorrow_high_temperature");
	tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;
	var tomorrow_low_temperature=document.getElementById("tomorrow_low_temperature");
	tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature;
	// 明天天气情况
	var tomorrow_condition=document.getElementById("tomorrow_condition");
	tomorrow_condition.innerHTML=weather.tomorrow_condition;
	// 明天的天气图片
	var tomorrow_weather_icon_id=document.getElementById("tomorrow_weather_icon_id");
	tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png);`;


	// 实时天气的获取
	for(var i in weather.hourly_forecast){
		// 创建父元素div
		var now=document.createElement("div");
		// 赋予父元素样式
		now.className="now";
		// 获取now的父元素
		var nowp=document.getElementById("now");
		// 把now插入到父元素中
		nowp.appendChild(now);
		// 时间
		var now_time=document.createElement("h2");
		now_time.className="now_time";
		now_time.innerHTML=weather.hourly_forecast[i].hour+":00";
		now.appendChild(now_time);
		// 天气图标
		var now_pic=document.createElement("div");
		now_pic.className="now_pic";
		now_pic.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png);`;
		now.appendChild(now_pic);
		// 温度
		var now_temp=document.createElement("h3");
		now_temp.className="now_temp";
		now_temp.innerHTML=weather.hourly_forecast[i].temperature+"°";
		now.appendChild(now_temp);
	}
	for(var j in weather.forecast_list){
		var recent=document.createElement("div");
		recent.className="recent";
		var recentp=document.getElementById("recent");
		recentp.appendChild(recent);

		var recent_time=document.createElement("div");
		recent_time.className="recent_time";
		recent_time.innerHTML=weather.forecast_list[j].date.substring(5,7)+"/"+weather.forecast_list[j].date.substring(8);
		recent.appendChild(recent_time);

		// var month=document.createElement("span");
		// month.className="month";
		// month.innerHTML=weather.forecast_list[j].condition;
		// recent_time.appendChild(month);


		var recent_wea=document.createElement("h2");
		recent_wea.className="recent_wea";
		recent_wea.innerHTML=weather.forecast_list[j].condition;
		recent.appendChild(recent_wea);

		var recent_pic=document.createElement("div");
		recent_pic.className="recent_pic";
		recent_pic.style=`background-image:url(img/${weather.forecast_list[j].weather_icon_id}.png);`;
		recent.appendChild(recent_pic);

		var recent_high=document.createElement("h3");
		recent_high.className="recent_high";
		recent_high.innerHTML=weather.forecast_list[j].high_temperature;
		recent.appendChild(recent_high);

		var recent_low=document.createElement("h4");
		recent_low.className="recent_low";
		recent_low.innerHTML=weather.forecast_list[j].low_temperature;
		recent.appendChild(recent_low);

		var recent_wind=document.createElement("h5");
		recent_wind.className="recent_low";
		recent_wind.innerHTML=weather.forecast_list[j].wind_direction;
		recent.appendChild(recent_wind);

		var recent_level=document.createElement("h6");
		recent_level.className="recent_level";
		recent_level.innerHTML=weather.forecast_list[j].wind_level+"级";
		recent.appendChild(recent_level);
	}
	var header=document.getElementsByClassName("header")[0];
	var city_box=document.getElementsByClassName("city_box")[0];
	// 单击header事件
	 header.onclick=function(){
	 	$(".text").val("");
	 	$(".button").html("取消");
	 	city_box.style="dispay:block";
	 }
	 // 渲染城市
	 for(var k in city){
	 	var cityp=document.getElementById("city");
	 	var title=document.createElement("h1");
	 	title.className="title";
	 	title.innerHTML=k;
	 	cityp.appendChild(title);

	 	var con=document.createElement("div");
	 	con.className="con";
	 	for(var y in city[k]){
	 		var son=document.createElement("div");
	 		son.className="son";
	 		son.innerHTML=y;
	 		con.appendChild(son);
	 	}
	 	cityp.appendChild(con);
	 }	 
}


function AJAX(str){
	$.ajax({
		url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
		dataType:"jsonp",
		type:"get",
		success:function(obj){
			weather=obj.data.weather;
			updata();
			$(".city_box").css({"display":"none"});
		}
	})
}
// 当页面加载完成时才用的代码
window.onload=function(){
	updata();

	// 
	$(".son").on("click",function(){
	var cityh=this.innerHTML;
		AJAX(cityh);
	})
	//inout输入数据后，button变为确认
	//focus获取焦点  html是设置或者改变内容
	$(".text").on("focus",function(){
		$(".button_box").html("确认");
	})
	var button_box=document.getElementsByClassName("button_box")[0];
	button_box.onclick=function(){
		var btn=this.innerHTML;
		if(btn=="取消"){
			var city_box1=document.getElementsByClassName("city_box")[0];
			city_box1.style="display:none"
		}
		else
			// value获取text的内容
			var str=document.getElementsByClassName("text")[0].value;
			for(var i in city){
				for(var j in city[i]){
					if(str==j){

						AJAX(str);
						return;
					}
				}
			}	
	}
}
