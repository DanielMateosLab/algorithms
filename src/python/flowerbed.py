# 605
from typing import List


class Solution:
    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
        if n == 0:
            return True
        self.flowerbed = flowerbed[:]
        count = 0
        for i, item in enumerate(flowerbed):
            if item != 1:
                if self.check_spot(i - 1) and self.check_spot(i + 1):
                    self.flowerbed[i] = 1
                    count += 1
                    if count == n:
                        return True
        return False

    def check_spot(self, i: int):
        if i < 0 or i >= len(self.flowerbed):
            return True
        return self.flowerbed[i] == 0
