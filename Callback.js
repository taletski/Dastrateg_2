var obj = { // Объект, который содержит проверяемый массив.
  array: ["someString", "SomeData", "animal", "Toy"]
}
/*В идеале это долен был быть объект, прочтенный из json файла, но chrome запрещает обращаться к локальным
файлам. Надо создавать сервер и обращаться через localhost, но с этим я не успел разобраться*/



//Модуль парсера. Проверяет, чтобы все элементы массива были строками
//А затем заменяет все буквы "А" и "а" в этих строках на цифру "4"
//Обращение к методам модуля происходит с помощью встроенного метода callParser(parameter), где parameter - массив, который нужно обработать
;(function () {

  function Check(array, callback1, callback2){
    var error = false; //Флаг ошибки. Станет True, если был найден нестроковый элемент
    for (var i = 0; i < array.length; i++) { //Цикл поверки
      if (typeof(array[i]) == 'string') {} //проверка на string`
      else {error = true; break;}
    }

    return callback1(error, array, callback2); //Первый колбэк, котрый начнет обрабатывать массив или выведет ошибку, если в массиве есть нестроковые элементы
  }

  function parser(error, array, callback2) { //Первый колбэк - парсер, который должен начать работу после проверки массива в Check()
    if (error) {//проверка на ошибку
      alert("Error: Array contains non string elements." ); //Выдет ошибку, если массив содержит нестроковые элементы
      return array; //в случае ошибки возвращаем массив без изменений.
    }
    else {
      for (var i = 0; i < array.length; i++) { //Цикл по элементам массива
        var element = array[i]; //переменная, в которой хранится обрабатываемый элемент массива
        var elementMask = []; //Массив-маска обрабатываемого элемента. Для слова 'Adams' будет выглядеть как [true, false, true, false, false]
        var hasA = false; //True, если в element найдена буква а или А
        for (var j = 0; j < element.length; j++) { //Цикл для проверки элемента массива на содержание буквы "А" или "а"
          if (element.charAt(j) == 'a' || element.charAt(j) == 'A') {
          elementMask[j] = true;
          hasA = true;
          }
          else { elementMask[j] = false;}
        };

        if (hasA) {//Если в элементе найдена А или а, передаем элемент и его маску в обработчик (второй колбэк).
          array[i] = callback2(element, elementMask); //Обработчик вернет измененный элемент
        }
      };

      return array;
    }
  }

  function changer(string, mask) { //Второй колбэк - нужен для того, чтобы заменить буквы А/а на "4"
    var newString = ''; // Переменная для хранения новой строки
    for (var k = 0; k < string.length; k++) { //Цикл обработки по маске элемента
      if (mask[k]) { //Если mask[k] == true, значит, на этой позиции был найден символ А или а
        newString = newString + '4'; //Записывает "4" вместо него
      }
      else { //Если mask[k] = false, значит, необходимо записать на эту позицию символ без изменений
        newString = newString + string[k]; //записывает то, что было
      }
    }
    return newString;
  }

  this.callParser = function(someArray) { //метод для вызова модуля извне
    return Check(someArray, parser, changer);
  }
}());

alert(obj.array); //необработанный массив
alert(callParser(obj.array)); //обработанный массив


//Модуль можно смело записывать во внешний файл и подключать через html, но я не стал этого делать, чтобы не усложнять читаемость
