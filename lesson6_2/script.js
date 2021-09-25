		var item0 = {
			title: 'Товар №1',
			imageSrc: 'img/1.png',
			price: 100,
			count: 1
		};
		var item1 = {
			title: 'Товар №2',
			imageSrc: 'img/2.png',
			price: 50,
			count: 1
		};
		var item2 = {
			title: 'Товар №3',
			imageSrc: 'img/3.png',
			price: 500,
			count: 1
		};
		var item3 = {
			title: 'Товар №4',
			imageSrc: 'img/4.png',
			price: 1000,
			count: 1
			};

		var comp = [item0, item1, item2, item3];

		var sumcomp = 0;
		var countcomp = 0;

		function buy() {
			var assortiment = document.querySelector('.assortiment');
			for (i = 0; i < comp.length; i++) {
				var elem = document.createElement('div');
				elem.classList.add('comp_item');
				elem.append(document.createTextNode(comp[i].title));
				var elemImg = document.createElement('img');
				elemImg.classList.add('img');
				elemImg.src = comp[i].imageSrc;
				elem.append(elemImg);

				elem.append(document.createTextNode('Цена: ' + comp[i].price + ' \u0024'));

				elemBtn = document.createElement('button');
				elemBtn.innerText = 'Купить';
				elemBtn.classList.add('buyBtn');
				elemBtn.setAttribute('id', 'b' + i);
				elemBtn.onclick = addcomp;
				elem.appendChild(elemBtn);

				assortiment.appendChild(elem);
			}
		}
		
		function addcomp(e) {
				var button = e.target;
				var arrayBtn = button.id;
				var id = arrayBtn[1];
				var chooseItem = comp[id];
				var choosecomp = document.querySelector('.showCase');

				var tr = choosecomp.insertRow();//Вставка строки в таблицу
				var td = tr.insertCell();

				sumcomp += chooseItem.price;
				td.appendChild(document.createTextNode(chooseItem.title + "   " + chooseItem.count + '  шт.' + ' / ' + ' Цена ' + chooseItem.price + ' \u0024')); 
				document.querySelector('.sum').textContent = 'Сумма: ' + sumcomp + ' \u0024';
			}
			buy();
