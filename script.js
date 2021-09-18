 let cells = document.querySelectorAll("img");
 for(var i = 0;i < 4;i++){  
   cells[i].onclick = function(e){
   var img = document.createElement("img");
   img.src = "big/" + (e.target.id[1]) + ".png";
   big_picture.innerHTML = "<img src='" + img.src + "'>";
   img.onerror = function() {
    alert("Ошибка во время загрузки изображения");
   };
   }
 }
