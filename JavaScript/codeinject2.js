function jacobSearch(){
  return 1
}
window.MY_COUNTER=1
$("#go").on('click', function(){
  $("#go").html("&raquo; Run " + window.MY_COUNTER)
  window.MY_COUNTER++
})

$("body").append("<div>Hello Jacob</div>")