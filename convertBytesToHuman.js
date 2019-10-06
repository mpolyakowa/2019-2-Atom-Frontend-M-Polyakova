/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export default function convertBytesToHuman(bytes) {
  // your solution goes here
  if ((! Number.isInteger(bytes)) || (bytes < 0)) {
    return false;
  } else {
    let i = 0;

    for (bytes; bytes >= 1024; bytes /= 1024) {
      i++
    } 

    let s = "" 
    if (i == 1) {
      s = "K"
    }
    if (i == 2) {
      s = "M"
    }
    if (i == 3) {
      s = "G"
    }
    if (i == 4) {
      s = "T"
    }
    if (i == 5) {
      s = "P"
    }
    if (i == 6) {
      s = "E"
    }
    let str = Math.round(bytes * 100) / 100 + " " + s + "B"
  
    return str
  }
}
