var width, height,height1, center;
var points = 10;
var smooth = true;
var path = new Path();
var path1 = new Path();
var mousePos = view.center / 2;
var pathHeight = mousePos.y;
var pathHeight1 = mousePos.y+10;

path.fillColor = 'darkblue';
path1.fillColor = 'blue';
initializePath();

function initializePath() {
	center = view.center;
	width = view.size.width;
	height = view.size.height / 2;
  
  height1 = view.size.height ;
	
  
  path1.segments = [];
	path1.add(view.bounds.bottomLeft);
	for (var i = 1; i < points; i++) {
		var point = new Point(width / points * i, center.y+200);
		path1.add(point);
	}
	path1.add(view.bounds.bottomRight);
	path1.fullySelected = true;
  
  
  
  
  path.segments = [];
	path.add(view.bounds.bottomLeft);
	for (var i = 1; i < points; i++) {
		var point = new Point(width / points * i, center.y);
		path.add(point);
	}
	path.add(view.bounds.bottomRight);
	path.fullySelected = true;
}

function onFrame(event) {
	pathHeight += (center.y - mousePos.y - pathHeight) / 10;
	pathHeight1 += (center.y +20- mousePos.y - pathHeight1) / 30;

  for (var i = 1, k=3; i < points, k<points; i++, k++) {
		var sinSeed = event.count + (i + i % 10) * 100;
    var sinSeed1 = event.count + (k + k % 10) * 100;
		
    var sinHeight = Math.sin(sinSeed / 200) * pathHeight;
		var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
    
    var sinHeight1 = Math.sin(sinSeed1 / 400) * pathHeight1;
		var yPos1 = Math.sin(sinSeed1 / 100) * sinHeight1 + height1;
    
		path.segments[i].point.y = yPos;
    path1.segments[i].point.y = yPos1;
	}
	if (smooth)
		path.smooth({ type: 'continuous' });
  	path1.smooth({ type: 'continuous' });
}

function onMouseMove(event) {
	mousePos = event.point;
}

function onMouseDown(event) {
	smooth = !smooth;
	if (!smooth) {
		// If smooth has been turned off, we need to reset
		// the handles of the path:
		for (var i = 0, l = path.segments.length; i < l; i++) {
			var segment = path.segments[i];
			segment.handleIn = segment.handleOut = null;
		}
	}
}

// Reposition the path whenever the window is resized:
function onResize(event) {
	initializePath();
}