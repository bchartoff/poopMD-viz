function drawFig1(){
	d3.csv("data/fig1.csv",function(error,data){
		var normal = data
			.filter(function(o){return parseInt(o.stool_type) == 1})
			.sort(function(a,b){
				return a.color < b.color
			})

		var abnormal = data
			.filter(function(o){return parseInt(o.stool_type) == 2})
			.sort(function(a,b){
				return a.color < b.color
			})
		var indeterminate = data
			.filter(function(o){return parseInt(o.stool_type) == 3})
			.sort(function(a,b){
				return a.color < b.color
			})

		var width = 750;
		var height = 1000;
		var cellSize = 15;
		var margin = {"left": 20, "top": 30, "right": 20, "bottom": 20}
		var svg = d3.select("#figure1 svg")
			// .append("svg")
			.attr("width",width + margin.left + margin.right)
			.attr("height",height + margin.top + margin.bottom)
			.append("g")

		svg
			.selectAll(".normalRect")
			.data(normal)
			.enter()
			.append("rect")
			.attr("class","normalRect")
			.attr("width",cellSize)
			.attr("height",cellSize)
			.style("fill", function(d){ return d.color})
			.attr("x", function(d,i){
				i += 1;
				var rowCount = Math.floor( ((width/3 - margin.left - margin.right) / cellSize) )
				console.log(rowCount)
				return margin.left + ( (((i-1)%rowCount)) * (cellSize) )
			})
			.attr("data-x", function(d,i){
				i += 1;
				var rowCount = Math.floor( ((width/3 - margin.left - margin.right) / cellSize) )
				console.log(rowCount)
				return margin.left + ( (((i-1)%rowCount)) * (cellSize) )
			})
			.attr("y", function(d,i){
				i += 1;
				var rowCount = Math.floor( ((width/3 - margin.left - margin.right) / cellSize) )
				return margin.top + ( (Math.ceil(i/rowCount)-1) * (cellSize) )
			})
			.attr("data-y", function(d,i){
				i += 1;
				var rowCount = Math.floor( ((width/3 - margin.left - margin.right) / cellSize) )
				return margin.top + ( (Math.ceil(i/rowCount)-1) * (cellSize) )
			})
		svg
			.selectAll(".abnormalRect")
			.data(abnormal)
			.enter()
			.append("rect")
			.attr("class","abnormalRect")
			.attr("width",cellSize)
			.attr("height",cellSize)
			.style("fill", function(d){ return d.color})
			.attr("x", function(d,i){
				i += 1;
				var rowCount = Math.floor( ((width/3 - margin.left - margin.right) / cellSize) )
				console.log(rowCount)
				return margin.right + width/3 + ( (((i-1)%rowCount)) * (cellSize) )
			})
			.attr("data-x", function(d,i){
				i += 1;
				var rowCount = Math.floor( ((width/3 - margin.left - margin.right) / cellSize) )
				console.log(rowCount)
				return margin.right + width/3 + ( (((i-1)%rowCount)) * (cellSize) )
			})
			.attr("y", function(d,i){
				i += 1;
				var rowCount = Math.floor( ((width/3 - margin.left - margin.right) / cellSize) )
				return margin.top + ( (Math.ceil(i/rowCount)-1) * (cellSize) )
			})
			.attr("data-y", function(d,i){
				i += 1;
				var rowCount = Math.floor( ((width/3 - margin.left - margin.right) / cellSize) )
				return margin.top + ( (Math.ceil(i/rowCount)-1) * (cellSize) )
			})
			.append("text").text(function(d,i){ return i})
		svg
			.selectAll(".indeterminateRect")
			.data(indeterminate)
			.enter()
			.append("rect")
			.attr("class","indeterminateRect")
			.attr("width",cellSize)
			.attr("height",cellSize)
			.style("fill", function(d){ return d.color})
			.attr("x", function(d,i){
				i += 1;
				var rowCount = Math.floor( ((width/3 - margin.left - margin.right) / cellSize) )
				console.log(rowCount)
				return margin.right + 2*width/3 + ( (((i-1)%rowCount)) * (cellSize) )
			})
			.attr("data-x", function(d,i){
				i += 1;
				var rowCount = Math.floor( ((width/3 - margin.left - margin.right) / cellSize) )
				console.log(rowCount)
				return margin.right + 2*width/3 + ( (((i-1)%rowCount)) * (cellSize) )
			})
			.attr("y", function(d,i){
				i += 1;
				var rowCount = Math.floor( ((width/3 - margin.left - margin.right) / cellSize) )
				return margin.top + ( (Math.ceil(i/rowCount)-1) * (cellSize) )
			})
			.attr("data-y", function(d,i){
				i += 1;
				var rowCount = Math.floor( ((width/3 - margin.left - margin.right) / cellSize) )
				return margin.top + ( (Math.ceil(i/rowCount)-1) * (cellSize) )
			})
		svg
			.append("text")
			.attr("y",20)
			.attr("x",margin.left)
			.attr("class","subtitle")
			.text("Normal (" + normal.length + " observations)")
		svg
			.append("text")
			.attr("y",20)
			.attr("x",width/3 + margin.left)
			.attr("class","subtitle")
			.text("Abnormal (" + abnormal.length + " observations)")
		svg
			.append("text")
			.attr("y",20)
			.attr("x",2*width/3 + margin.left)
			.attr("class","subtitle")
			.text("Indeterminate (" + indeterminate.length + " observations)")
	d3.selectAll("rect")
		.on("mouseover", function(d){
			console.log(d.color)
			d3.select("#tooltip span").text(d.color)
			d3.select(this).node().parentNode.appendChild(this)
			d3.select(this)
				.transition()
				.delay(300)
				.attr("x", function(){
					return parseFloat(d3.select(this).attr("data-x")) - cellSize*1.5
				})
				.attr("y", function(){
					return parseFloat(d3.select(this).attr("data-y")) - cellSize*1.5
				})
				.attr("width",String(cellSize * 5) + "px")
				.attr("height",String(cellSize * 5) + "px")
				.style("filter","url(#dropshadow)")
		})
		.on("mouseout", function(d){
			d3.select(this)
				.transition()
				.attr("x", function(){
					return parseFloat(d3.select(this).attr("data-x"))
				})
				.attr("y", function(){
					return parseFloat(d3.select(this).attr("data-y"))
				})
				.attr("width",String(cellSize) + "px")
				.attr("height",String(cellSize) + "px")
				.style("filter","none")


		})
	})
}
drawFig1();

      // var x = margin.left + ( (((i-1)%rowCount)) * (small_width+gutter) )
      // var y = margin.top + ( (Math.ceil(i/rowCount)-1) * (small_width+gutter) )
