import selection from './selection.js'
import parser from './bmark_parser.js'

require('vue');

var selectbox = new selection(document.body);
var bmark_parser = new parser(document.body);

var curpos = {x: 0, y: 0};

function select_area(){
}

function find_element_fromtext(text){

}

function find_element_fromcurpos(){
    let setpos_x = window.pageXOffset + curpos.x;
    let setpos_y = window.pageYOffset + curpos.y;
    let obj = document.elementFromPoint(curpos.x, curpos.y);
    let block_elem = bmark_parser.parse( obj );
    let additional_info = bmark_parser.get_information_tagsearch( block_elem );
    console.log( block_elem );
    console.log( additional_info );

    let send_additional_info = {};
    let send_additional_info_tostr = "";
    additional_info.forEach( (info) => {
        if( info.elements.length > 0 ){
            let set_innertext = info.elements[0].innerHTML;
            send_additional_info[info.elem[0]] = { text: set_innertext}
            send_additional_info_tostr += set_innertext + ",";
        }
    });

    return {
                block: block_elem.innerHTML,
                additional_info: send_additional_info,
                title: document.title,
                url: window.location.href,
                additional_info_tostr: send_additional_info_tostr
            };
}

function handler_mousemove(e){
    curpos.x = e.clientX;
    curpos.y = e.clientY;
}

document.addEventListener("contextmenu", handler_mousemove, false);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if( request.id = "element_memo" ){
          sendResponse(find_element_fromcurpos());
      }
      else{
          sendResponse();
      }
  }
);

