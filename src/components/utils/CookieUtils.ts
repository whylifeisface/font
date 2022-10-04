export function getCookie() {
    const arr = document.cookie.match(new RegExp("(^| )" + "=([^;]*)(;|$)"))
    if (arr != null) {
        return unescape(arr[2])
    } else {
      return null
    }
}