class BrowserHistory:
    _history = []
    _i = None

    def __init__(self, homepage: str):
        self._history = [homepage]
        self._i = 0

    def visit(self, url: str) -> None:
        if self._i != self._last():
            self._history = self._history[: self._i + 1]
        self._history.append(url)
        self._i = self._last()

    def back(self, steps: int) -> str:
        self._i = max(self._i - steps, 0)
        return self._curr_page()

    def forward(self, steps: int) -> str:
        self._i = min(self._last(), self._i + steps)
        return self._curr_page()

    def _last(self):
        return len(self._history) - 1

    def _curr_page(self):
        return self._history[self._i]
