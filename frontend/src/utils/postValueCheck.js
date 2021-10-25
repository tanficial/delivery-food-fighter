const checkFileType = inputImg => {
  const fileType = inputImg.name.split(".").pop().toLowerCase()
  const correctType = ["png", "jpg", "jpeg"]
  return correctType.includes(fileType)
}

const isFile = inputImg => {
  return inputImg ? true : false
}

export const isValue = inputValue => {
  const keys = Object.keys(inputValue)
  const notValue = []
  keys.forEach(key => !inputValue[key] && notValue.push(key))
  return notValue.length === 0 ? true : false
}

const isText = inputText => {
  if (!inputText) {
    return false
  }
  return inputText.length >= 5 ? true : false
}

const postValueCheck = (inputValue, inputText, inputImg) => {
  const result = []
  if (!isValue(inputValue)) result.push("지역과 카테고리를 모두 선택해주세요")
  if (!isText(inputText)) result.push("내용을 5자 이상 작성해주세요")
  if (!isFile(inputImg)) {
    result.push("이미지를 첨부해주세요")
  }
  if (result.length === 0) {
    return true
  } else {
    alert(result)
    return false
  }
}

//origin
// const postValueCheck = (inputValue, inputText, inputImg) => {
//   const result = []
//   if (!isValue(inputValue)) result.push("지역과 카테고리를 모두 선택해주세요")
//   if (!isText(inputText)) result.push("내용을 5자 이상 작성해주세요")
//   if (!isFile(inputImg)) {
//     result.push("이미지를 첨부해주세요")
//   } else if (!checkFileType(inputImg)) {
//     result.push("파일 형식은 png, jpg만 가능합니다")
//   }
//   if (result.length === 0) {
//     return true
//   } else {
//     alert(result)
//     return false
//   }
// }

export default postValueCheck
