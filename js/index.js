var data = [
	{
		id: 'box1',
		title: 'First box',
		content: '<p>Lorem ipsum dolor sit amet!</p>',
		categories: ['highlighted', 'special-header', 'important']
	},
	{
		id: 'box2',
		title: 'Second box',
		content: '<p>Lorem ipsum dolor sit amet!</p>',
		categories: ['special-header', 'important']
	},
	{
		id: 'box3',
		title: 'Third box',
		content: '<p>Lorem ipsum dolor sit amet!</p>',
		categories: ['highlighted', 'important']
	},
	{
		id: 'box4',
		title: 'Fourth box',
		content: '<p>Lorem ipsum dolor sit amet!</p>',
		categories: ['highlighted']
	},
	{
		id: 'box5',
		title: 'Fifth box',
		content: '<p>Lorem ipsum dolor sit amet!</p>',
		categories: []
	},
];

var boxes = document.querySelectorAll('.box');

var root = document.getElementById('root');
for(var i=0; i<data.length; i++){
    var div = '<div id="'+ data[i].id +'" class="box '+data[i].categories +'"></div>';
    var header = '<header>'+data[i].title+'</header>';
    var paragraf = data[i].content;
    div.insertAdjacentHTML('beforeend', header);
    div.insertAdjacentHTML('beforeend', paragraf);
    root.insertAdjacentHTML('beforeend', div);
 //   document.querySelector('div[i]').classList.add(data[i].categories);
    
  //  var classes = boxes[i].querySelector('.box')
  //  classes.classList.add(data[i].categories);
    
  
    //var paragraf = 'div class="'+data[i].content+'"</div>';
    //header.insertAdjacentHTML('beforeend', paragraf);
}

/*
for(var i=0; i <data.length; i++){
root.insertAdjacentHTML('beforeend', "<div id="+data[key][id]+" class='box'></div>");
}

var header  = document.getElementById('div');
for(var i=0; i <data.length; i++){
div.insertAdjacentHTML('beforeend', "<div id="+data[key][id]+" class='box'></div>");
}


for(var i=0; i <boxes.length ; i++){
  var div = document.get
  //var boxHeader = boxes[i].querySel);
  //var boxP = boxes[i].querySelector('p');
 // var box = boxes[i].querySelector('.box')
  
  //box.classList.add = data[i].categories;
 // boxHeader.innerHTML = data[i].title;
 // boxP.innerHTML = data[i].content;
}
*/