const formatTime = timeSpent => {
    const hours = Math.floor(timeSpent / 60);
    const minutes = timeSpent % 60;
    return hours > 0 ? hours + 'h ' + minutes + 'm' : minutes + 'm';
}
