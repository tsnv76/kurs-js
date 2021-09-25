		// Глобальные переменные:                            
			var FIELD_SIZE_X = 20;
			var FIELD_SIZE_Y = 20;
			var SNAKE_SPEED = 200;
			var snake = [];
			var direction = 'y+';
			var gameIsRunning = false;
			var snake_timer;
			var food_timer;
			var score = 0;
			var currentScore;


			function init() {
				prepareGameField(); // Генерация поля

				var wrap = document.getElementsByClassName('wrap')[0];
				wrap.style.width = '400px';
				// События кнопок Старт и Новая игра
				document.getElementById('snake-start').addEventListener('click', startGame);
				document.getElementById('snake-renew').addEventListener('click', refreshGame); 

				// Отслеживание клавиш клавиатуры
				addEventListener('keydown', changeDirection);
			}

			//Функция генерации игрового поля
			function prepareGameField() {
//---------------------------------------------------------------------------------------
				currentScore = document.querySelector('h3');
				currentScore.classList.add('score-string');
//---------------------------------------------------------------------------------------
				// Создаём таблицу
				var game_table = document.createElement('table');
				game_table.setAttribute('class', 'game-table');

				// Генерация ячеек игровой таблицы
				for (var i = 0; i < FIELD_SIZE_X; i++) {
					// Создание строки
					var row = document.createElement('tr');
					row.className = 'game-table-row row-' + i;

					for (var j = 0; j < FIELD_SIZE_Y; j++) {
						// Создание ячейки
						var cell = document.createElement('td');
						cell.className = 'game-table-cell cell-' + i + '-' + j;

						row.appendChild(cell); // Добавление ячейки
					}
					game_table.appendChild(row); // Добавление строки
				}

				document.getElementById('snake-field').appendChild(game_table); // Добавление таблицы
			}

			//Старт игры
			function startGame() { 
				gameIsRunning = true;
				respawn();

				snake_timer = setInterval(move, SNAKE_SPEED);
				setTimeout(createFood, 5000);
				setTimeout(createObstacles, 7000);
			}

			//Функция расположения змейки на игровом поле
			function respawn() {
				var start_coord_x = Math.floor(FIELD_SIZE_X / 2);//Координаты центральной ячейки по оси X
				var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);//Координаты центральной ячейки по оси Y

				// Хвост змейки
				var snake_tail = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
				snake_tail.setAttribute('class', snake_tail.getAttribute('class') + ' snake-unit'); 
				// Голова змейки
				var snake_head = document.getElementsByClassName('cell-' + (start_coord_y - 1) + '-' + start_coord_x)[0]; 
				snake_head.setAttribute('class', snake_head.getAttribute('class') + ' snake-unit'); 

				snake.push(snake_tail);//помещаем начальные координаты хвоста змейки в массив snake
				snake.push(snake_head);//помещаем начальные координаты головы змейки в массив snake
			}

			//Движение змейки
			function move() {
				var snake_head_classes = snake[snake.length - 1].getAttribute('class').split(' ');

				// Сдвиг головы
				var new_unit;
				var snake_coords = snake_head_classes[1].split('-');
				var coord_y = parseInt(snake_coords[1]);//Это координаты y текущего положения головы змейки
				var coord_x = parseInt(snake_coords[2]);//Это координаты x текущего положения головы змейки

				// Определяем новую точку
				if (direction == 'x-') { //Изменение координаты направления по оси х влево
					new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x - 1))[0];
				}
				else if (direction == 'x+') {//Изменение координаты направления по оси х вправо
					new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x + 1))[0];
				}
				else if (direction == 'y+') {//Изменение координаты направления по оси у вниз
					new_unit = document.getElementsByClassName('cell-' + (coord_y - 1) + '-' + (coord_x))[0];
				}
				else if (direction == 'y-') {//Изменение координаты направления по оси у вверх
					new_unit = document.getElementsByClassName('cell-' + (coord_y + 1) + '-' + (coord_x))[0];
				}

				if (new_unit == undefined && direction == 'x-') {
					new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (FIELD_SIZE_X - 1))[0];
				} else if (new_unit == undefined && direction == 'x+') {
					new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (0))[0];
				} else if (new_unit == undefined && direction == 'y+') {//Изменение координаты направления по оси у вниз
					new_unit = document.getElementsByClassName('cell-' + (FIELD_SIZE_Y - 1) + '-' + (coord_x))[0];
				} else if (new_unit == undefined && direction == 'y-') {//Изменение координаты направления по оси у вверх
					new_unit = document.getElementsByClassName('cell-' + (0) + '-' + (coord_x))[0];
				}

				// Проверки
				// 1) new_unit не часть змейки
				// 2) Змейка не ушла за границу поля
				if (!isSnakeUnit(new_unit) && new_unit !== undefined && !haveObstacle(new_unit)) {
				// Проверяем: змейка не ушла за границу поля
					// Добавление новой части змейки
					new_unit.setAttribute('class', new_unit.getAttribute('class') + ' snake-unit');
					snake.push(new_unit);

					// Проверяем, надо ли убрать хвост
					if (!haveFood(new_unit)) {
						// Находим хвост
						var removed = snake.splice(0, 1)[0];
						var classes = removed.getAttribute('class').split(' ');

						// удаляем хвост
						removed.setAttribute('class', classes[0] + ' ' + classes[1]);
					}
				}
				else {
					finishTheGame(); //Если змека врезалась сама в себя, то конец игры
				}
			}

			// Проверка на змейку
			function isSnakeUnit(unit) {//Является ли ячейка частью змейки. По умолчанию считается, что нет
				var check = false;

				if (snake.includes(unit)) {
					check = true;
				}
				return check;
			}
			//проверка на еду
			function haveFood(unit) {
				var check = false;

				var unit_classes = unit.getAttribute('class').split(' ');

				// Если еда
				if (unit_classes.includes('food-unit')) {
					check = true;
					createFood();
					score++;
//---------------------------------------------------------------------------------------------------------------------
					currentScore.innerHTML = 'Ваш текущий счет: '  + score;
//-----------------------------------------------------------------------------------------------------------------------

				}
				return check; 
			}


			function haveObstacle(unit) {
					var check = false;

					var unit_classes = unit.getAttribute('class').split(' ');

					// Если препятствие
					if (unit_classes.includes('obstacle-unit')) {
						check = true;
						createObstacles();//Запускаем функцию создать препятствие createObstacles()
					}
					return check;
				}   

			//Создание еды
			function createFood() { //Создание ячейки с кормом
				var foodCreated = false;

				while (!foodCreated) {
					// рандом
					var food_x = Math.floor(Math.random() * FIELD_SIZE_X);//Корм производится в ячейке с рандомномными координатами X 
					var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);//Корм производится в ячейке с рандомномными координатами Y 

					var food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0];
					var food_cell_classes = food_cell.getAttribute('class').split(' '); 

					// проверка на змейку
					
					if (!food_cell_classes.includes('snake-unit')) {
						var classes = '';//очищаем классы....
						for (var i = 0; i < food_cell_classes.length; i++) {
							classes += food_cell_classes[i] + ' ';
						}

						food_cell.setAttribute('class', classes + 'food-unit')
						foodCreated = true;
					}
					
					}
				
			}
