function simulate_system() {

  // system parameters
  var L = 0.001, RL = 0.1;
  var Rload = 50;
  var C = 0.001;
  var Vs = 42;

  // results
  var dldt = [], dvdt = [], il = [], vc = [], t = [];
    
  // Initial conditions
  var il_init = 0, vc_init = 0;
	var t_start = 0, t_end = 0.1, h = 0.00001;
	il[0] = il_init, vc[0] = vc_init, dldt[0] = 0, dvdt[0] = 0, t[0] = 0;
	
	// simulation parameters
	var D = 0.5; 
  
  //simulate average model of boost converter
  var l = t_end/h + 1;
	for (i = 1; i<=l; i++)
	{
	dldt[i] = (1/L) * (Vs - D*vc[i-1] - RL*il[i-1]);
	dvdt[i] = (1/C) * (D*il[i-1] - vc[i-1]/Rload);
	il[i]   = il[i-1] + h*dldt[i];
	vc[i]   = vc[i-1] + h*dvdt[i];
	t[i]    = t[i-1] + h;
	}
 
	//debug results on console
	//document.getElementById("demo").innerHTML = vc;

  // Plot system states
  console.time('line');
  Highcharts.chart('container', {

    chart: {
        zoomType: 'x'
    },

    title: {
        text: 'Boost converter bus voltage Vc(V)'
    },

    subtitle: {
        text: 'Using the Boost module'
    },

    tooltip: {
        valueDecimals: 2
    },

    xAxis: [{
        data: t,
        name: 'time(s)'
    }],

    series: [{
        data: vc,
        lineWidth: 0.5,
        name: 'Bus voltage'
    }]

});
console.timeEnd('line');

}
