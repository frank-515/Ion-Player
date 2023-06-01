// 格式化秒
// Generates By GPT-3.5
function formatSeconds(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toFixed(0).padStart(2, '0')}`;
}

export {
    formatSeconds
}