//--------------------------------------------------------------------------------------------------------------------------------
			//СОЗДАНИЕ ПРЕПЯТСТВИЙ
			function createObstacles() { 
					var obstacleCreated = false;

					while (!obstacleCreated) {
						// рандом
						var obstacle_x = Math.floor(Math.random() * FIELD_SIZE_X);//Препятствие появляется в ячейке с рандомномными координатами X 
						var obstacle_y = Math.floor(Math.random() * FIELD_SIZE_Y);//Препятствие появляется в ячейке с рандомномными координатами Y 

						var obstacle_cell = document.getElementsByClassName('cell-' + obstacle_y + '-' + obstacle_x)[0];
						var obstacle_cell_classes = obstacle_cell.getAttribute('class').split(' ');

						// проверка на змейку

						if (!obstacle_cell_classes.includes('snake-unit') || !obstacle_cell_classes.includes('food-unit') ) {
							var obstacleClasses = '';
							for (var i = 0; i < obstacle_cell_classes.length; i++) {
								obstacleClasses += obstacle_cell_classes[i] + ' ';
							}

							obstacle_cell.setAttribute('class', obstacleClasses + 'obstacle-unit');
							obstacleCreated = true;
						}

					}

				}


//--------------------------------------------------------------------------------------------------------------------------------
			//Изменение направления движения змейки
			function changeDirection(e) {
				switch (e.keyCode) {
					case 37: // Клавиша влево 
						if (direction != 'x+') {
							direction = 'x-'
						}
						break;
					case 38: // Клавиша вверх
						if (direction != 'y-') {
							direction = 'y+'
						}
						break;
					case 39: // Клавиша вправо
						if (direction != 'x-') {
							direction = 'x+'
						}
						break;
					case 40: // Клавиша вниз
						if (direction != 'y+') {
							direction = 'y-'
						}
						break;
				}
			}

			//Функция завершения игры
			function finishTheGame() {
				gameIsRunning = false;
				clearInterval(snake_timer);
				alert('Вы проиграли! Ваш результат: ' + score.toString());
			}

			//Новая игра
			function refreshGame() {
				location.reload();
			}

			// Инициализация
			window.onload = init;// функция init запускает игру

