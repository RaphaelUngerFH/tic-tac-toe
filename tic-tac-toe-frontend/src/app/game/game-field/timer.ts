export class Timer {
  private seconds = 0;
  private intervalId: any;

  // Start the timer
  start() {
    if (!this.intervalId)
      this.intervalId = setInterval(() => {
        this.seconds++;
      }, 1000);
  }

  // Get the corresponding time str
  getTimeStr(): string {
    const scnd = (this.seconds % 60).toString().padStart(2, '0');
    const min = Math.floor(this.seconds / 60)
      .toString()
      .padStart(2, '0');
    return min + ':' + scnd;
  }

  // Stop the timer
  stop() {
    clearInterval(this.intervalId);
  }

  // Stops and resets the time
  reset() {
    this.stop();
    this.seconds = 0;
  }
}
