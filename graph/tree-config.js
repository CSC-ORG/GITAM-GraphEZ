var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};



function init(){
    //init data
    var json = {
        id: "node00",
        name: "Technical intern",
        data: {info: "Job description for technical intern"},
        children: [{
            id: "node101",
            name: "Programmer Analyst",
            data: {info: "Job description for programmer analyst"},
            children: []
        }, {
            id: "node102",
            name: "System Programmer analyst",
            data: {info: "Job description for system programmer analyst"},
            children: []
        }, {
            id: "node103",
            name: "Software Engineer",
            data: {info: "Job description for system programmer analyst"},
            children: [{
                id: "node201",
                name: "Application Designer",
                data: {info: "Job description for system programmer analyst"},
                children: [{
                    id: "node301",
                    name: "Application architect",
                    data: {info: "Job description for system programmer analyst"},
                    children: []
                },{
                    id: "node302",
                    name: "solution Analyst",
                    data: {info: "Job description for system programmer analyst"},
                    children: [{
                        id: "node401",
                        name: "solution Architect",
                        data: {info: "Job description for programmer analyst"},
						
                        children: [{
                            id: "node501",
                            name: "Information system Architect",
                            data: {info: "Job description for programmer analyst"},
							
                            children: []
                        },{
                            id: "node502",
                            name: "Information Security Architect",
                            data: {info: "Job description for programmer analyst"},
							
                            children: []
                        }
                        ]
                    }]
                }]
               }]

        }, {
            id: "node104",
            name: "Application Developer",
            data: {info: "Job description for application developer"},
			
            children: []
       }, {
            id: "node105",
            name: "Application Engineer",
            data: {info: "Job description for application engineer"},
			
            children: []
       },{
           id: "node106",
           name: "Business Analyst",
           data: {info: "Job description for business analyst"},
		   
           children: [{
            id: "node202",
            name: "Business Architect",
            data: {info: "Job description for business architect"},
			
            children: []
           }]
       },{
          id: "node107",
          name: "Database Administrator",
          data: {info: "Job description for database administrator"},
		  
          children: [{
            id: "node203",
            name: "Database Consultant",
            data: {info: "Job description for database Consultant"},
            children: [{
                id: "node303",
                name: "Database Designer",
                data: {info: "Job description for database designer"},
				
                children: []
            },{
                id: "node304",
                name: "Data Warehousing Designer",
                data: {info: "Job description for data warehousing designer"},
				
                children: [{
                    id:"node402",
                    name: "Data Modeler",
                    data: {info: "Job description for data modeler"},
					
                    children: []
                }]
            }]
          }]
       },{
           id: "node108",
           name: "Database Developer",
           data: {info: "Job description for database developer"},
		   
           children: []
       }
           ]};
    //end
    //init Spacetree
    //Create a new ST instance
    var st = new $jit.ST({
        //id of viz container element
        injectInto: 'infovis',
        //set duration for the animation
        duration: 800,
        //set animation transition type
        transition: $jit.Trans.Quart.easeInOut,
        //set distance between node and its children
        levelDistance: 50,
		
		Events: {
			//enableForEdges: true
			enable : true,
			enableForEdges : true,

			onClick : function(nodeOrEdge, eventInfo, e) {

				//if (!nodeOrEdge) return;  
				alert(nodeOrEdge.nodeFrom);
				if (eventInfo.getEdge()) {
				   alert(" Edge clicked");
				}
			},
			onMouseEnter: function(node, eventInfo, e) {  
				viz.canvas.getElement().style.cursor = 'pointer';  
			},  
			onMouseLeave: function(node, eventInfo, e) {  
				viz.canvas.getElement().style.cursor = '';  
			},
		},
        //enable panning
        Navigation: {
			enable:true,
			panning:true
        },
        //set node and edge styles
        //set overridable=true for styling individual
        //nodes or edges
        Node: {
            height: 40,
            width: 140,
            type: 'rectangle', // supported types 'none', 'circle', 'rectangle', 'ellipse' and 'square'
            color: '#aaa',
			valign: "center",
            overridable: true
        },
        
        Edge: {
            //type: 'bezier',
			//type: 'line',  
			//type: 'hyperline',
			type: 'arrow',
			lineWidth: 2,
            overridable: true,
            color: 'red',
			epsilon : 7
        },
        
        onBeforeCompute: function(node){
            //Log.write("loading " + node.name);
        },
        
        onAfterCompute: function(){
            //Log.write("done");
        },
        
        //This method is called on DOM label creation.
        //Use this method to add event handlers and styles to
        //your node.
        onCreateLabel: function(label, node){
            label.id = node.id;            
            label.innerHTML = node.name;
            label.ondblclick = function(){
            	if(normal.checked) {
            	  st.onClick(node.id);
            	} else {
                st.setRoot(node.id, 'animate');
            	}
            };
			
			label.onclick = function(){
				
				$(this).popModal({
					html : node.data.info,
					placement : 'bottomLeft',
					showCloseBut : true,
					onDocumentClickClose : true,
					onDocumentClickClosePrevent : '',
					overflowContent : false,
					inline : true,
					asMenu : false,
					beforeLoadingContent : 'Please, wait...',
					onOkBut : function() {},
					onCancelBut : function() {},
					onLoad : function() {},
					onClose : function() {}
				});
			};
			
            //set label styles
            var style = label.style;
            style.width = 60 + 'px';
            style.height = 17 + 'px';            
            style.cursor = 'pointer';
            style.color = '#000';
            style.fontSize = '8';
            style.textAlign= 'center';
            style.paddingTop = '3px';
        },
        
        //This method is called right before plotting
        //a node. It's useful for changing an individual node
        //style properties before plotting it.
        //The data properties prefixed with a dollar
        //sign will override the global node style properties.
        onBeforePlotNode: function(node){
            //add some color to the nodes in the path between the
            //root node and the selected node.
            if (node.selected) {
                node.data.$color = "#99CC66";
            }
            else {
                delete node.data.$color;
                //if the node belongs to the last plotted level
                if(!node.anySubnode("exist")) {
                    //count children number
                    var count = 0;
                    node.eachSubnode(function(n) { count++; });
                    //assign a node color based on
                    //how many children it has
                    node.data.$color = ['#99CCCC', '#CCCCFF', '#caa', '#daa', '#eaa', '#faa'][count];                    
                }
            }
        },
            
        //This method is called right before plotting
        //an edge. It's useful for changing an individual edge
        //style properties before plotting it.
        //Edge data proprties prefixed with a dollar sign will
        //override the Edge global style properties.
        onBeforePlotLine: function(adj){
            if (adj.nodeFrom.selected && adj.nodeTo.selected) {
                adj.data.$color = "#99CC66";
                adj.data.$lineWidth = 3;
            }
            else {
                delete adj.data.$color;
                delete adj.data.$lineWidth;
            }
        }
    });
    //load json data
    st.loadJSON(json);
    //compute node positions and layout
    st.compute();
    //optional: make a translation of the tree
    st.geom.translate(new $jit.Complex(-200, 0), "current");
    //emulate a click on the root node.
    st.onClick(st.root);
    //end
    //Add event handlers to switch spacetree orientation.
    var top = $jit.id('r-top'), 
        left = $jit.id('r-left'), 
        bottom = $jit.id('r-bottom'), 
        right = $jit.id('r-right'),
        normal = $jit.id('s-normal');
        
    
    function changeHandler() {
        if(this.checked) {
            top.disabled = bottom.disabled = right.disabled = left.disabled = true;
            st.switchPosition(this.value, "animate", {
                onComplete: function(){
                    top.disabled = bottom.disabled = right.disabled = left.disabled = false;
                }
            });
        }
    };
    
    top.onchange = left.onchange = bottom.onchange = right.onchange = changeHandler;
    //end

}
