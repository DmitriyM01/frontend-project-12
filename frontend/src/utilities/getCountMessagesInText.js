export function getMessageText(count) {
    if (count % 100 >= 11 && count % 100 <= 19) {
        return count + " сообщений";
    } else {
        switch (count % 10) {
            case 1:
                return count + " сообщение";
            case 2:
            case 3:
            case 4:
                return count + " сообщения";
            default:
                return count + " сообщений";
        }
    }
}