class BrowserHistory {
  history: string[];
  i: number;

  constructor(homepage: string) {
    this.history = [homepage];
    this.i = 0;
  }

  visit(url: string): void {
    if (this.i !== this.lastIndex()) {
      this.history = this.history.slice(0, this.i + 1);
    }
    this.history.push(url);
    this.i = this.lastIndex();
  }

  back(steps: number): string {
    this.i = Math.max(this.i - steps, 0);
    return this.currPage();
  }

  forward(steps: number): string {
    this.i = Math.min(this.i + steps, this.lastIndex());
    return this.currPage();
  }

  private lastIndex() {
    return this.history.length - 1;
  }

  private currPage() {
    return this.history[this.i];
  }
}

/**
 * Your BrowserHistory object will be instantiated and called as such:
 * var obj = new BrowserHistory(homepage)
 * obj.visit(url)
 * var param_2 = obj.back(steps)
 * var param_3 = obj.forward(steps)
 */
